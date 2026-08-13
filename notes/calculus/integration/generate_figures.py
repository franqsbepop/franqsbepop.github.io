"""
Figure generator for notes/calculus/integration.html.

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
ACCENT3 = "#3f7a4a"
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


def f_wiggly(x):
    return 1.2 + 0.6 * np.sin(2.5 * x) - 0.15 * x


def subinterval_min_max(f, lo, hi, samples=60):
    xs = np.linspace(lo, hi, samples)
    ys = f(xs)
    return ys.min(), ys.max()


# ---------------------------------------------------------------------------
# Figure 1 -- upper/lower Riemann sums bracketing the integral, and the
# bracket width U(f,P)-L(f,P) shrinking like O(1/n) as the partition refines.
# ---------------------------------------------------------------------------
def fig_riemann_sums():
    a, b = 0.0, 3.0
    f = f_wiggly

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    n = 10
    edges = np.linspace(a, b, n + 1)
    x_fine = np.linspace(a, b, 400)
    ax.plot(x_fine, f(x_fine), color=INK, linewidth=1.8, zorder=5, label="$f(x)$")
    lowers, uppers = [], []
    for i in range(n):
        lo, hi = edges[i], edges[i + 1]
        m, M = subinterval_min_max(f, lo, hi)
        lowers.append(m)
        uppers.append(M)
        ax.bar(lo, m, width=(hi - lo), align="edge", color=ACCENT2, alpha=0.35,
               edgecolor=ACCENT2, linewidth=0.8, zorder=1)
    upper_step = np.repeat(uppers, 2)
    x_step = np.empty(2 * n)
    x_step[0::2] = edges[:-1]
    x_step[1::2] = edges[1:]
    ax.plot(x_step, upper_step, color=ACCENT, linewidth=1.4, zorder=4, label="upper sum heights")
    ax.set_xlabel("$x$")
    ax.set_ylabel("$f(x)$")
    ax.set_ylim(0, 2.2)
    ax.set_title(f"Lower sum (shaded, $n={n}$) vs. upper-sum heights (red step)")
    ax.legend(frameon=False, fontsize=8, loc="upper right")

    ax = axes[1]
    ns = np.unique(np.round(np.logspace(np.log10(4), np.log10(2000), 25)).astype(int))
    gaps = []
    for n_ in ns:
        edges_ = np.linspace(a, b, n_ + 1)
        L = 0.0
        U = 0.0
        for i in range(n_):
            lo, hi = edges_[i], edges_[i + 1]
            m, M = subinterval_min_max(f, lo, hi, samples=20)
            L += m * (hi - lo)
            U += M * (hi - lo)
        gaps.append(U - L)
    gaps = np.array(gaps)
    ax.loglog(ns, gaps, "o", color=ACCENT, markersize=4, label="$U(f,P_n)-L(f,P_n)$")
    ref = gaps[0] * ns[0] / ns
    ax.loglog(ns, ref, "--", color=FADE, linewidth=1.0, label="$O(1/n)$")
    ax.set_xlabel("number of subintervals $n$ (log scale)")
    ax.set_ylabel("upper $-$ lower sum (log scale)")
    ax.set_title("The Riemann-sum bracket closes at rate $O(1/n)$")
    ax.legend(frameon=False, fontsize=8)

    fig.suptitle("Continuous $\\Rightarrow$ integrable: the upper and lower sums squeeze together", y=1.03)
    fig.tight_layout()
    savefig(fig, "riemann_sums.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Trapezoidal (O(h^2)) vs Simpson's rule (O(h^4)) convergence,
# verified against the exact value of integral_0^pi sin(x) dx = 2.
# ---------------------------------------------------------------------------
def trapezoidal(f, a, b, n):
    x = np.linspace(a, b, n + 1)
    y = f(x)
    h = (b - a) / n
    return h * (y[0] / 2 + y[1:-1].sum() + y[-1] / 2)


def simpson(f, a, b, n):
    if n % 2 == 1:
        n += 1
    x = np.linspace(a, b, n + 1)
    y = f(x)
    h = (b - a) / n
    return h / 3 * (y[0] + y[-1] + 4 * y[1:-1:2].sum() + 2 * y[2:-1:2].sum())


def fig_quadrature_convergence():
    f = np.sin
    a, b = 0.0, np.pi
    exact = 2.0

    ns = np.array([4, 8, 16, 32, 64, 128, 256, 512])
    trap_err = np.array([abs(trapezoidal(f, a, b, int(n)) - exact) for n in ns])
    simp_err = np.array([abs(simpson(f, a, b, int(n)) - exact) for n in ns])

    fig, ax = plt.subplots(figsize=(6.2, 4.8))
    ax.loglog(ns, trap_err, "o-", color=ACCENT2, markersize=4, label="trapezoidal rule")
    ax.loglog(ns, simp_err, "o-", color=ACCENT, markersize=4, label="Simpson's rule")
    ax.loglog(ns, trap_err[0] * (ns[0] / ns) ** 2, "--", color=FADE, linewidth=1.0, label="$O(n^{-2})$")
    ax.loglog(ns, simp_err[0] * (ns[0] / ns) ** 4, ":", color=FADE, linewidth=1.0, label="$O(n^{-4})$")
    ax.set_xlabel("number of subintervals $n$ (log scale)")
    ax.set_ylabel("$|\\text{approximation} - 2|$ (log scale)")
    ax.set_title("Quadrature error matches the theoretical order, on $\\int_0^\\pi \\sin x\\,dx=2$")
    ax.legend(frameon=False, fontsize=9)
    fig.tight_layout()
    savefig(fig, "quadrature_convergence.png")


if __name__ == "__main__":
    fig_riemann_sums()
    fig_quadrature_convergence()
