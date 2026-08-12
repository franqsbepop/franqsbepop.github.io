"""
Figure generator for notes/econometrics/time-series-analysis.html.

Regenerates every PNG in figures/ from scratch. Each function is a
self-contained simulation + plot: run this file whenever the
accompanying note is revised and the figures need to stay in sync.

Usage:
    python3 generate_figures.py
"""

import os

import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import acf, pacf
from statsmodels.tsa.arima_process import ArmaProcess
import statsmodels.api as sm

HERE = os.path.dirname(os.path.abspath(__file__))
FIG_DIR = os.path.join(HERE, "figures")
os.makedirs(FIG_DIR, exist_ok=True)

# ---------------------------------------------------------------------------
# Shared styling: restrained, grayscale-first palette matching the site's
# serif / muted aesthetic (--box-accent: #3a3a3a, page bg: #f7f3e9).
# ---------------------------------------------------------------------------
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

INK = "#2c2c2c"       # primary series
ACCENT = "#8c2f2f"     # muted brick red, sparing use
ACCENT2 = "#2f5f8c"    # muted blue, sparing use
FADE = "#9a9a9a"


def savefig(fig, name):
    path = os.path.join(FIG_DIR, name)
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


# ---------------------------------------------------------------------------
# Figure 1 — Stationarity regimes: |phi| < 1, phi = 1, |phi| > 1
# ---------------------------------------------------------------------------
def fig_stationarity_regimes():
    rng = np.random.default_rng(0)
    T = 150
    n_paths = 6
    phis = [0.8, 1.0, 1.05]
    titles = [r"$\phi = 0.8$ (stationary)", r"$\phi = 1$ (unit root / random walk)",
              r"$\phi = 1.05$ (explosive)"]

    fig, axes = plt.subplots(1, 3, figsize=(11, 3.3))
    for ax, phi, title in zip(axes, phis, titles):
        for _ in range(n_paths):
            eps = rng.normal(0, 1, T)
            x = np.zeros(T)
            for t in range(1, T):
                x[t] = phi * x[t - 1] + eps[t]
            ax.plot(x, linewidth=0.9, alpha=0.8)
        ax.axhline(0, color=FADE, linewidth=0.8, zorder=0)
        ax.set_title(title)
        ax.set_xlabel("$t$")
    axes[0].set_ylabel("$X_t$")
    fig.suptitle(r"Six realizations of $X_t = \phi X_{t-1} + \varepsilon_t,\ \varepsilon_t \sim \mathrm{iid}\ N(0,1)$",
                 y=1.04, fontsize=11, fontweight="normal", style="italic")
    savefig(fig, "stationarity_regimes.png")


# ---------------------------------------------------------------------------
# Figure 2 — Theoretical vs empirical ACF of an AR(1)
# ---------------------------------------------------------------------------
def fig_acf_theory_vs_empirical():
    rng = np.random.default_rng(1)
    phi = 0.7
    T = 2000
    eps = rng.normal(0, 1, T)
    x = np.zeros(T)
    for t in range(1, T):
        x[t] = phi * x[t - 1] + eps[t]

    max_lag = 20
    emp = acf(x, nlags=max_lag, fft=True)
    lags = np.arange(max_lag + 1)
    theo = phi ** lags
    ci = 1.96 / np.sqrt(T)

    fig, ax = plt.subplots(figsize=(7, 4))
    ax.bar(lags - 0.15, emp, width=0.3, color=INK, label="empirical $\\hat\\rho(h)$")
    ax.bar(lags + 0.15, theo, width=0.3, color=ACCENT, alpha=0.75, label=r"theoretical $\rho(h)=\phi^h$")
    ax.axhline(ci, color=FADE, linestyle="--", linewidth=0.8)
    ax.axhline(-ci, color=FADE, linestyle="--", linewidth=0.8, label=r"$\pm 1.96/\sqrt{T}$")
    ax.axhline(0, color="#4a4a4a", linewidth=0.8)
    ax.set_xlabel("lag $h$")
    ax.set_ylabel(r"$\rho(h)$")
    ax.set_title(f"AR(1) with $\\phi={phi}$, $T={T}$: empirical vs. theoretical ACF")
    ax.legend(frameon=False, fontsize=9)
    savefig(fig, "acf_theory_vs_empirical.png")


