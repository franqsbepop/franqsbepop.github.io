"""
Figure generator for notes/econometrics/causal-inference.html.

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
# Figure 1 -- RDD as a jump discontinuity in E[Y|X]
# ---------------------------------------------------------------------------
def fig_rdd():
    rng = np.random.default_rng(0)
    n = 2000
    X = rng.uniform(-1, 1, n)
    D = (X >= 0).astype(float)
    tau = 2.0
    Y = 1 + 0.5 * X + 0.3 * X**2 + tau * D + rng.normal(0, 0.3, n)

    h = 0.2
    left = (X >= -h) & (X < 0)
    right = (X >= 0) & (X <= h)

    def fit_line(x, y):
        Xd = np.column_stack([np.ones_like(x), x])
        return np.linalg.lstsq(Xd, y, rcond=None)[0]

    beta_left = fit_line(X[left], Y[left])
    beta_right = fit_line(X[right], Y[right])
    jump = (beta_right[0]) - (beta_left[0])

    fig, ax = plt.subplots(figsize=(8, 5.2))
    ax.scatter(X, Y, s=6, color=FADE, alpha=0.35, zorder=1)

    xl = np.linspace(-h, 0, 20)
    xr = np.linspace(0, h, 20)
    ax.plot(xl, beta_left[0] + beta_left[1] * xl, color=ACCENT2, linewidth=2.4, zorder=3)
    ax.plot(xr, beta_right[0] + beta_right[1] * xr, color=ACCENT, linewidth=2.4, zorder=3)
    ax.plot(0, beta_left[0], "o", color=ACCENT2, markersize=8, zorder=4)
    ax.plot(0, beta_right[0], "o", color=ACCENT, markersize=8, zorder=4)
    ax.axvline(0, color=INK, linestyle="--", linewidth=1, zorder=2)
    ax.axvspan(-h, h, color=FADE, alpha=0.08)

    ax.annotate("", xy=(0.06, beta_right[0]), xytext=(0.06, beta_left[0]),
                arrowprops=dict(arrowstyle="<->", color=INK))
    ax.text(0.09, (beta_left[0] + beta_right[0]) / 2,
            rf"$\hat\tau_{{\mathrm{{RDD}}}}={jump:.2f}$" + "\n" + rf"(true $\tau={tau:.1f}$)",
            fontsize=10)

    ax.set_xlabel(r"running variable $X$ (centered at cutoff)")
    ax.set_ylabel("$Y$")
    ax.set_title(r"RDD estimates a jump discontinuity: $\lim_{x\to0^+}E[Y|X=x] - \lim_{x\to0^-}E[Y|X=x]$")
    savefig(fig, "rdd_discontinuity.png")


# ---------------------------------------------------------------------------
# Figure 2 -- DiD and the parallel-trends assumption
# ---------------------------------------------------------------------------
def fig_did():
    pre_treated, post_treated = 3.0, 5.5
    pre_control, post_control = 2.0, 3.0
    counterfactual_post_treated = pre_treated + (post_control - pre_control)  # parallel trend

    fig, ax = plt.subplots(figsize=(7.5, 5.2))
    t = [0, 1]
    ax.plot(t, [pre_treated, post_treated], "o-", color=ACCENT, linewidth=2.2, markersize=7, label="treated group (observed)")
    ax.plot(t, [pre_control, post_control], "o-", color=ACCENT2, linewidth=2.2, markersize=7, label="control group (observed)")
    ax.plot(t, [pre_treated, counterfactual_post_treated], "o--", color=ACCENT, linewidth=1.6, markersize=5, alpha=0.6,
            label="treated counterfactual (parallel trends)")

    ax.annotate("", xy=(1.02, post_treated), xytext=(1.02, counterfactual_post_treated),
                arrowprops=dict(arrowstyle="<->", color=INK))
    ax.text(1.05, (post_treated + counterfactual_post_treated) / 2,
            rf"$\widehat{{\mathrm{{ATT}}}}={post_treated - counterfactual_post_treated:.1f}$", fontsize=10)

    ax.set_xticks([0, 1])
    ax.set_xticklabels(["pre", "post"])
    ax.set_xlim(-0.15, 1.35)
    ax.set_ylabel("$Y$")
    ax.set_title("DiD: the treatment effect is the deviation from the counterfactual trend")
    ax.legend(frameon=False, fontsize=9, loc="upper left")
    savefig(fig, "did_parallel_trends.png")


if __name__ == "__main__":
    fig_rdd()
    fig_did()
