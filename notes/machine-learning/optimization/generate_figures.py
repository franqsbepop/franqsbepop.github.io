"""
Figure generator for notes/machine-learning/optimization.html.

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
# Figure 1 -- linear (geometric) convergence of gradient descent for
# strongly convex, smooth quadratics, at rate governed by the condition
# number kappa = L/mu, with the proved bound (1-mu/L)^t f(x0) checked
# against the actual trajectory.
# ---------------------------------------------------------------------------
def gd_on_quadratic(mu, L, x0, n_iters):
    A = np.diag([mu, L])
    alpha = 1.0 / L
    x = np.array(x0, dtype=float)
    vals = []
    for _ in range(n_iters):
        vals.append(0.5 * x @ A @ x)
        x = x - alpha * (A @ x)
    return np.array(vals)


def fig_linear_convergence():
    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    colors = {2: ACCENT2, 10: ACCENT3, 50: ACCENT}
    for kappa, color in colors.items():
        mu, L = 1.0, float(kappa)
        vals = gd_on_quadratic(mu, L, [1.0, 1.0], 25)
        ax.semilogy(vals, "o-", color=color, markersize=3.5, linewidth=1.2,
                    label=f"$\\kappa=L/\\mu={kappa}$")
    ax.set_xlabel("iteration $t$")
    ax.set_ylabel("$f(x_t)-f^\\star$ (log scale)")
    ax.set_title("Straight lines on a log scale: geometric decay")
    ax.legend(frameon=False, fontsize=9)

    ax = axes[1]
    mu, L = 1.0, 10.0
    vals = gd_on_quadratic(mu, L, [1.0, 1.0], 25)
    t = np.arange(len(vals))
    bound = (1 - mu / L) ** t * vals[0]
    ax.semilogy(t, vals, "o", color=ACCENT2, markersize=4, label="actual $f(x_t)-f^\\star$")
    ax.semilogy(t, bound, "--", color=FADE, linewidth=1.4, label="proved bound $(1-\\mu/L)^t(f(x_0)-f^\\star)$")
    ax.set_xlabel("iteration $t$")
    ax.set_ylabel("(log scale)")
    ax.set_title(f"$\\kappa={int(L/mu)}$: the actual trajectory stays under the bound")
    ax.legend(frameon=False, fontsize=9)

    fig.suptitle("Strongly convex GD converges geometrically, at the rate the theorem predicts", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "linear_convergence.png")


# ---------------------------------------------------------------------------
# Figure 2 -- Newton's method vs. gradient descent on f(x) = e^x - x
# (minimizer x*=0): quadratic vs. linear convergence, side by side.
# ---------------------------------------------------------------------------
def fig_newton_vs_gd():
    f = lambda x: np.exp(x) - x
    fp = lambda x: np.exp(x) - 1
    fpp = lambda x: np.exp(x)
    xstar = 0.0

    x0 = 1.2
    x = x0
    newton_err = []
    for _ in range(7):
        newton_err.append(abs(x - xstar))
        x = x - fp(x) / fpp(x)
    newton_err = np.array(newton_err)

    x = x0
    alpha = 0.3
    gd_err = []
    for _ in range(100):
        gd_err.append(abs(x - xstar))
        x = x - alpha * fp(x)
    gd_err = np.array(gd_err)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    ax.semilogy(range(len(newton_err)), newton_err, "o-", color=ACCENT, markersize=5, label="Newton's method")
    ax.semilogy(range(0, 100, 2), gd_err[::2], "o-", color=ACCENT2, markersize=3, label="gradient descent ($\\alpha=0.3$)")
    ax.set_xlabel("iteration")
    ax.set_ylabel("$|x_t-x^\\star|$ (log scale)")
    ax.set_xlim(0, 40)
    ax.set_title("Newton reaches machine precision in $\\sim$6 steps")
    ax.legend(frameon=False, fontsize=9)

    ax = axes[1]
    mask = newton_err[:-1] > 1e-14
    e_t = newton_err[:-1][mask]
    e_t1 = newton_err[1:][mask]
    ax.loglog(e_t, e_t1, "o", color=ACCENT, markersize=6, label="Newton: $e_{t+1}$ vs $e_t$")
    ref_x = np.array([e_t.min(), e_t.max()])
    ax.loglog(ref_x, 0.5 * ref_x**2, "--", color=FADE, linewidth=1.2, label="slope-2 reference: $0.5\\,e_t^2$")
    ax.set_xlabel("$e_t=|x_t-x^\\star|$ (log scale)")
    ax.set_ylabel("$e_{t+1}$ (log scale)")
    ax.set_title("Quadratic convergence: doubling correct digits per step")
    ax.legend(frameon=False, fontsize=9)

    fig.suptitle("Newton's method (local quadratic) vs. gradient descent (linear), on $f(x)=e^x-x$", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "newton_vs_gd.png")


if __name__ == "__main__":
    fig_linear_convergence()
    fig_newton_vs_gd()
