#!/usr/bin/env python3
"""Sweep catalog wire centerlines into STEP solids we own.

Input JSON (inches) from dump-wire-paths.ts. Output millimetres.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import cadquery as cq

MM = 25.4
WIRE_IN = 0.375
EPS_MM = 0.05
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "models"


def pipe(points: list[list[float]], radius_in: float) -> cq.Workplane | None:
    cleaned: list[cq.Vector] = []
    for x, y, z in points:
        p = cq.Vector(x * MM, y * MM, z * MM)
        if cleaned and (p - cleaned[-1]).Length < EPS_MM:
            continue
        cleaned.append(p)
    if len(cleaned) < 2:
        return None
    edges = [
        cq.Edge.makeLine(cleaned[i], cleaned[i + 1])
        for i in range(len(cleaned) - 1)
    ]
    wire = cq.Wire.assembleEdges(edges)
    path = cq.Workplane("XY").newObject([wire])
    normal = (cleaned[1] - cleaned[0]).normalized()
    plane = cq.Plane(origin=cleaned[0], normal=normal)
    return cq.Workplane(plane).circle(radius_in * MM).sweep(path, isFrenet=True)


def fuse(polylines: list[list[list[float]]], radius_in: float) -> cq.Workplane:
    solids = []
    for poly in polylines:
        try:
            shape = pipe(poly, radius_in)
        except Exception as exc:
            print(f"skip polyline ({len(poly)} pts): {exc}", file=sys.stderr)
            continue
        if shape is not None:
            solids.append(shape)
    if not solids:
        raise RuntimeError("no solids")
    result = solids[0]
    for extra in solids[1:]:
        result = result.union(extra)
    return result


def main() -> None:
    payload = json.loads(sys.stdin.read())
    OUT.mkdir(parents=True, exist_ok=True)
    for item in payload:
        slug = item["id"]
        try:
            shape = fuse(item["polylines"], WIRE_IN / 2)
            dest = OUT / f"{slug}.step"
            cq.exporters.export(shape, str(dest))
            print(f"wrote {dest} ({dest.stat().st_size} bytes)")
        except Exception as exc:
            print(f"fail {slug}: {exc}", file=sys.stderr)


if __name__ == "__main__":
    main()
