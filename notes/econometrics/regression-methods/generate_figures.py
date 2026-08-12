"""
Figure generator for notes/econometrics/regression-methods.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

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
# Figure 1 -- OLS as orthogonal projection: y, its projection onto col(X),
# and the residual, in R^3 (n=3, k=2 so col(X) is a plane).
# ---------------------------------------------------------------------------
def fig_ols_projection():
    X = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]])
    y = np.array([3.0, 2.0, 8.0])
    beta_hat = np.linalg.inv(X.T @ X) @ X.T @ y
    y_hat = X @ beta_hat
    resid = y - y_hat

    fig = plt.figure(figsize=(8, 7.5))
    ax = fig.add_subplot(111, projection="3d")

    # Fit the plane's rendered extent to the data's own scale, not an
    # arbitrary beta-space window (otherwise the plane dwarfs the vectors).
    span = max(np.linalg.norm(y), np.linalg.norm(y_hat)) * 1.6
    b1 = np.linspace(beta_hat[0] - span / 4, beta_hat[0] + span / 4, 6)
    b2 = np.linspace(beta_hat[1] - span / 4, beta_hat[1] + span / 4, 6)
    B1, B2 = np.meshgrid(b1, b2)
    PX = B1 * X[0, 0] + B2 * X[0, 1]
    PY = B1 * X[1, 0] + B2 * X[1, 1]
    PZ = B1 * X[2, 0] + B2 * X[2, 1]
    ax.plot_surface(PX, PY, PZ, alpha=0.15, color=ACCENT2, edgecolor="none")

    origin = np.zeros(3)
    ax.plot(*zip(origin, y), color=INK, linewidth=2.6, label="$y$")
    ax.scatter(*y, color=INK, s=55, depthshade=False)

    ax.plot(*zip(origin, y_hat), color=ACCENT2, linewidth=2.6,
            label=r"$\hat y = X\hat\beta = P_{\mathrm{col}(X)}\,y$")
    ax.scatter(*y_hat, color=ACCENT2, s=55, depthshade=False)

    ax.plot(*zip(y_hat, y), color=ACCENT, linewidth=2.8, label=r"$y-\hat y$ (residual, $\perp\,\mathrm{col}(X)$)")

    lim = span * 0.7
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_zlim(-lim, lim)
    ax.set_xlabel("$y_1$")
    ax.set_ylabel("$y_2$")
    ax.set_zlabel("$y_3$")
    ax.set_title(r"OLS fitted values are the orthogonal projection of $y$ onto $\mathrm{col}(X)$")
    ax.legend(frameon=False, fontsize=10, loc="upper left")
    ax.view_init(elev=22, azim=25)

    resid_norm2 = resid @ resid
    yhat_norm2 = y_hat @ y_hat
    y_norm2 = y @ y
    ax.text2D(0.02, 0.02,
              rf"$X^\top(y-\hat y) \approx (0,0)$ (normal equations)   "
              rf"$\|y\|^2={y_norm2:.1f} = \|\hat y\|^2+\|y-\hat y\|^2={yhat_norm2:.1f}+{resid_norm2:.1f}$",
              transform=ax.transAxes, fontsize=9)

    savefig(fig, "ols_projection.png")


# ---------------------------------------------------------------------------
# Figure 2 -- ridge regularization: coefficient shrinkage path and the
# eigenvalue-shift mechanism that restores invertibility.
# ---------------------------------------------------------------------------
def fig_ridge_path():
    rng = np.random.default_rng(1)
    n, p = 100, 5
    X = rng.normal(size=(n, p))
    X[:, 4] = X[:, 0] + 0.01 * rng.normal(size=n)  # near-collinear with column 0
    beta_true = np.array([1.0, -0.5, 0.3, 0.0, 1.0])
    y = X @ beta_true + rng.normal(0, 0.5, n)

    XtX = X.T @ X
    eigvals = np.linalg.eigvalsh(XtX)

    lambdas = np.logspace(-2, 3, 60)
    paths = np.array([np.linalg.solve(XtX + lam * np.eye(p), X.T @ y) for lam in lambdas])
    min_eig_shifted = eigvals.min() + lambdas

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    for j in range(p):
        ax.semilogx(lambdas, paths[:, j], linewidth=1.6, label=rf"$\hat\beta_{j+1}$")
    ax.axhline(0, color=FADE, linewidth=0.8)
    ax.set_xlabel(r"$\lambda$ (log scale)")
    ax.set_ylabel(r"$\hat\beta_{\mathrm{ridge}}(\lambda)$")
    ax.set_title("Ridge coefficient paths: shrinkage toward 0")
    ax.legend(frameon=False, fontsize=8, ncol=2)

    ax = axes[1]
    ax.loglog(lambdas, min_eig_shifted, color=ACCENT, linewidth=1.8,
               label=r"$\lambda_{\min}(X^\top X) + \lambda$")
    ax.axhline(eigvals.min(), color=FADE, linestyle="--", linewidth=1,
               label=rf"$\lambda_{{\min}}(X^\top X)={eigvals.min():.4f}$ (near-singular)")
    ax.set_xlabel(r"$\lambda$ (log scale)")
    ax.set_ylabel(r"smallest eigenvalue of $X^\top X + \lambda I$ (log scale)")
    ax.set_title("Ridge restores invertibility by lifting eigenvalues")
    ax.legend(frameon=False, fontsize=8)

    fig.suptitle(r"Column 5 of $X$ is nearly column 1 (condition number $\approx 3\times10^4$): ridge regularizes this", y=1.03)
    fig.tight_layout()
    savefig(fig, "ridge_path.png")


if __name__ == "__main__":
    fig_ols_projection()
    fig_ridge_path()
