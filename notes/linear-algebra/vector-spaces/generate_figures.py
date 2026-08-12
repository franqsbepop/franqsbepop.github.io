"""
Figure generator for notes/linear-algebra/vector-spaces.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import numpy as np
import matplotlib.pyplot as plt

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
ACCENT3 = "#4a7a4a"
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


def arrow(ax, start, end, color, lw=2.2, alpha=1.0, zorder=3):
    ax.annotate("", xy=end, xytext=start,
                arrowprops=dict(arrowstyle="->", color=color, linewidth=lw, alpha=alpha), zorder=zorder)


# ---------------------------------------------------------------------------
# Figure 1 -- orthogonal projection onto a line, and the Pythagorean identity
# ---------------------------------------------------------------------------
def fig_orthogonal_projection():
    u = np.array([3.0, 1.0])          # spans the subspace W = span{u}
    x = np.array([1.5, 3.0])          # the vector being projected
    proj = (x @ u) / (u @ u) * u      # P_W x
    resid = x - proj                  # x - P_W x, orthogonal to W

    fig, ax = plt.subplots(figsize=(7, 6.2))

    # the line W = span{u}, extended both directions
    t = np.linspace(-1, 2, 10)
    line = np.outer(t, u)
    ax.plot(line[:, 0], line[:, 1], color=FADE, linewidth=1, zorder=1, label=r"$W=\mathrm{span}\{u\}$")

    arrow(ax, (0, 0), x, INK)
    ax.text(*(x + [0.08, 0.05]), r"$x$", fontsize=13)

    arrow(ax, (0, 0), proj, ACCENT)
    ax.text(*(proj + [0.05, -0.32]), r"$P_W x$", fontsize=13, color=ACCENT)

    arrow(ax, proj, x, ACCENT2)
    mid = proj + 0.5 * resid
    ax.text(*(mid + [0.12, 0.0]), r"$x-P_Wx$", fontsize=13, color=ACCENT2)

    # right-angle marker at the foot of the projection
    d = resid / np.linalg.norm(resid)
    e = u / np.linalg.norm(u)
    corner = proj
    s = 0.18
    p1 = corner - s * e
    p2 = corner - s * e + s * d
    p3 = corner + s * d
    ax.plot([p1[0], p2[0], p3[0]], [p1[1], p2[1], p3[1]], color=INK, linewidth=1)

    ax.set_xlim(-1, 3.5)
    ax.set_ylim(-0.5, 3.5)
    ax.set_aspect("equal")
    ax.legend(frameon=False, fontsize=10, loc="upper left")
    ax.set_title("Orthogonal projection minimizes distance to $W$")

    nx2, nproj2, nresid2 = x @ x, proj @ proj, resid @ resid
    ax.text(0.02, -0.14,
             rf"$\|x\|^2={nx2:.2f}\ \ \|P_Wx\|^2={nproj2:.2f}\ \ \|x-P_Wx\|^2={nresid2:.2f}\ \ $"
             rf"(sum of last two $={nproj2+nresid2:.2f}$)",
             transform=ax.transAxes, fontsize=9.5)

    savefig(fig, "orthogonal_projection.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Gram-Schmidt: two non-orthogonal vectors -> orthonormal pair
# ---------------------------------------------------------------------------
def fig_gram_schmidt():
    v1 = np.array([2.0, 0.5])
    v2 = np.array([1.0, 2.0])

    u1 = v1 / np.linalg.norm(v1)
    proj = (v2 @ u1) * u1
    w2 = v2 - proj
    u2 = w2 / np.linalg.norm(w2)

    fig, axes = plt.subplots(1, 2, figsize=(11, 5.2))

    ax = axes[0]
    arrow(ax, (0, 0), v1, INK)
    ax.text(*(v1 + [0.05, 0.05]), r"$v_1$", fontsize=13)
    arrow(ax, (0, 0), v2, INK)
    ax.text(*(v2 + [0.05, 0.05]), r"$v_2$", fontsize=13)
    arrow(ax, (0, 0), proj, ACCENT, alpha=0.7)
    ax.text(*(proj + [0.05, -0.25]), r"$\mathrm{proj}_{u_1}(v_2)$", fontsize=10, color=ACCENT)
    arrow(ax, proj, v2, ACCENT2)
    ax.text(*(proj + 0.5 * w2 + [0.1, 0]), r"$w_2=v_2-\mathrm{proj}_{u_1}(v_2)$", fontsize=9.5, color=ACCENT2)
    ax.set_xlim(-0.5, 2.5)
    ax.set_ylim(-0.5, 2.5)
    ax.set_aspect("equal")
    ax.set_title("Step 1: subtract the component of $v_2$ along $u_1$")

    ax = axes[1]
    arrow(ax, (0, 0), u1, ACCENT3)
    ax.text(*(u1 + [0.05, 0.05]), r"$u_1=v_1/\|v_1\|$", fontsize=10, color=ACCENT3)
    arrow(ax, (0, 0), u2, ACCENT3)
    ax.text(*(u2 + [0.05, 0.05]), r"$u_2=w_2/\|w_2\|$", fontsize=10, color=ACCENT3)
    # right-angle marker between u1, u2
    s = 0.12
    p1 = s * u1
    p2 = s * u1 + s * u2
    p3 = s * u2
    ax.plot([p1[0], p2[0], p3[0]], [p1[1], p2[1], p3[1]], color=INK, linewidth=1)
    ax.text(0.05, 0.95, rf"$u_1\cdot u_2={u1@u2:.2e}$" + "\n(orthonormal to machine precision)",
             transform=ax.transAxes, fontsize=9.5, va="top")
    ax.set_xlim(-0.5, 1.5)
    ax.set_ylim(-0.5, 1.5)
    ax.set_aspect("equal")
    ax.set_title("Result: orthonormal basis $\\{u_1, u_2\\}$ of $\\mathrm{span}\\{v_1,v_2\\}$")

    fig.suptitle("Gram--Schmidt orthogonalization", y=1.02)
    fig.tight_layout()
    savefig(fig, "gram_schmidt.png")


if __name__ == "__main__":
    fig_orthogonal_projection()
    fig_gram_schmidt()
