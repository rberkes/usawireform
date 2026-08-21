"use client";

import { useEffect, useRef } from "react";
import type { WireFinishId } from "@/lib/models";
import { WIRE_FINISHES } from "@/lib/models";
import { polylinesForModel, type Polyline, type Vec3 } from "@/lib/wire-geometry";

export type OcctMesh = {
  name?: string;
  color?: number[];
  attributes: {
    position: { array: number[] | Float32Array };
    normal?: { array: number[] | Float32Array };
  };
  index: { array: number[] };
};

export type ViewerSource =
  | { type: "wire"; id: string; diameterIn: number; finish: WireFinishId }
  | { type: "step"; meshes: OcctMesh[]; name: string };

export function StepCanvas({
  source,
  autoRotate,
}: {
  source: ViewerSource;
  autoRotate: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<(next: ViewerSource) => void>(() => {});
  const sourceRef = useRef(source);
  const rotateRef = useRef(autoRotate);

  useEffect(() => {
    sourceRef.current = source;
    applyRef.current(source);
  }, [source]);

  useEffect(() => {
    rotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;
    let frame = 0;
    let renderer: { dispose: () => void; domElement: HTMLCanvasElement } | null =
      null;

    const start = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/addons/controls/OrbitControls.js"
      );
      if (disposed || !hostRef.current) return;
      const canvasHost = hostRef.current;

      const gl = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
      });
      renderer = gl;
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      gl.setClearColor(0xf4f4f2, 1);
      gl.outputColorSpace = THREE.SRGBColorSpace;
      canvasHost.appendChild(gl.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf4f4f2);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 4000);
      camera.position.set(12, 10, 16);

      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotateSpeed = 0.6;
      controls.target.set(0, 3, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8580, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 1.35);
      key.position.set(8, 14, 10);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe8e4dc, 0.7);
      fill.position.set(-10, 6, -8);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.45);
      rim.position.set(0, 8, -12);
      scene.add(rim);

      const content = new THREE.Group();
      scene.add(content);

      const ground = new THREE.GridHelper(40, 20, 0xd5d2cc, 0xe8e6e1);
      ground.position.y = -0.01;
      scene.add(ground);

      function resize() {
        const node = hostRef.current;
        if (!node) return;
        const w = node.clientWidth || 1;
        const h = Math.max(node.clientHeight, 240);
        gl.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }

      function steelMaterial(finish: WireFinishId, color?: number[]) {
        const swatch =
          WIRE_FINISHES.find((item) => item.id === finish)?.color ?? "#8d939a";
        return new THREE.MeshStandardMaterial({
          color: color
            ? new THREE.Color(color[0], color[1], color[2])
            : swatch,
          metalness: finish === "copper" ? 0.35 : 0.28,
          roughness: finish === "stainless" ? 0.32 : 0.42,
        });
      }

      function addCylinder(
        group: InstanceType<typeof THREE.Group>,
        a: Vec3,
        b: Vec3,
        radius: number,
        material: InstanceType<typeof THREE.MeshStandardMaterial>,
      ) {
        const start = new THREE.Vector3(...a);
        const end = new THREE.Vector3(...b);
        const dir = end.clone().sub(start);
        const length = dir.length();
        if (length < 1e-4) return;
        const geo = new THREE.CylinderGeometry(
          radius,
          radius,
          length,
          12,
          1,
          false,
        );
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.copy(start).add(end).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize(),
        );
        group.add(mesh);
      }

      function addPolyline(
        group: InstanceType<typeof THREE.Group>,
        pts: Polyline,
        radius: number,
        material: InstanceType<typeof THREE.MeshStandardMaterial>,
      ) {
        if (pts.length < 2) return;
        if (pts.length === 2) {
          addCylinder(group, pts[0], pts[1], radius, material);
          return;
        }
        const path = pts.map((p) => new THREE.Vector3(...p));
        const first = path[0];
        const last = path[path.length - 1];
        const closed = path.length > 3 && first.distanceTo(last) < radius * 1.5;
        const curve = new THREE.CatmullRomCurve3(path, closed, "centripetal");
        const tubular = Math.min(180, Math.max(24, pts.length * 3));
        const geo = new THREE.TubeGeometry(curve, tubular, radius, 12, closed);
        group.add(new THREE.Mesh(geo, material));
      }

      function fit(object: InstanceType<typeof THREE.Object3D>) {
        const box = new THREE.Box3().setFromObject(object);
        if (box.isEmpty()) return;
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 1);
        ground.position.y = box.min.y - 0.02;
        camera.near = Math.max(0.02, maxDim / 200);
        camera.far = maxDim * 80;
        camera.updateProjectionMatrix();
        camera.position.set(
          center.x + maxDim * 1.35,
          center.y + maxDim * 0.75,
          center.z + maxDim * 1.55,
        );
        controls.target.copy(center);
        controls.minDistance = maxDim * 0.4;
        controls.maxDistance = maxDim * 12;
        controls.update();
      }

      function clearContent() {
        while (content.children.length) {
          const child = content.children[0];
          content.remove(child);
          child.traverse((node) => {
            const mesh = node as InstanceType<typeof THREE.Mesh>;
            if (mesh.geometry) mesh.geometry.dispose();
            const material = mesh.material;
            if (Array.isArray(material))
              material.forEach((item) => item.dispose());
            else if (material) material.dispose();
          });
        }
      }

      function drawWire(id: string, diameterIn: number, finish: WireFinishId) {
        clearContent();
        const material = steelMaterial(finish);
        const radius = diameterIn / 2;
        for (const poly of polylinesForModel(id)) {
          addPolyline(content, poly, radius, material);
        }
        fit(content);
      }

      function drawStep(meshes: OcctMesh[]) {
        clearContent();
        const fallback = steelMaterial("carbon");
        for (const mesh of meshes) {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
              mesh.attributes.position.array,
              3,
            ),
          );
          if (mesh.attributes.normal) {
            geometry.setAttribute(
              "normal",
              new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3),
            );
          } else {
            geometry.computeVertexNormals();
          }
          geometry.setIndex(mesh.index.array);
          const material = mesh.color
            ? steelMaterial("carbon", mesh.color)
            : fallback;
          const threeMesh = new THREE.Mesh(geometry, material);
          threeMesh.name = mesh.name ?? "step";
          content.add(threeMesh);
        }
        fit(content);
      }

      applyRef.current = (next: ViewerSource) => {
        try {
          if (next.type === "wire") {
            drawWire(next.id, next.diameterIn, next.finish);
          } else {
            drawStep(next.meshes);
          }
        } catch (error) {
          console.error("Model viewer failed to draw", error);
        }
      };
      gl.domElement.style.display = "block";
      gl.domElement.style.width = "100%";
      gl.domElement.style.height = "100%";
      applyRef.current(sourceRef.current);
      gl.render(scene, camera);

      const tick = () => {
        if (disposed) return;
        controls.autoRotate = rotateRef.current;
        controls.update();
        gl.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      tick();
      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvasHost);
    };

    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      applyRef.current = () => {};
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative h-[min(70vh,36rem)] min-h-[22rem] w-full overflow-hidden bg-inset"
      role="img"
      aria-label="3D model of a wire form"
    />
  );
}
