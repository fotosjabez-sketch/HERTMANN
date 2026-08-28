#!/usr/bin/env python3
"""
Recorta o fundo de uma fotografia cujo estúdio NÃO é uma cor plana — um
vinheta, um gradiente, um fundo com blobs de luz — onde `cutout.py` (que
compara cada pixel a uma única cor de referência) deixaria zonas por cortar
ou cortaria de mais.

Em vez de comparar cada pixel a uma referência global, propaga-se a partir
da borda comparando cada pixel ao VIZINHO já classificado como fundo. Isso
segue qualquer gradiente suave, seja qual for a sua forma, e pára exactamente
onde o salto de luminância é grande — a silhueta nítida da peça. É o método
usado para a fotografia do anel no Hero (fundo em vinheta radial irregular).

    python3 scripts/cutout_tolerance.py entrada.png public/images/saida.png

Argumentos posicionais opcionais, por esta ordem:
    tolerância do passo local (padrão 9)   — quanto maior, mais generosa a propagação
    suavização do rebordo (padrão 1.6)
    margem à volta do recorte, em pixels (padrão 24)

Requer Pillow, NumPy:  pip install pillow numpy
"""

from __future__ import annotations

import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter


def cutout(image: Image.Image, step_tolerance: float) -> Image.Image:
    width, height = image.size
    pixels = np.asarray(image).astype(np.int32)
    luminance = pixels.mean(axis=2)

    visited = np.zeros((height, width), dtype=bool)
    is_background = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        for y in (0, height - 1):
            if not visited[y, x]:
                visited[y, x] = True
                is_background[y, x] = True
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if not visited[y, x]:
                visited[y, x] = True
                is_background[y, x] = True
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        current = luminance[y, x]
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and not visited[ny, nx]:
                if abs(luminance[ny, nx] - current) < step_tolerance:
                    visited[ny, nx] = True
                    is_background[ny, nx] = True
                    queue.append((nx, ny))
                else:
                    visited[ny, nx] = True

    alpha = np.where(is_background, 0, 255).astype(np.uint8)
    result = image.convert("RGBA")
    result.putalpha(Image.fromarray(alpha, mode="L"))
    return result


def main() -> None:
    source, destination = sys.argv[1], sys.argv[2]
    step_tolerance = float(sys.argv[3]) if len(sys.argv) > 3 else 9.0
    feather = float(sys.argv[4]) if len(sys.argv) > 4 else 1.6
    pad = int(sys.argv[5]) if len(sys.argv) > 5 else 24

    image = Image.open(source).convert("RGB")
    result = cutout(image, step_tolerance)

    alpha = result.getchannel("A").filter(ImageFilter.GaussianBlur(feather))
    result.putalpha(alpha)

    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    if box:
        result = result.crop(
            (
                max(0, box[0] - pad),
                max(0, box[1] - pad),
                min(result.width, box[2] + pad),
                min(result.height, box[3] + pad),
            )
        )

    result.save(destination)
    print(f"{destination}  {result.width}x{result.height}")


if __name__ == "__main__":
    main()
