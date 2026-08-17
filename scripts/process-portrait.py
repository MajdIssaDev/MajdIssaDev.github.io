"""Cut out the portrait, apply a cool cyan grade, save as PNG with alpha."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance
from rembg import remove

SRC = Path(
    r"C:\Users\Mjdis\.cursor\projects\c-Users-Mjdis-OneDrive-Documents-AutoHotkey\assets"
    r"\c__Users_Mjdis_AppData_Roaming_Cursor_User_workspaceStorage_8e3fa4fafd4454ba0d2c580eb2b80b0a_images_image-ad1cedbe-9b40-4f8e-914a-17137f147310.png"
)
OUT = Path(r"c:\Projects\MajdIssaDev.github.io\public\assets\portrait.png")


def grade_cyan(rgb: np.ndarray) -> np.ndarray:
    """Cool the image toward a dark navy/slate, not bright cyan."""
    f = rgb.astype(np.float32)
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    r = r * 0.54 + g * 0.03
    g = g * 0.66 + b * 0.1
    b = b * 0.86 + 22.0
    # Mix toward a darker navy, 20% weaker than the previous pass.
    r = r * 0.7 + 6.0
    g = g * 0.74 + 16.0
    b = np.minimum(255.0, b * 0.82 + 42.0)
    stacked = np.stack([r, g, b], axis=-1) * 0.78
    return np.clip(stacked, 0, 255).astype(np.uint8)


def crop_to_subject(img: Image.Image, padding: float = 0.08) -> Image.Image:
    alpha = np.array(img.split()[-1])
    ys, xs = np.where(alpha > 12)
    if len(xs) == 0:
        return img
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    w, h = x1 - x0, y1 - y0
    pad_x = int(w * padding)
    pad_y = int(h * padding)
    x0 = max(0, x0 - pad_x)
    y0 = max(0, y0 - pad_y)
    x1 = min(img.width, x1 + pad_x)
    y1 = min(img.height, y1 + pad_y)
    # Prefer 4:5 portrait crop around the subject.
    box_w, box_h = x1 - x0, y1 - y0
    target_ratio = 4 / 5
    if box_w / box_h > target_ratio:
        new_w = int(box_h * target_ratio)
        extra = box_w - new_w
        x0 += extra // 2
        x1 = x0 + new_w
    else:
        new_h = int(box_w / target_ratio)
        extra = box_h - new_h
        y0 += max(0, extra // 5)  # keep more of the head
        y1 = min(img.height, y0 + new_h)
        y0 = y1 - new_h
    return img.crop((x0, y0, x1, y1))


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    print(f"Source {src.size}")
    cutout = remove(src).convert("RGBA")
    rgb = np.array(cutout)[..., :3]
    alpha = np.array(cutout)[..., 3]
    graded = grade_cyan(rgb)
    graded_img = Image.fromarray(np.dstack([graded, alpha]), mode="RGBA")
    graded_img = ImageEnhance.Contrast(graded_img).enhance(1.1)
    graded_img = ImageEnhance.Brightness(graded_img).enhance(0.88)
    graded_img = ImageEnhance.Color(graded_img).enhance(0.95)
    cropped = crop_to_subject(graded_img)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(OUT, format="PNG", optimize=True)
    print(f"Wrote {OUT} {cropped.size} {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
