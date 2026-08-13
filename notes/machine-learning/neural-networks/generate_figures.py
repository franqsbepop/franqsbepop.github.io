"""
Figure generator for notes/machine-learning/neural-networks.html.

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


def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))


# ---------------------------------------------------------------------------
# Figure 1 -- the Universal Approximation Theorem's construction in action:
# sigmoid "ramps" summed to approximate a target function, improving as the
# number of hidden neurons grows, with sup-norm error tracking O(1/n).
# ---------------------------------------------------------------------------
def build_network(f, n, k):
    ts = np.linspace(0, 1, n + 1)
    fs = f(ts)
    coeffs = np.diff(fs)

    def g(x):
        out = np.full_like(x, fs[0])
        for i in range(1, n):
            out = out + coeffs[i - 1] * sigmoid(k * (x - ts[i]))
        return out

    return g


def fig_universal_approximation():
    f = lambda x: np.sin(2 * np.pi * x)
    x = np.linspace(0, 1, 2000)
    true = f(x)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.6))

    ax = axes[0]
    ax.plot(x, true, color=INK, linewidth=1.8, label="target $f(x)=\\sin(2\\pi x)$")
    for n, color in [(4, FADE), (16, ACCENT2), (64, ACCENT)]:
        g = build_network(f, n, k=20 * n)
        ax.plot(x, g(x), color=color, linewidth=1.3, label=f"$n={n}$ hidden neurons")
    ax.set_xlabel("$x$")
    ax.set_ylabel("value")
    ax.set_title("More sigmoid ramps track the target more closely")
    ax.legend(frameon=True, facecolor="white", edgecolor="none", framealpha=0.9, fontsize=8, loc="upper right")

    ax = axes[1]
    ns = np.array([8, 16, 32, 64, 128, 256])
    errs = []
    for n in ns:
        g = build_network(f, int(n), k=20 * int(n))
        errs.append(np.max(np.abs(g(x) - true)))
    errs = np.array(errs)
    ax.loglog(ns, errs, "o-", color=ACCENT, markersize=5, label="sup-norm error")
    ax.loglog(ns, errs[0] * ns[0] / ns, "--", color=FADE, linewidth=1.0, label="$O(1/n)$")
    ax.set_xlabel("number of hidden neurons $n$ (log scale)")
    ax.set_ylabel("$\\sup_x|f(x)-g(x)|$ (log scale)")
    ax.set_title("Approximation error shrinks as the construction predicts")
    ax.legend(frameon=False, fontsize=9)

    fig.suptitle("The Universal Approximation Theorem's proof, made concrete", y=1.03)
    fig.tight_layout(w_pad=3.0)
    savefig(fig, "universal_approximation.png")


# ---------------------------------------------------------------------------
# Figure 2 -- vanishing gradients: the norm of the backpropagated error
# signal collapses across depth for sigmoid activations, but stays stable
# for ReLU with He-scaled initialization.
# ---------------------------------------------------------------------------
def sigmoid_deriv(z):
    s = sigmoid(z)
    return s * (1 - s)


def relu(z):
    return np.maximum(0, z)


def relu_deriv(z):
    return (z > 0).astype(float)


def backprop_norms(depth, width, activation, deriv, weight_scale, seed=0):
    rng = np.random.default_rng(seed)
    Ws = [rng.normal(0, weight_scale, size=(width, width)) for _ in range(depth)]
    a = rng.normal(0, 1, size=(width, 1))
    zs = []
    for W in Ws:
        z = W @ a
        zs.append(z)
        a = activation(z)
    delta = np.ones_like(a)
    norms = [float(np.linalg.norm(delta))]
    for l in range(depth - 1, 0, -1):
        delta = (Ws[l].T @ delta) * deriv(zs[l])
        norms.append(float(np.linalg.norm(delta)))
    return np.array(norms[::-1])


def fig_vanishing_gradients():
    depth, width = 30, 50
    sigmoid_norms = backprop_norms(depth, width, sigmoid, sigmoid_deriv, weight_scale=1.0 / np.sqrt(width))
    relu_norms = backprop_norms(depth, width, relu, relu_deriv, weight_scale=np.sqrt(2.0 / width))

    fig, ax = plt.subplots(figsize=(7.5, 5))
    layers = np.arange(1, depth + 1)
    ax.semilogy(layers, sigmoid_norms, "o-", color=ACCENT, markersize=4,
                label="sigmoid, Xavier-scaled weights")
    ax.semilogy(layers, relu_norms, "o-", color=ACCENT2, markersize=4,
                label="ReLU, He-scaled weights")
    ax.set_xlabel("layer $l$ (1 = input side, 30 = output side)")
    ax.set_ylabel("$\\|\\delta^{[l]}\\|$ (log scale)")
    ax.set_title("Backpropagated error norm across a 30-layer network")
    ax.legend(frameon=False, fontsize=9)
    fig.tight_layout()
    savefig(fig, "vanishing_gradients.png")


if __name__ == "__main__":
    fig_universal_approximation()
    fig_vanishing_gradients()
