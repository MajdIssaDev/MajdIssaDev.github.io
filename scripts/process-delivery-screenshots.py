"""Redact sensitive areas from delivery app screenshots for portfolio use."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\Mjdis\.cursor\projects\c-Users-Mjdis-OneDrive-Documents-AutoHotkey\assets"
)
OUT = ROOT / "src" / "assets" / "delivery"

FILES = {
    "route-map-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806083884-05f95bb7-42af-421e-a2d4-ece59778acae.png",
    "demand-heatmap-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806084020-e4ca8b52-e955-4931-acc1-aaa58021c79d.png",
    "orders-pending-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082510-9ce8da5c-ff14-4234-9451-2fb72b4d6eb4.png",
    "dispatch-workers-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082813-501d985a-f0d9-4afd-897f-d61ac69aa312.png",
    "assigned-deliveries-v2.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_1779806082999-54d756df-ef19-426a-a849-5d5c1b034048.png",
}

HEADER_COLOR = (15, 23, 42)


def box_from_ratio(img: Image.Image, x0: float, y0: float, x1: float, y1: float) -> tuple[int, int, int, int]:
    w, h = img.size
    return (int(w * x0), int(h * y0), int(w * x1), int(h * y1))


def blur_region(img: Image.Image, box: tuple[int, int, int, int], radius: int = 12) -> None:
    x0, y0, x1, y1 = box
    x0, y0 = max(0, x0), max(0, y0)
    x1, y1 = min(img.width, x1), min(img.height, y1)
    if x1 <= x0 or y1 <= y0:
        return
    region = img.crop((x0, y0, x1, y1))
    img.paste(region.filter(ImageFilter.GaussianBlur(radius=radius)), (x0, y0))


def fill_region(img: Image.Image, box: tuple[int, int, int, int], color: tuple[int, int, int]) -> None:
    x0, y0, x1, y1 = box
    patch = Image.new("RGB", (x1 - x0, y1 - y0), color)
    img.paste(patch, (x0, y0))


def hide_status_bar(img: Image.Image) -> None:
    fill_region(img, box_from_ratio(img, 0, 0, 1, 0.085), HEADER_COLOR)


def blur_brand(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.02, 0.085, 0.42, 0.145), radius=14)


def blur_workers(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.0, 0.40, 1.0, 0.87), radius=16)
    blur_region(img, box_from_ratio(img, 0.0, 0.88, 1.0, 1.0), radius=16)


def blur_phone(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.04, 0.30, 0.96, 0.48), radius=18)


def blur_assigned_item(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.06, 0.58, 0.88, 0.72), radius=14)


def process(name: str, src_name: str) -> None:
    src_path = SRC / src_name
    if not src_path.exists():
        raise FileNotFoundError(f"Missing source screenshot: {src_path}")

    img = Image.open(src_path).convert("RGB")
    print(f"Processing {name} from {src_path.name} ({img.size[0]}x{img.size[1]})")

    hide_status_bar(img)
    blur_brand(img)

    if "dispatch-workers" in name:
        blur_workers(img)
    if "orders-pending" in name:
        blur_phone(img)
    if "assigned-deliveries" in name:
        blur_assigned_item(img)

    OUT.mkdir(parents=True, exist_ok=True)
    out_path = OUT / name
    img.save(out_path, format="PNG", optimize=True)
    print(f"  -> {out_path} ({img.size[0]}x{img.size[1]}, {out_path.stat().st_size} bytes)")


def main() -> None:
    for out_name, src_name in FILES.items():
        process(out_name, src_name)


if __name__ == "__main__":
    main()
