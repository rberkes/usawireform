import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { CV_HOOK_MODELS, cvHookCenterline3d } from "../src/lib/cv-hook-models";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "models", "cv-hooks");

function hookGeometry(points: [number, number, number][], radius: number) {
  const path = points.map((p) => new THREE.Vector3(...p));
  const curve = new THREE.CatmullRomCurve3(path, false, "centripetal");
  const tubular = Math.min(360, Math.max(80, points.length * 6));
  const tube = new THREE.TubeGeometry(curve, tubular, radius, 48, false);
  const cap = (at: THREE.Vector3) => {
    const geo = new THREE.SphereGeometry(radius, 32, 16);
    geo.translate(at.x, at.y, at.z);
    return geo;
  };
  const merged = mergeGeometries([tube, cap(path[0]), cap(path[path.length - 1])], false);
  if (!merged) throw new Error("Could not merge CV hook geometry.");
  tube.dispose();
  return merged;
}

function padChunk(bytes: Uint8Array, fill: number) {
  const pad = (4 - (bytes.byteLength % 4)) % 4;
  if (!pad) return bytes;
  const out = new Uint8Array(bytes.byteLength + pad);
  out.set(bytes);
  out.fill(fill, bytes.byteLength);
  return out;
}

function writeGlb(geometry: THREE.BufferGeometry) {
  geometry.computeVertexNormals();
  const pos = new Float32Array(geometry.attributes.position.array);
  const nrm = new Float32Array(geometry.attributes.normal.array);
  const src = geometry.index;
  if (!src) throw new Error("CV hook mesh has no index.");
  const vertexCount = pos.length / 3;
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i < pos.length; i += 3) {
    minX = Math.min(minX, pos[i]);
    maxX = Math.max(maxX, pos[i]);
    minY = Math.min(minY, pos[i + 1]);
    maxY = Math.max(maxY, pos[i + 1]);
    minZ = Math.min(minZ, pos[i + 2]);
    maxZ = Math.max(maxZ, pos[i + 2]);
  }
  const indexArray =
    vertexCount > 65535
      ? new Uint32Array(src.array)
      : new Uint16Array(src.array);
  const indexBytes = new Uint8Array(indexArray.buffer, indexArray.byteOffset, indexArray.byteLength);

  const posBytes = new Uint8Array(pos.buffer, pos.byteOffset, pos.byteLength);
  const nrmBytes = new Uint8Array(nrm.buffer, nrm.byteOffset, nrm.byteLength);

  let offset = 0;
  const posOffset = offset;
  offset += posBytes.byteLength;
  const nrmOffset = offset;
  offset += nrmBytes.byteLength;
  const idxPad = (4 - (offset % 4)) % 4;
  offset += idxPad;
  const idxOffset = offset;
  offset += indexBytes.byteLength;
  const binPad = (4 - (offset % 4)) % 4;
  const bin = new Uint8Array(offset + binPad);
  bin.set(posBytes, posOffset);
  bin.set(nrmBytes, nrmOffset);
  bin.set(indexBytes, idxOffset);

  const json = {
    asset: { version: "2.0", generator: "usawireform-cv-hook" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [
      {
        primitives: [
          {
            attributes: { POSITION: 0, NORMAL: 1 },
            indices: 2,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        pbrMetallicRoughness: {
          baseColorFactor: [0.55, 0.58, 0.6, 1],
          metallicFactor: 0.82,
          roughnessFactor: 0.28,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: vertexCount,
        type: "VEC3",
        min: [minX, minY, minZ],
        max: [maxX, maxY, maxZ],
      },
      {
        bufferView: 1,
        componentType: 5126,
        count: vertexCount,
        type: "VEC3",
      },
      {
        bufferView: 2,
        componentType: vertexCount > 65535 ? 5125 : 5123,
        count: indexArray.length,
        type: "SCALAR",
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: posOffset, byteLength: posBytes.byteLength },
      { buffer: 0, byteOffset: nrmOffset, byteLength: nrmBytes.byteLength },
      {
        buffer: 0,
        byteOffset: idxOffset,
        byteLength: indexBytes.byteLength,
        target: 34963,
      },
    ],
    buffers: [{ byteLength: bin.byteLength }],
  };

  const jsonBytes = padChunk(Buffer.from(JSON.stringify(json)), 0x20);
  const jsonChunk = jsonBytes.byteLength + 8;
  const binChunk = bin.byteLength + 8;
  const total = 12 + jsonChunk + binChunk;
  const out = Buffer.alloc(total);
  out.writeUInt32LE(0x46546c67, 0);
  out.writeUInt32LE(2, 4);
  out.writeUInt32LE(total, 8);
  out.writeUInt32LE(jsonBytes.byteLength, 12);
  out.writeUInt32LE(0x4e4f534a, 16);
  Buffer.from(jsonBytes).copy(out, 20);
  const binHeader = 20 + jsonBytes.byteLength;
  out.writeUInt32LE(bin.byteLength, binHeader);
  out.writeUInt32LE(0x004e4942, binHeader + 4);
  Buffer.from(bin).copy(out, binHeader + 8);
  return out;
}

function main() {
  mkdirSync(OUT, { recursive: true });
  for (const model of CV_HOOK_MODELS) {
    const pts = cvHookCenterline3d(model.kind, model.overallIn, model.openingIn);
    const geometry = hookGeometry(pts, model.dIn / 2);
    const glb = writeGlb(geometry);
    geometry.dispose();
    const dest = join(ROOT, "public", model.url.replace(/^\//, ""));
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, glb);
    console.log(`wrote ${dest} (${glb.byteLength} bytes)`);
  }
}

main();
