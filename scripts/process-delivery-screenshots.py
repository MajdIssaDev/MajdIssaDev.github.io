"""Redact sensitive areas from Route Master screenshots for portfolio use."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\Mjdis\.cursor\projects\c-Users-Mjdis-OneDrive-Documents-AutoHotkey\assets"
)
OUT = ROOT / "src" / "assets" / "delivery"
OUT_PUBLIC = ROOT / "public" / "assets" / "delivery"

# Source files in display order
FILES = {
    "route-map.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_IMG_7008-eed4c9d4-c509-4b07-ae8a-ef666ee6d6b0.png",
    "assigned-deliveries.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_IMG_7007-e21e23a6-28ff-4522-86cc-bc92a1294392.png",
    "dispatch-workers.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_IMG_7006-9be3b7b5-3ade-450e-9495-f98a7e3e0e1e.png",
    "orders-pending.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_IMG_7005-0dc60c0a-0d4c-4505-858e-9d29d3b5136c.png",
    "demand-heatmap.png": "c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_IMG_7004-212491e8-3e81-4ad7-8846-1988f179d55e.png",
}

HEADER_COLOR = (15, 23, 42)  # matches app dark header


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


def blur_asiana(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.02, 0.085, 0.42, 0.145), radius=14)


def blur_workers(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.0, 0.40, 1.0, 0.87), radius=16)
    blur_region(img, box_from_ratio(img, 0.0, 0.88, 1.0, 1.0), radius=16)


def blur_phone(img: Image.Image) -> None:
    blur_region(img, box_from_ratio(img, 0.04, 0.33, 0.96, 0.50), radius=18)


def upscale(img: Image.Image, scale: int = 3) -> Image.Image:
    return img.resize((img.width * scale, img.height * scale), Image.Resampling.LANCZOS)


def process(name: str, src_name: str) -> None:
    src_path = SRC / src_name
    img = Image.open(src_path).convert("RGB")

    hide_status_bar(img)
    blur_asiana(img)

    if name == "dispatch-workers.png":
        blur_workers(img)
    if name == "orders-pending.png":
        blur_phone(img)

    img = upscale(img, 3)

    OUT.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.mkdir(parents=True, exist_ok=True)
    out_path = OUT / name
    img.save(out_path, format="PNG", optimize=True)
    img.save(OUT_PUBLIC / name, format="PNG", optimize=True)
    print(f"Wrote {out_path} ({img.size[0]}x{img.size[1]})")


def main() -> None:
    for out_name, src_name in FILES.items():
        process(out_name, src_name)


if __name__ == "__main__":
    main()
