"""
Manim POC for the site's visualization pipeline.

Subject: an iterated function system (IFS) of three affine contractions
applied repeatedly to a filled triangle, converging to the Sierpinski
gasket -- the deterministic (Hausdorff-metric) counterpart of the chaos
game / random IFS Markov chain used in stochastic geometry. Chosen
because the animation demonstrates the *emergence* of the fractal under
repeated transformation, not just its final shape (a static plot can only
show the end state).

Palette matches the site's existing matplotlib figures
(notes/**/generate_figures.py): INK, ACCENT, ACCENT2, ACCENT3, FADE.
"""

from manim import *

INK = "#2c2c2c"
ACCENT = "#8c2f2f"
ACCENT2 = "#2f5f8c"
ACCENT3 = "#3f7a4a"
FADE = "#9a9a9a"

config.background_color = WHITE


def contractions(triangle_points):
    """Three affine maps, each contracting to a corner and halving scale."""
    corners = triangle_points
    return [lambda p, c=c: (p + c) / 2 for c in corners]


class IFSAttractor(Scene):
    def construct(self):
        title = Tex(
            r"Iterated function system: $f_i(x) = \tfrac{1}{2}(x + v_i)$",
            color=INK,
        ).scale(0.8).to_edge(UP)
        self.play(Write(title))

        corners = [
            np.array([-3, -2, 0]),
            np.array([3, -2, 0]),
            np.array([0, 2.8, 0]),
        ]
        maps = contractions(corners)
        colors = [ACCENT, ACCENT2, ACCENT3]

        triangle = Polygon(*corners, color=INK, fill_color=FADE, fill_opacity=0.5)
        self.play(FadeIn(triangle))
        self.wait(0.3)

        shapes = [triangle]
        for step in range(5):
            new_shapes = VGroup()
            anims = []
            for shape in shapes:
                for f, c in zip(maps, colors):
                    pts = [f(shape.get_vertices()[i]) for i in range(len(shape.get_vertices()))] \
                        if hasattr(shape, "get_vertices") else None
                    img = shape.copy()
                    img.apply_function(f)
                    img.set_color(c)
                    img.set_fill(c, opacity=max(0.15, 0.5 - 0.08 * step))
                    new_shapes.add(img)
                    anims.append(Transform(shape.copy(), img))

            self.play(
                *[ReplacementTransform(s.copy(), ns) for s, ns in
                  zip([shapes[i % len(shapes)] for i in range(len(new_shapes))], new_shapes)],
                FadeOut(VGroup(*shapes)),
                run_time=0.9,
            )
            shapes = list(new_shapes)

        caption = Tex(
            r"$n=5$: $3^5 = 243$ contracted copies $\to$ the Sierpi\'nski gasket",
            color=INK,
        ).scale(0.6).to_edge(DOWN)
        self.play(Write(caption))
        self.wait(1)
