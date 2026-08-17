"""Hide the iOS status bar on delivery app screenshots for portfolio use."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\Mjdis\.cursor\projects\c-Users-Mjdis-OneDrive-Documents-AutoHotkey\assets"
)
OUT = ROOT / "src" / "assets" / "delivery"

FILES = {
    "route-map-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806083884-eace595d-eda5-4f0e-9816-7dc56e179b3e.png",
    "demand-heatmap-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806084020-c88d8c98-74dc-43fc-884a-fdfce5c52f77.png",
    "orders-pending-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082510-acb693c1-7101-4f9f-b554-34ae07d39724.png",
    "dispatch-workers-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082813-1b9a253f-51d8-4cac-9585-cbf0ef0740de.png",
    "assigned-deliveries-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082999-af79d082-dbed-4735-8059-24c0b84dbb5f.png",
}

# Match app header background (dark slate)
HEADER_COLOR = (15, 23, 42)
STATUS_BAR_RATIO = 0.085


def box_from_ratio(img: Image.Image, x0: float, y0: float, x1: float, y1: float) -> tuple[int, int, int, int]:
    w, h = img.size
    return (int(w * x0), int(h * y0), int(w * x1), int(h * y1))


def fill_region(img: Image.Image, box: tuple[int, int, int, int], color: tuple[int, int, int]) -> None:
    x0, y0, x1, y1 = box
    patch = Image.new("RGB", (x1 - x0, y1 - y0), color)
    img.paste(patch, (x0, y0))


def hide_status_bar(img: Image.Image) -> None:
    fill_region(img, box_from_ratio(img, 0, 0, 1, STATUS_BAR_RATIO), HEADER_COLOR)


def process(name: str, src_name: str) -> None:
    src_path = SRC / src_name
    if not src_path.exists():
        raise FileNotFoundError(f"Missing source screenshot: {src_path}")

    img = Image.open(src_path).convert("RGB")
    print(f"Processing {name} from {src_path.name} ({img.size[0]}x{img.size[1]})")

    hide_status_bar(img)

    OUT.mkdir(parents=True, exist_ok=True)
    out_path = OUT / name
    img.save(out_path, format="PNG", optimize=True)
    print(f"  -> {out_path} ({img.size[0]}x{img.size[1]}, {out_path.stat().st_size} bytes)")


def main() -> None:
    for out_name, src_name in FILES.items():
        process(out_name, src_name)


if __name__ == "__main__":
    main()
