"""
Figure generator for notes/calculus/differentiation.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import math
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
# Figure 1 -- secant lines converging to the tangent, and how fast finite
# differences converge to f'(a): forward O(h) vs central O(h^2), until
# floating-point roundoff takes over.
# ---------------------------------------------------------------------------
def fig_secant_to_tangent():
    f = lambda x: np.sin(x)
    a = 1.0
    fprime_a = math.cos(a)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    x = np.linspace(0.0, 2.4, 300)
    ax.plot(x, f(x), color=INK, linewidth=1.6, label="$f(x)=\\sin x$")
    for h, color in [(1.0, FADE), (0.5, ACCENT2), (0.15, ACCENT)]:
        xs = np.array([a, a + h])
        ys = f(xs)
        slope = (ys[1] - ys[0]) / h
        xx = np.linspace(0.0, 2.4, 50)
        ax.plot(xx, ys[0] + slope * (xx - a), color=color, linewidth=1.0,
                 label=f"secant $h={h}$")
        ax.plot(a + h, f(a + h), "o", color=color, markersize=4)
    tangent = fprime_a * (x - a) + f(a)
    ax.plot(x, tangent, "--", color=ACCENT3, linewidth=1.4, label="tangent ($h\\to0$)")
    ax.plot(a, f(a), "o", color=INK, markersize=5, zorder=5)
    ax.set_ylim(-0.3, 1.6)
    ax.set_xlabel("$x$")
    ax.set_ylabel("$f(x)$")
    ax.set_title("Secants at $a=1$ pivoting toward the tangent as $h\\to0$")
    ax.legend(frameon=False, fontsize=8, loc="upper left")

    ax = axes[1]
    hs = np.logspace(-1, -16, 200)
    forward_err = np.abs((f(a + hs) - f(a)) / hs - fprime_a)
    central_err = np.abs((f(a + hs) - f(a - hs)) / (2 * hs) - fprime_a)
    ax.loglog(hs, forward_err, color=ACCENT2, linewidth=1.4, label="forward difference")
    ax.loglog(hs, central_err, color=ACCENT, linewidth=1.4, label="central difference")
    ax.loglog(hs, hs, "--", color=FADE, linewidth=1.0, label="$O(h)$")
    ax.loglog(hs, hs**2, ":", color=FADE, linewidth=1.0, label="$O(h^2)$")
    ax.set_xlabel("$h$ (log scale, decreasing $\\to$)")
    ax.set_ylabel("$|\\text{difference quotient} - f'(a)|$ (log scale)")
    ax.set_title("Both converge, then roundoff wins: no free lunch from $h\\to0$")
    ax.invert_xaxis()
    ax.legend(frameon=False, fontsize=8, loc="lower left")

    fig.suptitle("The derivative as a limit of difference quotients, in theory and in floating point", y=1.03)
    fig.tight_layout()
    savefig(fig, "secant_to_tangent.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Taylor polynomials of cos(x) at a=0, and the Lagrange
# remainder bound verified numerically against the actual error at x=2.
# ---------------------------------------------------------------------------
def fig_taylor_remainder():
    f = np.cos

    def taylor_poly(x, n):
        # Maclaurin polynomial of cos(x) up to degree n.
        total = np.zeros_like(x)
        for k in range(0, n + 1, 2):
            sign = 1 if (k // 2) % 2 == 0 else -1
            total = total + sign * x**k / math.factorial(k)
        return total

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    x = np.linspace(-3.2, 3.2, 400)
    ax.plot(x, f(x), color=INK, linewidth=1.8, label="$\\cos x$")
    for n, color in [(0, FADE), (2, ACCENT2), (4, ACCENT3), (6, ACCENT)]:
        ax.plot(x, taylor_poly(x, n), linewidth=1.2, color=color, label=f"$T_{{{n}}}(x)$")
    ax.set_ylim(-2.5, 2.5)
    ax.set_xlabel("$x$")
    ax.set_ylabel("value")
    ax.set_title("Better near $0$, then peel away as $n$ grows")
    ax.legend(frameon=False, fontsize=8, loc="upper center", ncol=2)

    ax = axes[1]
    x0 = 2.0
    ns = np.arange(0, 13)
    actual_err = np.array([abs(f(x0) - taylor_poly(np.array([x0]), n)[0]) for n in ns])
    lagrange_bound = np.array([abs(x0)**(n + 1) / math.factorial(n + 1) for n in ns])  # M=1 for cos
    ax.semilogy(ns, actual_err, "o-", color=ACCENT, markersize=4, label="actual error $|\\cos(2)-T_n(2)|$")
    ax.semilogy(ns, lagrange_bound, "s--", color=FADE, markersize=4, label="Lagrange bound $\\frac{|2|^{n+1}}{(n+1)!}$")
    ax.set_xlabel("degree $n$")
    ax.set_ylabel("error (log scale)")
    ax.set_title("Bound holds, and both decay factorially in $n$")
    ax.legend(frameon=False, fontsize=8)

    fig.suptitle("Taylor's theorem at $a=0$: polynomial approximation with a proved, checkable error bound", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "taylor_remainder.png")


if __name__ == "__main__":
    fig_secant_to_tangent()
    fig_taylor_remainder()
