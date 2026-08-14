"""
Figure generator for notes/computer-programming/distributed-systems.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import random
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch

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
# Figure 1 -- a space-time diagram of 3 processes exchanging messages, with
# Lamport and vector clocks computed at every event, showing a pair of
# events that Lamport clocks order but that are actually concurrent.
# ---------------------------------------------------------------------------
def simulate():
    n = 3
    lamport = [0, 0, 0]
    vector = [[0, 0, 0] for _ in range(3)]
    events = []

    def local(p, x):
        lamport[p] += 1
        vector[p][p] += 1
        events.append(dict(p=p, x=x, kind="local", L=lamport[p], V=tuple(vector[p])))

    def send(p, x, target):
        lamport[p] += 1
        vector[p][p] += 1
        ts = (lamport[p], tuple(vector[p]))
        events.append(dict(p=p, x=x, kind="send", L=lamport[p], V=tuple(vector[p]), target=target))
        return ts

    def recv(p, x, sent):
        sl, sv = sent
        lamport[p] = max(lamport[p], sl) + 1
        for k in range(n):
            vector[p][k] = max(vector[p][k], sv[k])
        vector[p][p] += 1
        events.append(dict(p=p, x=x, kind="recv", L=lamport[p], V=tuple(vector[p])))

    local(0, 1.0)
    m1 = send(0, 2.0, 1)
    recv(1, 3.0, m1)
    m2 = send(1, 3.6, 2)
    local(2, 1.5)
    recv(2, 4.6, m2)
    local(0, 5.2)

    return events, [(0, 2.0, 1, 3.0), (1, 3.6, 2, 4.6)]  # events, message arrows (p_from,x_from,p_to,x_to)


def fig_vector_clocks():
    events, messages = simulate()
    fig, ax = plt.subplots(figsize=(10, 5.2))

    labels = ["$P_1$", "$P_2$", "$P_3$"]
    for p in range(3):
        ax.plot([0.5, 5.8], [p, p], color=FADE, linewidth=1.2, zorder=1)
        ax.text(0.15, p, labels[p], fontsize=12, va="center", ha="right")

    for (pf, xf, pt, xt) in messages:
        arrow = FancyArrowPatch((xf, pf), (xt, pt), arrowstyle="-|>", mutation_scale=14,
                                 color=ACCENT2, linewidth=1.2, linestyle="--", zorder=2)
        ax.add_patch(arrow)

    highlight_pairs = [(0, 6), (4, 6)]  # indices in `events` to compare (P1's last local vs P3's first local)
    for i, e in enumerate(events):
        color = ACCENT if i in (4, 6) else INK
        ax.plot(e["x"], e["p"], "o", color=color, markersize=8, zorder=3)
        label = f"L={e['L']}\nV={list(e['V'])}"
        ax.annotate(label, (e["x"], e["p"]), textcoords="offset points", xytext=(0, 14 if e["p"] < 2 else -34),
                     fontsize=8, ha="center", color=color)

    ax.set_ylim(-0.6, 2.6)
    ax.set_xlim(0, 6.2)
    ax.set_yticks([])
    ax.set_xticks([])
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.set_title("Lamport orders everything; vector clocks know what's actually concurrent")
    fig.tight_layout()
    savefig(fig, "vector_clocks.png")


# ---------------------------------------------------------------------------
# Figure 2 -- majority quorums always intersect by at least the proved
# amount, even though two random quorums typically overlap far more.
# ---------------------------------------------------------------------------
def fig_quorum_intersection():
    rng = random.Random(0)
    ns = [4, 6, 8, 10, 15, 20, 30, 50, 80, 120]
    avg_overlap = []
    worst_case = []
    for n in ns:
        q = n // 2 + 1
        trials = 4000
        total = 0
        for _ in range(trials):
            Q1 = set(rng.sample(range(n), q))
            Q2 = set(rng.sample(range(n), q))
            total += len(Q1 & Q2)
        avg_overlap.append(total / trials)
        worst_case.append(max(0, 2 * q - n))

    fig, ax = plt.subplots(figsize=(7.5, 5))
    ax.plot(ns, avg_overlap, "o-", color=ACCENT2, markersize=6, label="average overlap of two random majority quorums")
    ax.plot(ns, worst_case, "o--", color=ACCENT, markersize=6, label="proved worst-case minimum ($2\\lfloor n/2\\rfloor{+}2-n$)")
    ax.set_xlabel("$n$ (number of processes)")
    ax.set_ylabel("size of $Q_1\\cap Q_2$")
    ax.set_title("The guarantee is a floor, not the typical case")
    ax.legend(frameon=False, fontsize=9)
    fig.tight_layout()
    savefig(fig, "quorum_intersection.png")


if __name__ == "__main__":
    fig_vector_clocks()
    fig_quorum_intersection()
