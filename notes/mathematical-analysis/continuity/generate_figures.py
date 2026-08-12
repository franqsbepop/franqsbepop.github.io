"""
Figure generator for notes/mathematical-analysis/continuity.html.

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
# Figure 1 -- IVT via bisection: the proof is an algorithm
# ---------------------------------------------------------------------------
def fig_ivt_bisection():
    f = lambda x: x**3 - x - 2

    def bisection(a, b, tol=1e-10, max_iter=40):
        fa = f(a)
        history = [(a, b)]
        for _ in range(max_iter):
            c = (a + b) / 2
            fc = f(c)
            if abs(fc) < tol:
                a, b = c, c
                history.append((a, b))
                break
            if fa * fc < 0:
                b = c
            else:
                a, fa = c, fc
            history.append((a, b))
        return history

    hist = bisection(1.0, 2.0)
    root = hist[-1][0]

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    x = np.linspace(1, 2, 300)
    ax.plot(x, f(x), color=INK, linewidth=1.6)
    ax.axhline(0, color=FADE, linewidth=0.8)
    ax.plot(root, 0, "o", color=ACCENT, markersize=7, zorder=5)
    ax.annotate(f"root $\\approx {root:.6f}$", xy=(root, 0), xytext=(1.3, 1.5),
                arrowprops=dict(arrowstyle="->", color=ACCENT), color=ACCENT)
    ax.set_xlabel("$x$")
    ax.set_ylabel("$f(x) = x^3 - x - 2$")
    ax.set_title("$f(1)<0<f(2)$: IVT guarantees a root in $(1,2)$")

    ax = axes[1]
    widths = [b - a for a, b in hist]
    ax.semilogy(range(len(widths)), widths, "o-", color=ACCENT2, markersize=3)
    ax.set_xlabel("bisection step")
    ax.set_ylabel("bracket width $b-a$ (log scale)")
    ax.set_title("Bracket width halves every step")

    fig.suptitle("The IVT proof (bisection) is a constructive root-finding algorithm", y=1.03)
    fig.tight_layout()
    savefig(fig, "ivt_bisection.png")


# ---------------------------------------------------------------------------
# Figure 2 -- continuous but not uniformly continuous: f(x) = 1/x on (0,1)
# ---------------------------------------------------------------------------
def fig_uniform_continuity_failure():
    f = lambda x: 1.0 / x
    eps = 0.1

    def required_delta(x0, eps, iters=60):
        lo, hi = 0.0, x0
        for _ in range(iters):
            mid = (lo + hi) / 2
            x_test = x0 - mid
            if x_test <= 0 or abs(f(x_test) - f(x0)) >= eps:
                hi = mid
            else:
                lo = mid
        return lo

    x0s = np.logspace(-3, -0.05, 40)
    deltas = np.array([required_delta(x0, eps) for x0 in x0s])
    predicted = eps * x0s**2  # from |f(x)-f(x0)| ~ |x-x0|/x0^2 near x0

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    x = np.linspace(0.02, 1.5, 300)
    ax.plot(x, f(x), color=INK, linewidth=1.6)
    for x0, color in [(0.5, ACCENT), (0.05, ACCENT2)]:
        d = required_delta(x0, eps)
        ax.axvspan(x0 - d, x0 + d, color=color, alpha=0.15)
        ax.plot(x0, f(x0), "o", color=color, markersize=6)
    ax.set_ylim(0, 20)
    ax.set_xlim(0, 1.2)
    ax.set_xlabel("$x$")
    ax.set_ylabel("$f(x)=1/x$")
    ax.set_title(r"Same $\epsilon=0.1$ window, shrinking $\delta$ near $x_0=0$")

    ax = axes[1]
    ax.loglog(x0s, deltas, "o", color=ACCENT, markersize=4, label=r"numerically required $\delta$")
    ax.loglog(x0s, predicted, "--", color=FADE, label=r"$\epsilon\, x_0^2$ (local scaling)")
    ax.set_xlabel("$x_0$ (log scale)")
    ax.set_ylabel(r"required $\delta$ for $\epsilon=0.1$ (log scale)")
    ax.set_title(r"No single $\delta$ works for all $x_0\in(0,1)$")
    ax.legend(frameon=False, fontsize=9)

    fig.suptitle(r"$f(x)=1/x$ is continuous on $(0,1)$ but not uniformly continuous there", y=1.03)
    fig.tight_layout()
    savefig(fig, "uniform_continuity_failure.png")


if __name__ == "__main__":
    fig_ivt_bisection()
    fig_uniform_continuity_failure()
