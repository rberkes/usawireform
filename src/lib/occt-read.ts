import type { OcctMesh } from "@/components/StepCanvas";

const CAD_EXT = ["step", "stp", "stpz", "iges", "igs"];

export function cadExtOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function isCadFile(name: string) {
  return CAD_EXT.includes(cadExtOf(name));
}

export function readCadBuffer(buffer: ArrayBuffer, name: string): Promise<OcctMesh[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("/vendor/occt-import-js/occt-import-js-worker.js");
    const fail = (message: string) => {
      worker.terminate();
      reject(new Error(message));
    };
    worker.onmessage = (event: MessageEvent<{ success?: boolean; meshes?: OcctMesh[] }>) => {
      worker.terminate();
      if (!event.data?.success || !event.data.meshes?.length) {
        reject(new Error("Could not triangulate that file."));
        return;
      }
      resolve(event.data.meshes);
    };
    worker.onerror = () => fail("STEP reader failed to start.");
    const format =
      cadExtOf(name) === "igs" || cadExtOf(name) === "iges" ? "iges" : "step";
    worker.postMessage({
      format,
      buffer: new Uint8Array(buffer),
      params: {
        linearUnit: "millimeter",
        linearDeflectionType: "bounding_box_ratio",
        linearDeflection: 0.001,
        angularDeflection: 0.12,
      },
    });
  });
}

export function readCadFile(file: File): Promise<OcctMesh[]> {
  return file.arrayBuffer().then((buffer) => readCadBuffer(buffer, file.name));
}

export async function readCatalogStep(path: string): Promise<OcctMesh[]> {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Missing STEP file.");
  const buffer = await response.arrayBuffer();
  return readCadBuffer(buffer, path);
}
