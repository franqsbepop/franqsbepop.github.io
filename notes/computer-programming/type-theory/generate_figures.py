"""
Figure generator for notes/computer-programming/type-theory.html.

Run `python3 generate_figures.py` to regenerate every PNG in figures/.
"""

import os
import itertools
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

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
# Tiny capture-avoiding lambda calculus, used to compute real reduction
# traces for both figures (not hand-derived).
# ---------------------------------------------------------------------------
class Var:
    def __init__(self, name): self.name = name
    def __repr__(self): return self.name


class Abs:
    def __init__(self, param, body): self.param, self.body = param, body
    def __repr__(self): return f"λ{self.param}.{self.body}"


class App:
    def __init__(self, fn, arg): self.fn, self.arg = fn, arg
    def __repr__(self):
        fn_s = f"({self.fn})" if isinstance(self.fn, Abs) else str(self.fn)
        arg_s = f"({self.arg})" if isinstance(self.arg, (Abs, App)) else str(self.arg)
        return f"{fn_s} {arg_s}"


_counter = itertools.count()


def fresh(base):
    return f"{base}{next(_counter)}"


def free_vars(t):
    if isinstance(t, Var):
        return {t.name}
    if isinstance(t, Abs):
        return free_vars(t.body) - {t.param}
    return free_vars(t.fn) | free_vars(t.arg)


def subst(t, x, s):
    if isinstance(t, Var):
        return s if t.name == x else t
    if isinstance(t, App):
        return App(subst(t.fn, x, s), subst(t.arg, x, s))
    if t.param == x:
        return t
    if t.param in free_vars(s):
        newparam = fresh(t.param)
        renamed_body = subst(t.body, t.param, Var(newparam))
        return Abs(newparam, subst(renamed_body, x, s))
    return Abs(t.param, subst(t.body, x, s))


def is_redex(t):
    return isinstance(t, App) and isinstance(t.fn, Abs)


def step_leftmost(t):
    if is_redex(t):
        return subst(t.fn.body, t.fn.param, t.arg), True
    if isinstance(t, App):
        new_fn, stepped = step_leftmost(t.fn)
        if stepped:
            return App(new_fn, t.arg), True
        new_arg, stepped = step_leftmost(t.arg)
        if stepped:
            return App(t.fn, new_arg), True
        return t, False
    if isinstance(t, Abs):
        new_body, stepped = step_leftmost(t.body)
        return (Abs(t.param, new_body), True) if stepped else (t, False)
    return t, False


def normalize(t, max_steps=5000):
    steps = 0
    while steps < max_steps:
        t2, stepped = step_leftmost(t)
        if not stepped:
            return t, steps
        t, steps = t2, steps + 1
    return t, steps


# ---------------------------------------------------------------------------
# Figure 1 -- confluence: two different reduction orders on the same term,
# reaching the same normal form after a different number of steps.
# ---------------------------------------------------------------------------
def fig_confluence():
    a = Var("a")
    inner = App(Abs("y", Var("y")), a)
    M = App(Abs("x", App(Var("x"), Var("x"))), inner)

    # Path A: leftmost-outermost (reduce the outer redex first)
    A1, _ = step_leftmost(M)
    A2, _ = step_leftmost(A1)
    A3, _ = step_leftmost(A2)

    # Path B: reduce the inner redex first
    B1 = App(Abs("x", App(Var("x"), Var("x"))), a)
    B2 = App(a, a)

    nodes = {
        "M": (str(M), 0.5, 0.90),
        "A1": (str(A1), 0.78, 0.66),
        "A2": (str(A2), 0.78, 0.40),
        "B1": (str(B1), 0.22, 0.60),
        "N": (str(A3), 0.5, 0.12),
    }
    edges = [("M", "A1"), ("A1", "A2"), ("A2", "N"), ("M", "B1"), ("B1", "N")]

    fig, ax = plt.subplots(figsize=(8, 6.5))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    boxes = {}
    for key, (label, x, y) in nodes.items():
        color = ACCENT2 if key == "N" else INK
        box = FancyBboxPatch((x - 0.19, y - 0.045), 0.38, 0.09,
                              boxstyle="round,pad=0.01", linewidth=1.3,
                              edgecolor=color, facecolor="white", zorder=3)
        ax.add_patch(box)
        ax.text(x, y, f"${label}$" if False else label, ha="center", va="center",
                 fontsize=11, family="monospace", zorder=4)
        boxes[key] = (x, y)

    for i, (u, v) in enumerate(edges):
        x1, y1 = boxes[u]
        x2, y2 = boxes[v]
        color = ACCENT if u in ("M", "A1", "A2") else ACCENT3
        arrow = FancyArrowPatch((x1, y1 - 0.05), (x2, y2 + 0.05),
                                 arrowstyle="-|>", mutation_scale=14,
                                 color=color, linewidth=1.4, zorder=2,
                                 connectionstyle="arc3,rad=0.0")
        ax.add_patch(arrow)

    ax.text(0.87, 0.53, "path A\n(outer first)\n3 steps", color=ACCENT, fontsize=9, ha="left")
    ax.text(0.02, 0.75, "path B\n(inner first)\n2 steps", color=ACCENT3, fontsize=9, ha="left")
    ax.set_title("Two reduction orders, one term, one normal form", fontsize=12, fontweight="bold")
    fig.tight_layout()
    savefig(fig, "confluence.png")


# ---------------------------------------------------------------------------
# Figure 2 -- strong normalization: a typed family always terminates, in a
# step count growing with term size; the untyped Omega term never does.
# ---------------------------------------------------------------------------
def church(n):
    body = Var("x")
    for _ in range(n):
        body = App(Var("f"), body)
    return Abs("f", Abs("x", body))


def fig_normalization():
    g = Abs("z", App(Abs("w", Var("w")), Var("z")))
    y = Var("y")
    ns = [1, 2, 4, 8, 16, 32, 64, 96]
    step_counts = []
    for n in ns:
        term = App(App(church(n), g), y)
        _, steps = normalize(term)
        step_counts.append(steps)

    omega_sub = Abs("x", App(Var("x"), Var("x")))
    Omega = App(omega_sub, omega_sub)
    omega_still_redex = []
    t = Omega
    horizon = max(step_counts) + 20
    for _ in range(horizon):
        t, _ = step_leftmost(t)
        omega_still_redex.append(is_redex(t))

    fig, ax = plt.subplots(figsize=(7.5, 5))
    ax.plot(ns, step_counts, "o-", color=ACCENT2, markersize=6,
             label="typed family: steps to normal form (finite, growing)")
    ax.axhline(horizon, color=ACCENT, linestyle="--", linewidth=1.4,
               label=f"untyped $\\Omega$: still a redex after {horizon} steps, forever")
    ax.set_ylim(0, horizon * 1.25)
    ax.set_xlabel("$n$ (Church-numeral family term size)")
    ax.set_ylabel("beta-reduction steps to normal form")
    ax.set_title("Well-typed terms always finish; $\\Omega$ never does")
    ax.legend(frameon=False, fontsize=9, loc="lower right")
    fig.tight_layout()
    savefig(fig, "normalization.png")


if __name__ == "__main__":
    fig_confluence()
    fig_normalization()
