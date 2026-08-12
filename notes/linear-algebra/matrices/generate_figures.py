"""
Figure generator for notes/linear-algebra/matrices.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

HERE = os.path.dirname(os.path.abspath(__file__))
FIG_DIR = os.path.join(HERE, "figures")
os.makedirs(FIG_DIR, exist_ok=True)

plt.rcParams.update({
    "font.family": "serif",
    "font.size": 11,
    "axes.edgecolor": "#4a4a4a",
    "axes.labelcolor": "#2c2c2c",
    "axes.titlesize": 12,
    "axes.titleweight": "bold",
    "xtick.color": "#4a4a4a",
    "ytick.color": "#4a4a4a",
    "text.color": "#2c2c2c",
    "axes.grid": True,
    "grid.color": "#d8d8d8",
    "grid.linewidth": 0.6,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "figure.facecolor": "white",
    "savefig.facecolor": "white",
    "savefig.dpi": 180,
    "savefig.bbox": "tight",
})

INK = "#2c2c2c"
ACCENT = "#8c2f2f"
ACCENT2 = "#2f5f8c"
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


def draw_grid_transform(ax, A, title, color):
    # deformed grid lines
    lines = np.linspace(-2, 2, 9)
    t = np.linspace(-2, 2, 100)
    for c in lines:
        horiz = np.stack([t, np.full_like(t, c)])
        vert = np.stack([np.full_like(t, c), t])
        for seg in (horiz, vert):
            img = A @ seg
            ax.plot(img[0], img[1], color=FADE, linewidth=0.5, alpha=0.6, zorder=1)

    # unit square and its image
    square = np.array([[0, 1, 1, 0], [0, 0, 1, 1]], dtype=float)
    image = A @ square
    ax.add_patch(Polygon(square.T, closed=True, facecolor="none", edgecolor=INK, linewidth=1.4, linestyle="--", zorder=2))
    ax.add_patch(Polygon(image.T, closed=True, facecolor=color, edgecolor=color, alpha=0.35, linewidth=1.8, zorder=3))

    # mark corners with different markers to show orientation
    markers = ["o", "s", "^", "D"]
    for i in range(4):
        ax.plot(*square[:, i], marker=markers[i], color=INK, markersize=5, zorder=4)
        ax.plot(*image[:, i], marker=markers[i], color=color, markersize=6, zorder=4)

    ax.set_xlim(-2.2, 3.2)
    ax.set_ylim(-2.2, 3.2)
    ax.set_aspect("equal")
    ax.set_title(title, fontsize=10.5)
    ax.axhline(0, color=FADE, linewidth=0.6, zorder=0)
    ax.axvline(0, color=FADE, linewidth=0.6, zorder=0)


def fig_determinant_area():
    A = np.array([[2.0, 1.0], [0.5, 1.5]])   # det = 2.5 > 0, orientation preserved
    B = np.array([[1.0, 2.0], [2.0, 1.0]])   # det = -3 < 0, orientation flipped

    detA = np.linalg.det(A)
    detB = np.linalg.det(B)

    fig, axes = plt.subplots(1, 2, figsize=(10.5, 5.2))
    draw_grid_transform(axes[0], A, f"A=[[2,1],[0.5,1.5]],  det(A)={detA:.1f} > 0\ncorner order preserved (○→□→△→◇ still counterclockwise)", ACCENT)
    draw_grid_transform(axes[1], B, f"B=[[1,2],[2,1]],  det(B)={detB:.1f} < 0\ncorner order reversed (orientation flips)", ACCENT2)
    fig.suptitle(r"$|\det|$ = area scaling factor of the unit square; $\mathrm{sign}(\det)$ = orientation", y=1.02)
    fig.tight_layout()
    savefig(fig, "determinant_area.png")


if __name__ == "__main__":
    fig_determinant_area()
