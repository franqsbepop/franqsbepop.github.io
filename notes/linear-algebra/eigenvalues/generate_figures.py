"""
Figure generator for notes/linear-algebra/eigenvalues.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/
from scratch after editing the note.
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
# Figure 1 — Eigenvectors as invariant directions: unit circle -> ellipse
# ---------------------------------------------------------------------------
def fig_eigenvector_geometry():
    A = np.array([[2.0, 0.6], [0.6, 1.2]])  # symmetric: real eigenvalues, orthogonal eigenvectors
    eigvals, eigvecs = np.linalg.eigh(A)
    order = np.argsort(eigvals)[::-1]  # descending, so lambda_1 is the largest by convention
    eigvals, eigvecs = eigvals[order], eigvecs[:, order]

    theta = np.linspace(0, 2 * np.pi, 400)
    circle = np.stack([np.cos(theta), np.sin(theta)])
    ellipse = A @ circle

    fig, axes = plt.subplots(1, 2, figsize=(10, 5))

    ax = axes[0]
    ax.plot(circle[0], circle[1], color=INK, linewidth=1.2)
    ax.set_title("Domain: unit circle $\\|v\\|=1$")
    ax.set_aspect("equal")
    ax.axhline(0, color=FADE, linewidth=0.6)
    ax.axvline(0, color=FADE, linewidth=0.6)
    for i in range(2):
        v = eigvecs[:, i]
        color = ACCENT if i == 0 else ACCENT2
        ax.plot([-v[0], v[0]], [-v[1], v[1]], color=color, linewidth=2,
                label=f"eigenvector $u_{i+1}$ ($\\lambda_{i+1}={eigvals[i]:.2f}$)")
    ax.legend(frameon=False, fontsize=8, loc="upper left")

    ax = axes[1]
    ax.plot(ellipse[0], ellipse[1], color=INK, linewidth=1.2)
    ax.set_title("Image: $Av$ for $\\|v\\|=1$ (an ellipse)")
    ax.set_aspect("equal")
    ax.axhline(0, color=FADE, linewidth=0.6)
    ax.axvline(0, color=FADE, linewidth=0.6)
    # show a handful of sample vectors mapped, to make "most directions rotate" visible
    sample_theta = np.linspace(0, 2 * np.pi, 12, endpoint=False)
    for t in sample_theta:
        v = np.array([np.cos(t), np.sin(t)])
        Av = A @ v
        ax.annotate("", xy=Av, xytext=(0, 0),
                    arrowprops=dict(arrowstyle="->", color=FADE, alpha=0.6, linewidth=0.9))
    for i in range(2):
        v = eigvecs[:, i]
        Av = eigvals[i] * v
        color = ACCENT if i == 0 else ACCENT2
        ax.annotate("", xy=Av, xytext=(0, 0),
                    arrowprops=dict(arrowstyle="->", color=color, linewidth=2.2))
        ax.annotate("", xy=-Av, xytext=(0, 0),
                    arrowprops=dict(arrowstyle="->", color=color, linewidth=2.2))

    fig.suptitle("A = [[2.0, 0.6], [0.6, 1.2]]: every $v$ rotates under $A$ except along the eigenvector axes",
                 y=1.03, fontsize=11, fontweight="normal", style="italic")
    fig.tight_layout()
    savefig(fig, "eigenvector_geometry.png")


# ---------------------------------------------------------------------------
# Figure 2 — Power iteration convergence rate governed by |lambda_2/lambda_1|
# ---------------------------------------------------------------------------
def fig_power_iteration():
    rng = np.random.default_rng(0)
    n = 6
    # Build a symmetric matrix with prescribed, well-separated eigenvalues
    eigvals_true = np.array([5.0, 3.0, -2.0, 1.5, -1.0, 0.5])
    Q, _ = np.linalg.qr(rng.normal(size=(n, n)))
    A = Q @ np.diag(eigvals_true) @ Q.T
    true_vec = Q[:, 0]  # eigenvector for eigenvalue 5.0 (largest in magnitude)

    v = rng.normal(size=n)
    v /= np.linalg.norm(v)

    n_iter = 25
    angle_error = []
    for k in range(n_iter):
        v = A @ v
        v /= np.linalg.norm(v)
        cos_angle = np.abs(v @ true_vec)  # abs: eigenvector defined up to sign
        angle_error.append(1 - cos_angle)

    ratio = abs(eigvals_true[1] / eigvals_true[0])
    theoretical = angle_error[0] * ratio ** (2 * np.arange(n_iter))

    fig, ax = plt.subplots(figsize=(7, 4.3))
    ax.semilogy(np.arange(1, n_iter + 1), angle_error, "o-", color=INK, markersize=4,
                label=r"$1-|\cos\angle(v_k, u_1)|$ (power iteration)")
    ax.semilogy(np.arange(1, n_iter + 1), theoretical, "--", color=ACCENT,
                label=rf"reference slope $|\lambda_2/\lambda_1|^{{2k}} = {ratio:.2f}^{{2k}}$")
    ax.set_xlabel("iteration $k$")
    ax.set_ylabel("alignment error (log scale)")
    ax.set_title(r"Power iteration: convergence rate is $|\lambda_2/\lambda_1|$ per step")
    ax.legend(frameon=False, fontsize=9)
    savefig(fig, "power_iteration.png")


# ---------------------------------------------------------------------------
# Figure 3 — PCA as maximizing variance along a direction (Rayleigh quotient)
# ---------------------------------------------------------------------------
def fig_pca_variance_direction():
    rng = np.random.default_rng(1)
    n = 400
    cov_true = np.array([[3.0, 1.6], [1.6, 1.0]])
    X = rng.multivariate_normal([0, 0], cov_true, size=n)
    Sigma = np.cov(X.T)
    eigvals, eigvecs = np.linalg.eigh(Sigma)
    order = np.argsort(eigvals)[::-1]
    eigvals, eigvecs = eigvals[order], eigvecs[:, order]

    thetas = np.linspace(0, np.pi, 200)
    variances = np.array([
        (np.array([np.cos(t), np.sin(t)]) @ Sigma @ np.array([np.cos(t), np.sin(t)]))
        for t in thetas
    ])

    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.6))

    ax = axes[0]
    ax.scatter(X[:, 0], X[:, 1], s=8, color=INK, alpha=0.35)
    for i in range(2):
        v = eigvecs[:, i] * np.sqrt(eigvals[i]) * 2
        color = ACCENT if i == 0 else ACCENT2
        ax.annotate("", xy=v, xytext=(0, 0), arrowprops=dict(arrowstyle="->", color=color, linewidth=2.4))
        ax.annotate("", xy=-v, xytext=(0, 0), arrowprops=dict(arrowstyle="->", color=color, linewidth=2.4))
    ax.set_aspect("equal")
    ax.set_title("Data and principal axes ($2\\sqrt{\\lambda_i}\\, u_i$)")

    ax = axes[1]
    ax.plot(thetas, variances, color=INK, linewidth=1.6)
    ax.axhline(eigvals[0], color=ACCENT, linestyle="--", linewidth=1, label=f"$\\lambda_1={eigvals[0]:.2f}$ (max)")
    ax.axhline(eigvals[1], color=ACCENT2, linestyle="--", linewidth=1, label=f"$\\lambda_2={eigvals[1]:.2f}$ (min)")
    ax.set_xlabel(r"direction angle $\theta$")
    ax.set_ylabel(r"$v(\theta)^\top \hat\Sigma\, v(\theta)$")
    ax.set_title(r"Variance along $v(\theta)=(\cos\theta,\sin\theta)$")
    ax.legend(frameon=False, fontsize=8.5)

    fig.suptitle("The Rayleigh quotient $v^\\top\\Sigma v$ is maximized exactly at the top eigenvector", y=1.03)
    fig.tight_layout()
    savefig(fig, "pca_variance_direction.png")


if __name__ == "__main__":
    fig_eigenvector_geometry()
    fig_power_iteration()
    fig_pca_variance_direction()
