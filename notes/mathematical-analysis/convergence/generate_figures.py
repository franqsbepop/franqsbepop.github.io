"""
Figure generator for notes/mathematical-analysis/convergence.html.

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
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


# ---------------------------------------------------------------------------
# Figure 1 -- f_n(x) = x^n: pointwise convergence without uniform convergence
# ---------------------------------------------------------------------------
def fig_pointwise_not_uniform():
    x = np.linspace(0, 1, 500)
    ns = [1, 2, 5, 10, 30, 100]

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    colors = plt.cm.viridis(np.linspace(0.15, 0.85, len(ns)))
    for n, c in zip(ns, colors):
        ax.plot(x, x**n, color=c, linewidth=1.4, label=f"$n={n}$")
    ax.plot([0, 1], [0, 0], color=INK, linewidth=1.0)
    ax.plot(1, 1, "o", color=INK, markersize=6, zorder=5)
    ax.set_xlabel("$x$")
    ax.set_ylabel("$f_n(x)=x^n$")
    ax.set_title("Pointwise limit: $0$ on $[0,1)$, jumps to $1$ at $x=1$")
    ax.legend(frameon=False, fontsize=8, loc="upper left")

    ax = axes[1]
    n_range = np.arange(1, 150)
    x_dense = np.linspace(0, 1 - 1e-6, 200000)
    sup_norms = [np.max(x_dense**n) for n in n_range]
    ax.plot(n_range, sup_norms, color=ACCENT, linewidth=1.6)
    ax.axhline(0, color=FADE, linewidth=0.8)
    ax.set_ylim(-0.05, 1.05)
    ax.set_xlabel("$n$")
    ax.set_ylabel(r"$\sup_{x\in[0,1)} |f_n(x)-0|$")
    ax.set_title(r"Sup-norm distance to the limit: stuck at $1$, never $\to 0$")

    fig.suptitle(r"$f_n(x)=x^n \to 0$ pointwise on $[0,1)$, but not uniformly", y=1.03)
    fig.tight_layout()
    savefig(fig, "pointwise_not_uniform.png")


# ---------------------------------------------------------------------------
# Figure 2 -- uniform convergence of f_n does not give convergence of f_n'
# ---------------------------------------------------------------------------
def fig_derivative_failure():
    x = np.linspace(0, 2 * np.pi, 500)
    ns = [1, 3, 10, 30]

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    colors = plt.cm.plasma(np.linspace(0.1, 0.75, len(ns)))
    for n, c in zip(ns, colors):
        ax.plot(x, np.sin(n * x) / n, color=c, linewidth=1.4, label=f"$n={n}$")
    ax.axhline(0, color=INK, linewidth=1.0, label="limit $f=0$")
    ax.set_xlabel("$x$")
    ax.set_ylabel(r"$f_n(x)=\sin(nx)/n$")
    ax.set_title(r"$f_n \to 0$ uniformly ($\sup|f_n| = 1/n \to 0$)")
    ax.legend(frameon=False, fontsize=8, loc="upper right")

    ax = axes[1]
    for n, c in zip(ns, colors):
        ax.plot(x, np.cos(n * x), color=c, linewidth=1.0, alpha=0.8, label=f"$n={n}$")
    ax.set_xlabel("$x$")
    ax.set_ylabel(r"$f_n'(x)=\cos(nx)$")
    ax.set_title(r"$f_n'$ does not converge anywhere (oscillates faster, not smaller)")
    ax.legend(frameon=False, fontsize=8, loc="upper right")

    fig.suptitle(r"Uniform convergence of $f_n$ says nothing about convergence of $f_n'$", y=1.03)
    fig.tight_layout()
    savefig(fig, "derivative_failure.png")


if __name__ == "__main__":
    fig_pointwise_not_uniform()
    fig_derivative_failure()