# ---------------------------------------------------------------------------
# Figure 3 — ACF / PACF signatures for AR(1), AR(2), MA(1), ARMA(1,1)
# ---------------------------------------------------------------------------
def fig_acf_pacf_signatures():
    rng = np.random.default_rng(2)
    T = 3000
    max_lag = 15

    processes = {
        r"AR(1): $\phi=0.7$": (np.array([1, -0.7]), np.array([1])),
        r"AR(2): $\phi_1=0.6,\ \phi_2=-0.3$": (np.array([1, -0.6, 0.3]), np.array([1])),
        r"MA(1): $\theta=0.6$": (np.array([1]), np.array([1, 0.6])),
        r"ARMA(1,1): $\phi=0.6,\ \theta=-0.4$": (np.array([1, -0.6]), np.array([1, -0.4])),
    }

    fig, axes = plt.subplots(2, 4, figsize=(13, 5.5), sharex=True)
    ci = 1.96 / np.sqrt(T)

    for j, (label, (ar, ma)) in enumerate(processes.items()):
        proc = ArmaProcess(ar, ma)
        x = proc.generate_sample(nsample=T, distrvs=lambda size: rng.normal(0, 1, size))

        emp_acf = acf(x, nlags=max_lag, fft=True)
        emp_pacf = pacf(x, nlags=max_lag)
        lags = np.arange(max_lag + 1)

        ax_acf = axes[0, j]
        ax_acf.vlines(lags, 0, emp_acf, color=INK, linewidth=1.2)
        ax_acf.axhline(ci, color=FADE, linestyle="--", linewidth=0.7)
        ax_acf.axhline(-ci, color=FADE, linestyle="--", linewidth=0.7)
        ax_acf.axhline(0, color="#4a4a4a", linewidth=0.7)
        ax_acf.set_title(label, fontsize=9.5)
        if j == 0:
            ax_acf.set_ylabel("ACF")

        ax_pacf = axes[1, j]
        ax_pacf.vlines(lags, 0, emp_pacf, color=ACCENT2, linewidth=1.2)
        ax_pacf.axhline(ci, color=FADE, linestyle="--", linewidth=0.7)
        ax_pacf.axhline(-ci, color=FADE, linestyle="--", linewidth=0.7)
        ax_pacf.axhline(0, color="#4a4a4a", linewidth=0.7)
        ax_pacf.set_xlabel("lag $h$")
        if j == 0:
            ax_pacf.set_ylabel("PACF")

    fig.suptitle("Empirical ACF / PACF signatures ($T=3000$ per process)", y=1.02)
    fig.tight_layout()
    savefig(fig, "acf_pacf_signatures.png")


# ---------------------------------------------------------------------------
# Figure 4 — Spurious regression between independent random walks
# ---------------------------------------------------------------------------
def fig_spurious_regression():
    rng = np.random.default_rng(3)
    T = 300
    x = np.cumsum(rng.normal(0, 1, T))
    y = np.cumsum(rng.normal(0, 1, T))

    X = sm.add_constant(x)
    model_levels = sm.OLS(y, X).fit()
    r2_levels = model_levels.rsquared
    t_levels = model_levels.tvalues[1]

    dx = np.diff(x)
    dy = np.diff(y)
    Xd = sm.add_constant(dx)
    model_diff = sm.OLS(dy, Xd).fit()
    r2_diff = model_diff.rsquared
    t_diff = model_diff.tvalues[1]

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.2))

    ax = axes[0]
    ax.scatter(x, y, s=10, color=INK, alpha=0.6)
    xs = np.linspace(x.min(), x.max(), 10)
    ax.plot(xs, model_levels.params[0] + model_levels.params[1] * xs, color=ACCENT, linewidth=1.6)
    ax.set_xlabel("$X_t$ (independent random walk)")
    ax.set_ylabel("$Y_t$ (independent random walk)")
    ax.set_title(f"Levels: $R^2={r2_levels:.2f}$, $t={t_levels:.1f}$")

    ax = axes[1]
    ax.scatter(dx, dy, s=10, color=INK, alpha=0.6)
    xs = np.linspace(dx.min(), dx.max(), 10)
    ax.plot(xs, model_diff.params[0] + model_diff.params[1] * xs, color=ACCENT2, linewidth=1.6)
    ax.set_xlabel(r"$\Delta X_t$")
    ax.set_ylabel(r"$\Delta Y_t$")
    ax.set_title(f"First differences: $R^2={r2_diff:.2f}$, $t={t_diff:.1f}$")

    fig.suptitle(r"Spurious regression: $X_t, Y_t$ are independent random walks by construction", y=1.03)
    fig.tight_layout()
    savefig(fig, "spurious_regression.png")
    return r2_levels, t_levels, r2_diff, t_diff


