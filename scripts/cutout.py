#!/usr/bin/env python3
"""
Recorta o fundo de uma fotografia de estúdio, deixando a peça sobre transparência.

É o processo usado em todas as imagens de `public/images`: a chave parte da cor
do fundo lida nas margens, propaga-se apenas pelos pixels ligados à borda — para
não abrir buracos dentro da peça — e usa uma rampa suave, de modo que a sombra
de contacto sobrevive em vez de ser cortada a direito. É essa sombra que faz a
peça assentar na página em vez de flutuar sobre ela.

    python3 scripts/cutout.py entrada.png public/images/saida.png

Opções úteis quando o fundo não é uniforme:
    --inner N   distância abaixo da qual um pixel é fundo puro (padrão 48)
    --outer N   distância acima da qual um pixel é peça pura (padrão 130)
    --maxw N    largura máxima da imagem final (padrão 1600)

Requer Pillow:  pip install pillow
"""

from __future__ import annotations

import argparse
from collections import deque

from PIL import Image, ImageFilter


def background_reference(pixels, width: int, height: int) -> tuple[int, int, int]:
    """Cor média das margens superior e inferior — o fundo do estúdio."""
    total = [0, 0, 0]
    count = 0
    for x in range(0, width, 7):
        for y in (1, 2, height - 2, height - 3):
            r, g, b = pixels[x, y][:3]
            total[0] += r
            total[1] += g
            total[2] += b
            count += 1
    return tuple(channel // count for channel in total)  # type: ignore[return-value]


def cutout(image: Image.Image, inner: int, outer: int, feather: float) -> Image.Image:
    width, height = image.size
    pixels = image.load()
    reference = background_reference(pixels, width, height)

    distance = [
        [
            abs(pixels[x, y][0] - reference[0])
            + abs(pixels[x, y][1] - reference[1])
            + abs(pixels[x, y][2] - reference[2])
            for x in range(width)
        ]
        for y in range(height)
    ]

    # Só é fundo o que estiver ligado à borda: um reflexo claro no interior da
    # peça tem a cor do fundo, mas não lhe pertence.
    connected = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()
    border = (
        [(x, 0) for x in range(width)]
        + [(x, height - 1) for x in range(width)]
        + [(0, y) for y in range(height)]
        + [(width - 1, y) for y in range(height)]
    )
    for x, y in border:
        if distance[y][x] < outer and not connected[y * width + x]:
            connected[y * width + x] = 1
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if (
                0 <= nx < width
                and 0 <= ny < height
                and not connected[ny * width + nx]
                and distance[ny][nx] < outer
            ):
                connected[ny * width + nx] = 1
                queue.append((nx, ny))

    alpha = bytearray(width * height)
    for y in range(height):
        row = distance[y]
        for x in range(width):
            if not connected[y * width + x]:
                alpha[y * width + x] = 255
            else:
                value = row[x]
                alpha[y * width + x] = (
                    0 if value <= inner else int(255 * (value - inner) / (outer - inner))
                )

    mask = Image.frombytes("L", (width, height), bytes(alpha))
    mask = mask.filter(ImageFilter.GaussianBlur(feather))

    result = image.convert("RGBA")
    result.putalpha(mask)
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source")
    parser.add_argument("destination")
    parser.add_argument("--inner", type=int, default=48)
    parser.add_argument("--outer", type=int, default=130)
    parser.add_argument("--feather", type=float, default=1.2)
    parser.add_argument("--pad", type=int, default=16)
    parser.add_argument("--maxw", type=int, default=1600)
    args = parser.parse_args()

    image = Image.open(args.source).convert("RGB")
    result = cutout(image, args.inner, args.outer, args.feather)

    box = result.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if box:
        result = result.crop(
            (
                max(0, box[0] - args.pad),
                max(0, box[1] - args.pad),
                min(result.width, box[2] + args.pad),
                min(result.height, box[3] + args.pad),
            )
        )

    if result.width > args.maxw:
        height = round(result.height * args.maxw / result.width)
        result = result.resize((args.maxw, height), Image.LANCZOS)

    result.save(args.destination, optimize=True)
    print(f"{args.destination}  {result.width}x{result.height}")


if __name__ == "__main__":
    main()
