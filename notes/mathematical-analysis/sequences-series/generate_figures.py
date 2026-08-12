"""
Figure generator for notes/mathematical-analysis/sequences-series.html.

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


# ---------------------------------------------------------------------------
# Figure 1 -- Riemann rearrangement: a conditionally convergent series
# rearranged to converge to any chosen target.
# ---------------------------------------------------------------------------
def rearrange_to_target(target, n_terms):
    def pos_gen():
        k = 1
        while True:
            yield 1.0 / (2 * k - 1)
            k += 1

    def neg_gen():
        k = 1
        while True:
            yield 1.0 / (2 * k)
            k += 1

    pos, neg = pos_gen(), neg_gen()
    partial = 0.0
    history = np.empty(n_terms)
    p, ng = next(pos), next(neg)
    for i in range(n_terms):
        if partial <= target:
            partial += p
            p = next(pos)
        else:
            partial -= ng
            ng = next(neg)
        history[i] = partial
    return history


def fig_riemann_rearrangement():
    n_terms = 4000
    n = np.arange(1, n_terms + 1)

    standard = np.cumsum([(-1) ** (k + 1) / k for k in n])

    fig, ax = plt.subplots(figsize=(9, 5))
    ax.plot(n, standard, color=INK, linewidth=1.2, label=r"standard order $\to \ln 2 \approx 0.693$")
    ax.axhline(np.log(2), color=INK, linestyle=":", linewidth=0.8)

    for target, color in [(1.0, ACCENT), (-1.0, ACCENT2), (0.0, ACCENT3)]:
        h = rearrange_to_target(target, n_terms)
        ax.plot(n, h, color=color, linewidth=1.0, alpha=0.85, label=rf"rearranged $\to {target:.0f}$")
        ax.axhline(target, color=color, linestyle=":", linewidth=0.8)

    ax.set_xlabel("number of terms added")
    ax.set_ylabel("partial sum")
    ax.set_title(r"The same terms of $\sum (-1)^{n+1}/n$, added in different orders")
    ax.legend(frameon=False, fontsize=9, loc="upper right")
    savefig(fig, "riemann_rearrangement.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Cauchy-Hadamard radius of convergence: inside/at/outside R
# ---------------------------------------------------------------------------
def fig_radius_of_convergence():
    # sum (x/3)^n  ->  c_n = (1/3)^n, ratio test gives R = 3 exactly
    R = 3.0
    n_terms = 60
    n = np.arange(0, n_terms)

    fig, ax = plt.subplots(figsize=(8, 5))
    cases = [
        (2.0, ACCENT, r"$x=2$  ($|x|<R$): converges"),
        (3.0, "#b58900", r"$x=3$  ($|x|=R$, boundary): diverges here"),
        (4.0, ACCENT2, r"$x=4$  ($|x|>R$): diverges"),
    ]
    for x, color, label in cases:
        terms = (x / R) ** n
        partial = np.cumsum(terms)
        ax.plot(n, partial, color=color, linewidth=1.4, label=label)

    ax.set_yscale("symlog")
    ax.set_xlabel("number of terms $n$")
    ax.set_ylabel("partial sum (symlog scale)")
    ax.set_title(r"$\sum (x/3)^n$: behavior at the Cauchy–Hadamard radius $R=3$")
    ax.legend(frameon=False, fontsize=9)
    savefig(fig, "radius_of_convergence.png")


if __name__ == "__main__":
    fig_riemann_rearrangement()
    fig_radius_of_convergence()
