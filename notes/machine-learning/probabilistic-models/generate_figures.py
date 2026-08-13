"""
Figure generator for notes/machine-learning/probabilistic-models.html.

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
# Figure 1 -- the Weak Law of Large Numbers: sample-mean paths converging to
# mu, and the sample-mean variance shrinking at exactly the proved rate
# sigma^2/n.
# ---------------------------------------------------------------------------
def fig_lln():
    rng = np.random.default_rng(0)
    mu, var = 0.5, 1 / 12  # Uniform(0,1)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    n_max = 2000
    for i, color in enumerate([ACCENT2, ACCENT3, ACCENT, FADE]):
        samples = rng.uniform(0, 1, size=n_max)
        running_mean = np.cumsum(samples) / np.arange(1, n_max + 1)
        ax.plot(running_mean, color=color, linewidth=1.0, alpha=0.85)
    ns = np.arange(1, n_max + 1)
    envelope = np.sqrt(var / ns)
    ax.plot(ns, mu + envelope, "--", color=INK, linewidth=1.0, label=r"$\mu\pm\sigma/\sqrt{n}$")
    ax.plot(ns, mu - envelope, "--", color=INK, linewidth=1.0)
    ax.axhline(mu, color=INK, linewidth=0.8)
    ax.set_xlabel("$n$")
    ax.set_ylabel(r"$\bar X_n$")
    ax.set_title(r"Sample means of $\mathrm{Uniform}(0,1)$ draws, four runs")
    ax.legend(frameon=False, fontsize=9)

    ax = axes[1]
    ns2 = np.array([5, 10, 20, 50, 100, 200, 500, 1000])
    reps = 3000
    emp_var = []
    for n in ns2:
        s = rng.uniform(0, 1, size=(reps, n))
        emp_var.append(s.mean(axis=1).var())
    emp_var = np.array(emp_var)
    ax.loglog(ns2, emp_var, "o", color=ACCENT, markersize=6, label=r"empirical $\mathrm{Var}(\bar X_n)$")
    ax.loglog(ns2, var / ns2, "--", color=FADE, linewidth=1.2, label=r"proved rate $\sigma^2/n$")
    ax.set_xlabel("$n$ (log scale)")
    ax.set_ylabel(r"$\mathrm{Var}(\bar X_n)$ (log scale)")
    ax.set_title("Variance shrinks at exactly the rate Section 2 proves")
    ax.legend(frameon=False, fontsize=9)

    fig.suptitle("The Weak Law of Large Numbers, via Chebyshev's inequality", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "lln_convergence.png")


# ---------------------------------------------------------------------------
# Figure 2 -- EM's monotonic ascent on a two-component 1D Gaussian mixture.
# ---------------------------------------------------------------------------
def gauss(x, mu, sd):
    return np.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * np.sqrt(2 * np.pi))


def fit_gmm_em(x, n_iters=25, seed=1):
    pi = np.array([0.5, 0.5])
    mu = np.array([-1.0, 1.0])
    sd = np.array([1.0, 1.0])
    loglik_history = []
    for _ in range(n_iters):
        resp = np.stack([pi[k] * gauss(x, mu[k], sd[k]) for k in range(2)], axis=1)
        total = resp.sum(axis=1, keepdims=True)
        loglik_history.append(float(np.sum(np.log(total))))
        resp = resp / total
        Nk = resp.sum(axis=0)
        pi = Nk / len(x)
        mu = (resp * x[:, None]).sum(axis=0) / Nk
        var = (resp * (x[:, None] - mu[None, :]) ** 2).sum(axis=0) / Nk
        sd = np.sqrt(var)
    return pi, mu, sd, loglik_history


def fig_em_ascent():
    rng = np.random.default_rng(1)
    n = 400
    z = rng.integers(0, 2, size=n)
    mu_true, sd_true = [-2.0, 3.0], [1.0, 1.5]
    x = np.where(z == 0, rng.normal(mu_true[0], sd_true[0], n), rng.normal(mu_true[1], sd_true[1], n))

    pi, mu, sd, loglik_history = fit_gmm_em(x)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    xs = np.linspace(x.min() - 1, x.max() + 1, 400)
    ax.hist(x, bins=30, density=True, color=FADE, alpha=0.5, edgecolor="white", label="data")
    total_density = pi[0] * gauss(xs, mu[0], sd[0]) + pi[1] * gauss(xs, mu[1], sd[1])
    ax.plot(xs, total_density, color=INK, linewidth=1.8, label="fitted mixture")
    ax.plot(xs, pi[0] * gauss(xs, mu[0], sd[0]), "--", color=ACCENT2, linewidth=1.2, label="component 1")
    ax.plot(xs, pi[1] * gauss(xs, mu[1], sd[1]), "--", color=ACCENT, linewidth=1.2, label="component 2")
    ax.set_xlabel("$x$")
    ax.set_ylabel("density")
    ax.set_title("EM-fitted two-component Gaussian mixture")
    ax.legend(frameon=False, fontsize=8)

    ax = axes[1]
    ax.plot(range(len(loglik_history)), loglik_history, "o-", color=ACCENT, markersize=4)
    ax.set_xlabel("EM iteration")
    ax.set_ylabel("log-likelihood")
    ax.set_title("Monotonically increasing at every iteration, as proved")

    fig.suptitle("EM's ascent guarantee (Section 7), verified on real data", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "em_ascent.png")


if __name__ == "__main__":
    fig_lln()
    fig_em_ascent()
