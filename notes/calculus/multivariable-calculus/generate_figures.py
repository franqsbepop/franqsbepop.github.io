"""
Figure generator for notes/calculus/multivariable-calculus.html.

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


# ---------------------------------------------------------------------------
# Figure 1 -- the gradient as the direction of steepest ascent: contour plot
# with the gradient vector, and the directional derivative as a function of
# angle, peaking exactly where the direction aligns with the gradient.
# ---------------------------------------------------------------------------
def fig_gradient_steepest_ascent():
    f = lambda x, y: x**2 + 2 * y**2
    grad = lambda x, y: np.array([2 * x, 4 * y])

    p = np.array([1.0, 0.5])
    g = grad(*p)
    gnorm = np.linalg.norm(g)
    theta0 = np.arctan2(g[1], g[0])

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    x = np.linspace(-2.2, 2.2, 300)
    y = np.linspace(-1.6, 1.6, 300)
    X, Y = np.meshgrid(x, y)
    Z = f(X, Y)
    levels = np.linspace(0, 8, 13)
    cs = ax.contour(X, Y, Z, levels=levels, colors=FADE, linewidths=0.8)
    ax.contour(X, Y, Z, levels=[f(*p)], colors=[ACCENT2], linewidths=1.4)
    ax.plot(*p, "o", color=INK, markersize=6, zorder=5)
    ax.annotate("", xy=p + g / gnorm * 0.9, xytext=p,
                arrowprops=dict(arrowstyle="->", color=ACCENT, linewidth=2))
    ax.text(p[0] + 0.25, p[1] + 0.35, r"$\nabla f(a,b)$", color=ACCENT, fontsize=10)
    ax.set_xlabel("$x$")
    ax.set_ylabel("$y$")
    ax.set_aspect("equal")
    ax.set_title("$\\nabla f$ is perpendicular to the level curve")

    ax = axes[1]
    thetas = np.linspace(0, 2 * np.pi, 400)
    Duf = g[0] * np.cos(thetas) + g[1] * np.sin(thetas)
    ax.plot(thetas, Duf, color=INK, linewidth=1.6, label=r"$D_{\mathbf{u}}f(a,b)=\nabla f\cdot\mathbf{u}(\theta)$")
    ax.axhline(gnorm, color=ACCENT, linestyle="--", linewidth=1.0, label=r"$\|\nabla f(a,b)\|$")
    ax.axvline(theta0, color=ACCENT2, linestyle=":", linewidth=1.2, label=r"$\theta=\theta_0$ (gradient direction)")
    ax.plot(theta0, gnorm, "o", color=ACCENT, markersize=6, zorder=5)
    ax.set_xlabel(r"direction angle $\theta$")
    ax.set_ylabel(r"$D_{\mathbf{u}}f(a,b)$")
    ax.set_xlim(0, 2 * np.pi)
    ax.set_title("Peaks exactly at the gradient's own direction")
    ax.legend(frameon=False, fontsize=8, loc="lower center")

    fig.suptitle("The gradient: perpendicular to level curves, pointing toward steepest increase", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "gradient_steepest_ascent.png")


# ---------------------------------------------------------------------------
# Figure 2 -- contour geometry of the three second-derivative-test outcomes:
# local min, local max, and saddle, classified by D = f_xx f_yy - f_xy^2.
# ---------------------------------------------------------------------------
def fig_second_derivative_test():
    specs = [
        ("$f=x^2+xy+y^2$", lambda x, y: x**2 + x * y + y**2, 2, 2, 1, ACCENT2, "min ($D=3>0,\\ f_{xx}>0$)"),
        ("$f=-(x^2+xy+y^2)$", lambda x, y: -(x**2 + x * y + y**2), -2, -2, -1, ACCENT3, "max ($D=3>0,\\ f_{xx}<0$)"),
        ("$f=x^2-y^2$", lambda x, y: x**2 - y**2, 2, -2, 0, ACCENT, "saddle ($D=-4<0$)"),
    ]

    fig, axes = plt.subplots(1, 3, figsize=(13.5, 4.6))
    x = np.linspace(-2, 2, 300)
    y = np.linspace(-2, 2, 300)
    X, Y = np.meshgrid(x, y)

    for ax, (label, f, fxx, fyy, fxy, color, tag) in zip(axes, specs):
        Z = f(X, Y)
        D = fxx * fyy - fxy**2
        cs = ax.contour(X, Y, Z, levels=16, colors=color, linewidths=0.9)
        ax.plot(0, 0, "o", color=INK, markersize=6, zorder=5)
        ax.set_xlabel("$x$")
        ax.set_ylabel("$y$")
        ax.set_aspect("equal")
        ax.set_title(f"{label}\n{tag}", fontsize=10.5)

    fig.suptitle("Level curves at a critical point: elliptical bowl, elliptical dome, or hyperbolic saddle", y=1.03)
    fig.tight_layout()
    savefig(fig, "second_derivative_test.png")


if __name__ == "__main__":
    fig_gradient_steepest_ascent()
    fig_second_derivative_test()
