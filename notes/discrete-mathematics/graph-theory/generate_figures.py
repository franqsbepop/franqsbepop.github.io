"""
Figure generator for notes/discrete-mathematics/graph-theory.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import random
import itertools
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
ACCENT3 = "#3f7a4a"
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


# ---------------------------------------------------------------------------
# Figure 1 -- Euler's formula verified through an actual random planar
# triangulation construction (stacking a new vertex into a random face at
# each step), which preserves n - m + f = 2 by the same mechanism as the
# inductive proof.
# ---------------------------------------------------------------------------
def _area(coords, a, b, c):
    (x1, y1), (x2, y2), (x3, y3) = coords[a], coords[b], coords[c]
    return abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))


def build_triangulation(steps, seed=0, pick="random"):
    rng = random.Random(seed)
    coords = {0: (0.0, 1.0), 1: (-0.87, -0.5), 2: (0.87, -0.5)}
    faces = [(0, 1, 2)]  # only the subdividable inner face; the outer face is tracked separately
    n, m = 3, 3
    history = [(n, m, len(faces) + 1)]  # +1 for the outer face
    next_v = 3
    edges = [(0, 1), (1, 2), (0, 2)]
    for _ in range(steps):
        if pick == "largest":
            idx = max(range(len(faces)), key=lambda i: _area(coords, *faces[i]))
        else:
            idx = rng.randrange(len(faces))
        a, b, c = faces[idx]
        v = next_v
        next_v += 1
        cx = (coords[a][0] + coords[b][0] + coords[c][0]) / 3
        cy = (coords[a][1] + coords[b][1] + coords[c][1]) / 3
        coords[v] = (cx, cy)
        del faces[idx]
        faces.extend([(a, b, v), (b, c, v), (a, c, v)])
        edges.extend([(a, v), (b, v), (c, v)])
        n += 1
        m += 3
        history.append((n, m, len(faces) + 1))
    return history, coords, edges


def fig_euler_formula():
    small_history, coords, edges = build_triangulation(12, seed=5, pick="largest")  # legible drawing
    history, _, _ = build_triangulation(24, seed=3)                                  # longer run for the count trace

    fig, axes = plt.subplots(1, 2, figsize=(11.5, 5))

    ax = axes[0]
    for u, v in edges:
        x1, y1 = coords[u]
        x2, y2 = coords[v]
        ax.plot([x1, x2], [y1, y2], color=FADE, linewidth=0.9, zorder=1)
    xs = [coords[i][0] for i in coords]
    ys = [coords[i][1] for i in coords]
    ax.scatter(xs, ys, color=ACCENT2, s=22, zorder=2)
    ax.set_aspect("equal")
    ax.axis("off")
    n_final, m_final, f_final = small_history[-1]
    ax.set_title(f"A stacked triangulation: $n={n_final}$, $m={m_final}$, $f={f_final}$")

    ax = axes[1]
    steps = range(len(history))
    ns = [h[0] for h in history]
    ms = [h[1] for h in history]
    fs = [h[2] for h in history]
    invariant = [n - m_ + f_ for n, m_, f_ in history]
    ax.plot(steps, ns, "o-", color=ACCENT2, markersize=3, label="$n$ (vertices)")
    ax.plot(steps, ms, "o-", color=ACCENT3, markersize=3, label="$m$ (edges)")
    ax.plot(steps, fs, "o-", color=ACCENT, markersize=3, label="$f$ (faces)")
    ax.plot(steps, invariant, "s--", color=INK, markersize=4, label="$n-m+f$")
    ax.set_xlabel("construction step (one new vertex per step)")
    ax.set_ylabel("count")
    ax.set_title("$n-m+f=2$ at every single step")
    ax.legend(frameon=False, fontsize=9, loc="upper left")

    fig.tight_layout()
    savefig(fig, "euler_formula.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Koenig's theorem verified: max matching size vs. brute-force
# minimum vertex cover size, across many random bipartite graphs.
# ---------------------------------------------------------------------------
def random_bipartite(nA, nB, p, seed):
    rng = random.Random(seed)
    return [(a, b) for a in range(nA) for b in range(nB) if rng.random() < p]


def max_matching(nA, edges):
    adj = {a: [] for a in range(nA)}
    for a, b in edges:
        adj[a].append(b)
    matchB = {}

    def try_kuhn(a, visited):
        for b in adj[a]:
            if b not in visited:
                visited.add(b)
                if b not in matchB or try_kuhn(matchB[b], visited):
                    matchB[b] = a
                    return True
        return False

    result = 0
    for a in range(nA):
        if try_kuhn(a, set()):
            result += 1
    return result


def brute_force_min_vertex_cover(nA, nB, edges):
    verts = [("A", a) for a in range(nA)] + [("B", b) for b in range(nB)]
    for k in range(len(verts) + 1):
        for combo in itertools.combinations(verts, k):
            cover = set(combo)
            if all(("A", a) in cover or ("B", b) in cover for a, b in edges):
                return k
    return len(verts)


def fig_konig():
    rng = random.Random(0)
    trials = []
    for t in range(18):
        nA = rng.randint(3, 6)
        nB = rng.randint(3, 6)
        p = rng.uniform(0.25, 0.6)
        edges = random_bipartite(nA, nB, p, seed=t)
        mm = max_matching(nA, edges)
        vc = brute_force_min_vertex_cover(nA, nB, edges)
        trials.append((mm, vc))

    fig, ax = plt.subplots(figsize=(6.5, 6))
    mms = [t[0] for t in trials]
    vcs = [t[1] for t in trials]
    ax.plot(range(1, len(trials) + 1), mms, "o", color=ACCENT2, markersize=10,
             label="max matching size")
    ax.plot(range(1, len(trials) + 1), vcs, "x", color=ACCENT, markersize=10, markeredgewidth=2.5,
             label="min vertex cover size (brute force)")
    ax.set_xlabel("random bipartite graph trial")
    ax.set_ylabel("size")
    ax.set_title("Every trial: matching size exactly equals cover size")
    ax.legend(frameon=False, fontsize=9)
    ax.set_xticks(range(1, len(trials) + 1))
    fig.tight_layout()
    savefig(fig, "konig.png")


if __name__ == "__main__":
    fig_euler_formula()
    fig_konig()
