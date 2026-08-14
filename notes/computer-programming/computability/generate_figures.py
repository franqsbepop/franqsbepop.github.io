"""
Figure generator for notes/computer-programming/computability.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
Note: fig_np_hardness re-derives real brute-force timings and takes
roughly 100 seconds to run (the point of the figure).
"""

import os
import time
import random
import itertools
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
# Figure 1 -- the minimal DFA for the truncated language {0^n1^n : n<=N},
# computed exactly via Myhill-Nerode residual languages, grows linearly and
# without bound in N -- the concrete content behind non-regularity.
# ---------------------------------------------------------------------------
def L_N(N):
    return ["0" * k + "1" * k for k in range(N + 1)]


def minimal_states(N):
    lang = L_N(N)
    prefixes = set()
    for j in range(0, N + 1):
        prefixes.add("0" * j)
    for k in range(0, N + 1):
        for i in range(1, k + 1):
            prefixes.add("0" * k + "1" * i)

    residuals = set()
    for w in prefixes:
        res = frozenset(s[len(w):] for s in lang if s.startswith(w))
        residuals.add(res)

    return len(residuals) + 1  # +1 for the single dead/reject class


def fig_myhill_nerode():
    Ns = list(range(0, 21))
    states = [minimal_states(N) for N in Ns]

    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(Ns, states, "o-", color=ACCENT, markersize=5, label="minimal DFA states (computed)")
    ax.plot(Ns, [2 * N + 2 for N in Ns], "--", color=FADE, linewidth=1.2, label="$2N+2$")
    ax.set_xlabel("$N$")
    ax.set_ylabel("minimal number of DFA states")
    ax.set_title("Myhill-Nerode for $\\{0^n1^n:n\\leq N\\}$: no finite bound works")
    ax.legend(frameon=False, fontsize=9)
    fig.tight_layout()
    savefig(fig, "myhill_nerode.png")


# ---------------------------------------------------------------------------
# Figure 2 -- brute-force search for an independent set of size m in the
# graph built by the SAT-to-Independent-Set reduction (Section 7) blows up
# exponentially in m, on the exact graphs the note's reduction constructs.
# ---------------------------------------------------------------------------
def sat_to_indep_set_graph(clauses):
    n_clauses = len(clauses)
    vertices = [(c, i) for c in range(n_clauses) for i in range(3)]
    edges = set()
    for c in range(n_clauses):
        for i in range(3):
            for j in range(i + 1, 3):
                edges.add(((c, i), (c, j)))
    for c1 in range(n_clauses):
        for i in range(3):
            for c2 in range(c1 + 1, n_clauses):
                for j in range(3):
                    v1, p1 = clauses[c1][i]
                    v2, p2 = clauses[c2][j]
                    if v1 == v2 and p1 != p2:
                        edges.add(((c1, i), (c2, j)))
    return vertices, edges


def random_3sat(n_vars, n_clauses, seed):
    rng = random.Random(seed)
    clauses = []
    for _ in range(n_clauses):
        vs = rng.sample(range(n_vars), 3)
        clauses.append([(v, rng.random() < 0.5) for v in vs])
    return clauses


def is_independent(subset, edges):
    for a, b in itertools.combinations(subset, 2):
        if (a, b) in edges or (b, a) in edges:
            return False
    return True


def brute_force_indep_set(vertices, edges, k):
    for subset in itertools.combinations(vertices, k):
        if is_independent(subset, edges):
            return subset
    return None


def fig_np_hardness():
    ms = [4, 6, 8, 10, 11, 12]
    times = []
    for m in ms:
        clauses = random_3sat(n_vars=m, n_clauses=m, seed=1)
        vertices, edges = sat_to_indep_set_graph(clauses)
        t0 = time.time()
        brute_force_indep_set(vertices, edges, m)
        times.append(time.time() - t0)
        print(f"  m={m}: {times[-1]:.3f}s")

    fig, ax = plt.subplots(figsize=(7, 5))
    ax.semilogy(ms, times, "o-", color=ACCENT, markersize=6, label="brute-force search time")
    ref = times[0] * 2.0 ** (np.array(ms) - ms[0])
    ax.semilogy(ms, ref, "--", color=FADE, linewidth=1.2, label="$\\propto 2^m$ reference")
    ax.set_xlabel("$m$ = number of clauses (graph has $3m$ vertices)")
    ax.set_ylabel("time to find a size-$m$ independent set, seconds (log scale)")
    ax.set_title("Verifying a candidate is instant; brute-force search is not")
    ax.legend(frameon=False, fontsize=9)
    fig.tight_layout()
    savefig(fig, "np_hardness.png")


if __name__ == "__main__":
    fig_myhill_nerode()
    fig_np_hardness()
