#!/usr/bin/env python3
"""Convert a SolidWorks part to the catalog STEP the viewer loads.

Requires `cadmpeg` on PATH (https://github.com/cadmpeg/cadmpeg).
FreeCAD is used only to rewrite a closed solid.

Example:
  python3 scripts/import-sldprt.py "/Users/cal/Downloads/S-Hook for Lifting.SLDPRT" s-hooks
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "models"
FREECADCMD = Path("/Applications/FreeCAD.app/Contents/Resources/bin/freecadcmd")


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("usage: import-sldprt.py <file.sldprt> <slug>")
    src = Path(sys.argv[1]).expanduser()
    slug = sys.argv[2]
    cadmpeg = shutil.which("cadmpeg")
    if not cadmpeg:
        cadmpeg = str(Path.home() / ".cargo" / "bin" / "cadmpeg")
    dest = OUT / f"{slug}.step"
    OUT.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        [cadmpeg, "convert", str(src), "-f", "step", "-o", str(dest), "--force"]
    )
    if FREECADCMD.exists():
        subprocess.check_call(
            [
                str(FREECADCMD),
                "-c",
                (
                    "import Part\n"
                    f"p = {str(dest)!r}\n"
                    "s = Part.Shape(); s.read(p)\n"
                    "if s.Volume < 0: s.reverse()\n"
                    "s.exportStep(p)\n"
                ),
            ]
        )
    print("wrote", dest, dest.stat().st_size)


if __name__ == "__main__":
    main()
