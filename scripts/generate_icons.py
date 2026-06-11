#!/usr/bin/env python3
"""
Gerador de ícones do Voz Mágica
Cria o ícone (microfone mágico em gradiente rosa-laranja) em todas as
densidades necessárias para Android, iOS e lojas.

Uso: python3 scripts/generate_icons.py
"""

import os
from PIL import Image, ImageDraw

BASE = 1024
PINK = (255, 107, 157)    # #FF6B9D
ORANGE = (255, 169, 77)   # #FFA94D
WHITE = (255, 255, 255)
YELLOW = (255, 217, 61)   # #FFD93D

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def make_base_icon() -> Image.Image:
    """Desenha o ícone base 1024x1024."""
    img = Image.new('RGB', (BASE, BASE))
    draw = ImageDraw.Draw(img)

    # Gradiente vertical rosa -> laranja
    for y in range(BASE):
        t = y / BASE
        r = int(PINK[0] + (ORANGE[0] - PINK[0]) * t)
        g = int(PINK[1] + (ORANGE[1] - PINK[1]) * t)
        b = int(PINK[2] + (ORANGE[2] - PINK[2]) * t)
        draw.line([(0, y), (BASE, y)], fill=(r, g, b))

    # Corpo do microfone (cápsula branca)
    draw.rounded_rectangle([402, 240, 622, 580], radius=110, fill=WHITE)

    # Linhas da grade do microfone (detalhe)
    grid_color = (255, 200, 220)
    for gy in (330, 410, 490):
        draw.line([(440, gy), (584, gy)], fill=grid_color, width=14)

    # Suporte (arco em U)
    draw.arc([342, 380, 682, 700], start=0, end=180, fill=WHITE, width=44)

    # Haste vertical
    draw.line([(512, 700), (512, 790)], fill=WHITE, width=44)

    # Base horizontal
    draw.rounded_rectangle([402, 790, 622, 834], radius=22, fill=WHITE)

    # Estrela mágica (4 pontas) no canto superior direito
    star_cx, star_cy, R, r_in = 760, 250, 90, 30
    star = [
        (star_cx, star_cy - R), (star_cx + r_in, star_cy - r_in),
        (star_cx + R, star_cy), (star_cx + r_in, star_cy + r_in),
        (star_cx, star_cy + R), (star_cx - r_in, star_cy + r_in),
        (star_cx - R, star_cy), (star_cx - r_in, star_cy - r_in),
    ]
    draw.polygon(star, fill=YELLOW)

    # Estrelinha menor
    s_cx, s_cy, R2, r2 = 280, 720, 50, 17
    star2 = [
        (s_cx, s_cy - R2), (s_cx + r2, s_cy - r2),
        (s_cx + R2, s_cy), (s_cx + r2, s_cy + r2),
        (s_cx, s_cy + R2), (s_cx - r2, s_cy + r2),
        (s_cx - R2, s_cy), (s_cx - r2, s_cy - r2),
    ]
    draw.polygon(star2, fill=YELLOW)

    return img


def make_round(img: Image.Image) -> Image.Image:
    """Aplica máscara circular (para ic_launcher_round)."""
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).ellipse([0, 0, img.size[0], img.size[1]], fill=255)
    out = Image.new('RGBA', img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def save_png(img: Image.Image, path: str, size: int):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.resize((size, size), Image.LANCZOS).save(path, 'PNG')
    print(f'  ✓ {os.path.relpath(path, ROOT)} ({size}x{size})')


def main():
    print('🎨 Gerando ícones do Voz Mágica...\n')
    base = make_base_icon()
    base_round = make_round(base)

    # Android mipmaps
    android_sizes = {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192,
    }
    res_dir = os.path.join(ROOT, 'android', 'app', 'src', 'main', 'res')
    print('Android:')
    for folder, size in android_sizes.items():
        save_png(base, os.path.join(res_dir, folder, 'ic_launcher.png'), size)
        save_png(base_round, os.path.join(res_dir, folder, 'ic_launcher_round.png'), size)

    # Lojas e iOS
    print('\nLojas / iOS:')
    assets_dir = os.path.join(ROOT, 'store', 'icons')
    save_png(base, os.path.join(assets_dir, 'playstore-512.png'), 512)
    save_png(base, os.path.join(assets_dir, 'appstore-1024.png'), 1024)
    save_png(base, os.path.join(ROOT, 'ios', 'VozMagica', 'AppIcon-1024.png'), 1024)

    print('\n✅ Ícones gerados com sucesso!')


if __name__ == '__main__':
    main()