# ---------------------------------------------------------------------------
# Figure 5 — Forecasting an AR(1): point forecast, prediction interval,
# and simulated future sample paths
# ---------------------------------------------------------------------------
def fig_forecast_paths():
    rng = np.random.default_rng(4)
    phi, sigma2 = 0.8, 1.0
    T_hist = 60
    H = 25  # forecast horizon

    eps = rng.normal(0, np.sqrt(sigma2), T_hist)
    x = np.zeros(T_hist)
    for t in range(1, T_hist):
        x[t] = phi * x[t - 1] + eps[t]
    x_T = x[-1]

    h = np.arange(0, H + 1)
    point_forecast = phi ** h * x_T
    forecast_var = sigma2 * (1 - phi ** (2 * h)) / (1 - phi ** 2)
    forecast_var[0] = 0.0
    se = np.sqrt(forecast_var)

    n_sim = 30
    sim_paths = np.zeros((n_sim, H + 1))
    for s in range(n_sim):
        path = np.zeros(H + 1)
        path[0] = x_T
        innov = rng.normal(0, np.sqrt(sigma2), H)
        for t in range(1, H + 1):
            path[t] = phi * path[t - 1] + innov[t - 1]
        sim_paths[s] = path

    fig, ax = plt.subplots(figsize=(9, 4.5))
    t_hist_axis = np.arange(-T_hist + 1, 1)
    ax.plot(t_hist_axis, x, color=INK, linewidth=1.0, label="observed $X_t$")

    for s in range(n_sim):
        ax.plot(h, sim_paths[s], color=ACCENT2, alpha=0.15, linewidth=0.8)

    ax.plot(h, point_forecast, color=ACCENT, linewidth=1.8, label=r"point forecast $\mathbb{E}[X_{T+h}\mid X_T]$")
    ax.fill_between(h, point_forecast - 1.96 * se, point_forecast + 1.96 * se,
                     color=ACCENT, alpha=0.15, label="95% prediction interval")
    ax.axvline(0, color=FADE, linewidth=0.8, linestyle="--")
    ax.axhline(0, color=FADE, linewidth=0.6)
    ax.set_xlabel("time relative to forecast origin $T$")
    ax.set_ylabel("$X_t$")
    ax.set_title(rf"AR(1) forecast, $\phi={phi}$: point forecast decays to 0, interval widens to $\sigma^2/(1-\phi^2)$")
    ax.legend(frameon=False, fontsize=9, loc="upper left")
    savefig(fig, "forecast_paths.png")


if __name__ == "__main__":
    fig_stationarity_regimes()
    fig_acf_theory_vs_empirical()
    fig_acf_pacf_signatures()
    r2_levels, t_levels, r2_diff, t_diff = fig_spurious_regression()
    fig_forecast_paths()

    print("\nSpurious regression summary (for the note's prose):")
    print(f"  levels:      R^2 = {r2_levels:.3f}, t = {t_levels:.2f}")
    print(f"  differenced: R^2 = {r2_diff:.3f}, t = {t_diff:.2f}")
