"""
Figure generator for notes/discrete-mathematics/combinatorics.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import random
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
# Figure 1 -- the reflection principle for Catalan numbers: a path that
# dips below the axis, and its reflection after the first touch, which
# lands at (2n,-2) instead of (2n,0) -- the bijection the proof uses.
# ---------------------------------------------------------------------------
def bad_path(n, seed):
    rng = random.Random(seed)
    while True:
        steps = [1] * n + [-1] * n
        rng.shuffle(steps)
        pos, positions, touch = 0, [0], None
        for i, s in enumerate(steps):
            pos += s
            positions.append(pos)
            if pos == -1 and touch is None:
                touch = i + 1
        if touch is not None:
            return positions, touch


def fig_catalan_reflection():
    n = 5
    positions, touch = bad_path(n, seed=1)
    reflected = positions[:touch + 1] + [-2 - p for p in positions[touch + 1:]]

    fig, axes = plt.subplots(1, 2, figsize=(11.5, 4.8))

    ax = axes[0]
    xs = list(range(len(positions)))
    ax.plot(xs, positions, "o-", color=ACCENT, markersize=4, linewidth=1.6, label="original path (touches $y=-1$)")
    ax.plot(xs[touch:], reflected[touch:], "o--", color=ACCENT2, markersize=4, linewidth=1.6,
             label="reflection after first touch")
    ax.plot(xs[:touch + 1], positions[:touch + 1], "o-", color=INK, markersize=4, linewidth=1.8, zorder=5)
    ax.axhline(-1, color=FADE, linewidth=1.0, linestyle=":")
    ax.axhline(0, color=FADE, linewidth=0.8)
    ax.plot(touch, -1, "s", color=ACCENT3, markersize=9, zorder=6, label="first touch of $y=-1$")
    ax.plot(len(positions) - 1, positions[-1], "*", color=INK, markersize=14, zorder=6)
    ax.plot(len(reflected) - 1, reflected[-1], "*", color=ACCENT2, markersize=14, zorder=6)
    ax.set_xlabel("step")
    ax.set_ylabel("height")
    ax.set_title(f"A path touching $y=-1$ reflects to one ending at $(2n,-2)$, $n={n}$")
    ax.legend(frameon=False, fontsize=8, loc="upper left")

    ax = axes[1]
    from math import comb
    ns = list(range(1, 10))
    catalan = [comb(2 * k, k) // (k + 1) for k in ns]
    via_reflection = [comb(2 * k, k) - comb(2 * k, k - 1) for k in ns]
    ax.plot(ns, catalan, "o", color=ACCENT, markersize=8, label="$\\frac{1}{n+1}\\binom{2n}{n}$")
    ax.plot(ns, via_reflection, "x", color=ACCENT2, markersize=10, markeredgewidth=2.5,
             label="$\\binom{2n}{n}-\\binom{2n}{n-1}$ (reflection count)")
    ax.set_xlabel("$n$")
    ax.set_ylabel("$C_n$")
    ax.set_yscale("log")
    ax.set_title("Both formulas agree exactly, every $n$")
    ax.legend(frameon=False, fontsize=9)

    fig.tight_layout()
    savefig(fig, "catalan_reflection.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Erdos-Szekeres: a sequence of n^2+1 numbers is guaranteed a
# monotone subsequence of length n+1; find and highlight the longest one.
# ---------------------------------------------------------------------------
def longest_monotone(seq):
    n = len(seq)
    inc_len = [1] * n
    inc_prev = [-1] * n
    dec_len = [1] * n
    dec_prev = [-1] * n
    for i in range(n):
        for j in range(i):
            if seq[j] < seq[i] and inc_len[j] + 1 > inc_len[i]:
                inc_len[i] = inc_len[j] + 1
                inc_prev[i] = j
            if seq[j] > seq[i] and dec_len[j] + 1 > dec_len[i]:
                dec_len[i] = dec_len[j] + 1
                dec_prev[i] = j

    def reconstruct(lengths, prevs):
        end = max(range(n), key=lambda i: lengths[i])
        path = []
        while end != -1:
            path.append(end)
            end = prevs[end]
        return path[::-1]

    if max(inc_len) >= max(dec_len):
        return reconstruct(inc_len, inc_prev), "increasing"
    return reconstruct(dec_len, dec_prev), "decreasing"


def fig_erdos_szekeres():
    n = 3
    rng = random.Random(2)
    seq = list(range(n * n + 1))
    rng.shuffle(seq)
    idxs, kind = longest_monotone(seq)

    fig, ax = plt.subplots(figsize=(8, 5.2))
    xs = list(range(len(seq)))
    ax.plot(xs, seq, "o-", color=FADE, markersize=7, linewidth=1.0, zorder=1)
    hx = [xs[i] for i in idxs]
    hy = [seq[i] for i in idxs]
    color = ACCENT if kind == "increasing" else ACCENT2
    ax.plot(hx, hy, "o-", color=color, markersize=10, linewidth=2.2, zorder=3,
             label=f"longest monotone subsequence ({kind}, length {len(idxs)})")
    for i, v in enumerate(seq):
        ax.annotate(str(v), (i, v), textcoords="offset points", xytext=(0, 8), fontsize=8, ha="center")
    ax.set_xlabel(f"position in the sequence ($n^2+1={n*n+1}$ elements, $n={n}$)")
    ax.set_ylabel("value")
    ax.set_title(f"Guaranteed length $\\geq n+1={n+1}$ — found length {len(idxs)}")
    ax.legend(frameon=False, fontsize=9, loc="lower left")
    fig.tight_layout()
    savefig(fig, "erdos_szekeres.png")


if __name__ == "__main__":
    fig_catalan_reflection()
    fig_erdos_szekeres()
