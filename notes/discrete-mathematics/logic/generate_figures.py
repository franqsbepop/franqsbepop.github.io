"""
Figure generator for notes/discrete-mathematics/logic.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

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
ACCENT3 = "#3f7a4a"
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


# ---------------------------------------------------------------------------
# Figure 1 -- a resolution refutation: a small unsatisfiable clause set,
# resolved down to the empty clause, drawn as the actual derivation DAG.
# ---------------------------------------------------------------------------
def resolve(c1, c2):
    out = []
    for l in c1:
        if -l in c2:
            out.append(frozenset((c1 - {l}) | (c2 - {-l})))
    return out


def clause_str(c):
    if not c:
        return "□"  # empty clause symbol
    names = {1: "p", -1: "¬p", 2: "q", -2: "¬q"}
    return "(" + " ∨ ".join(names[l] for l in sorted(c, key=lambda x: (abs(x), x))) + ")"


def fig_resolution():
    C1, C2, C3, C4 = frozenset({1, 2}), frozenset({1, -2}), frozenset({-1, 2}), frozenset({-1, -2})
    C5 = resolve(C1, C2)[0]   # {1}
    C6 = resolve(C3, C4)[0]   # {-1}
    C7 = resolve(C5, C6)[0]   # empty

    nodes = {
        "C1": (clause_str(C1), 0.12, 0.85), "C2": (clause_str(C2), 0.38, 0.85),
        "C3": (clause_str(C3), 0.62, 0.85), "C4": (clause_str(C4), 0.88, 0.85),
        "C5": (clause_str(C5), 0.25, 0.5), "C6": (clause_str(C6), 0.75, 0.5),
        "C7": (clause_str(C7), 0.5, 0.15),
    }
    edges = [("C1", "C5"), ("C2", "C5"), ("C3", "C6"), ("C4", "C6"), ("C5", "C7"), ("C6", "C7")]

    fig, ax = plt.subplots(figsize=(8.5, 6))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    for key, (label, x, y) in nodes.items():
        color = ACCENT if key == "C7" else INK
        w = 0.16
        box = FancyBboxPatch((x - w / 2, y - 0.055), w, 0.11, boxstyle="round,pad=0.01",
                              linewidth=1.3, edgecolor=color, facecolor="white", zorder=3)
        ax.add_patch(box)
        ax.text(x, y, label, ha="center", va="center", fontsize=12, zorder=4)

    for u, v in edges:
        x1, y1 = nodes[u][1], nodes[u][2]
        x2, y2 = nodes[v][1], nodes[v][2]
        arrow = FancyArrowPatch((x1, y1 - 0.06), (x2, y2 + 0.06), arrowstyle="-|>",
                                 mutation_scale=13, color=ACCENT2, linewidth=1.2, zorder=2)
        ax.add_patch(arrow)

    ax.set_title("Resolving $(p\\vee q),(p\\vee\\neg q),(\\neg p\\vee q),(\\neg p\\vee\\neg q)$ to the empty clause",
                  fontsize=12, fontweight="bold")
    fig.tight_layout()
    savefig(fig, "resolution.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Cantor's diagonal argument made concrete: a proposed
# enumeration f: {1..6} -> P({1..6}), and the diagonal set D that differs
# from every f(i) at position i, so D is not in the enumeration's range.
# ---------------------------------------------------------------------------
def fig_cantor():
    n = 6
    f = {
        1: {2, 4, 6},
        2: {1, 2, 3},
        3: set(),
        4: {1, 3, 4, 5, 6},
        5: {5},
        6: {1, 2, 3, 4, 5, 6},
    }
    D = {i for i in range(1, n + 1) if i not in f[i]}

    grid = np.zeros((n + 1, n))
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            grid[i - 1, j - 1] = 1 if j in f[i] else 0
    for j in range(1, n + 1):
        grid[n, j - 1] = 1 if j in D else 0

    fig, ax = plt.subplots(figsize=(7, 6))
    ax.imshow(grid, cmap="Greys", vmin=0, vmax=1, aspect="equal", alpha=0.55)

    for i in range(1, n + 1):
        for j in range(1, n + 1):
            val = int(j in f[i])
            ax.text(j - 1, i - 1, str(val), ha="center", va="center", fontsize=11, color=INK)
    for j in range(1, n + 1):
        val = int(j in D)
        ax.text(j - 1, n, str(val), ha="center", va="center", fontsize=11, color=ACCENT, fontweight="bold")

    for i in range(1, n + 1):
        rect = plt.Rectangle((i - 1 - 0.5, i - 1 - 0.5), 1, 1, fill=False, edgecolor=ACCENT, linewidth=2.2)
        ax.add_patch(rect)

    ax.set_xticks(range(n))
    ax.set_xticklabels([f"${j}$" for j in range(1, n + 1)])
    ax.set_yticks(list(range(n)) + [n])
    ax.set_yticklabels([f"$f({i})$" for i in range(1, n + 1)] + ["$D$"])
    ax.set_xlabel("membership of column-element in the row's set (1 = member, 0 = not)")
    ax.axhline(n - 0.5, color=INK, linewidth=1.4)
    ax.set_title("$D$ disagrees with every $f(i)$ at the diagonal cell $i$ — so $D\\neq f(i)$ for any $i$")
    fig.tight_layout()
    savefig(fig, "cantor.png")


if __name__ == "__main__":
    fig_resolution()
    fig_cantor()
