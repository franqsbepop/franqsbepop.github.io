import type { BlogPost, BlogTopic, BlogrollGroup } from '../types.ts';

// Blog index for "Beyond Equilibrium", newest first.
//
// Migrated verbatim from the previous hand-written blog.html (titles, decks,
// dates, summaries and topic tags are unchanged). To publish a new post, add
// an entry at the top of `posts` and, as before, add the file name to
// `postOrder` / `postData` in js/post-utilities.js for prev/next navigation.
//
// `summaryHtml` paragraphs are trusted markup and are emitted verbatim.

export const blogIntro =
  "I write about topics at the intersection of mathematics, science, philosophy, finance, and society. Posts are informal, exploratory, sometimes technical, sometimes speculative—my way of thinking out loud about ideas that excite, perplex, or motivate me. All views expressed here are my own, and should not be taken as representative of any organization or affiliation.";

/** Topic filters shown above the post list (unchanged from the previous blog). */
export const blogTopics: BlogTopic[] = [
  { slug: "mathematics", label: "Mathematics" },
  { slug: "finance", label: "Financial Mathematics" },
  { slug: "education", label: "Education" },
  { slug: "philosophy", label: "Philosophy" },
  { slug: "machine-learning", label: "Machine Learning" },
  { slug: "ai", label: "AI" },
  { slug: "economics", label: "Economics" },
  { slug: "history", label: "History" },
  { slug: "research", label: "Research" },
  { slug: "technology", label: "Technology" },
  { slug: "society", label: "Society" },
];

export const posts: BlogPost[] = [
  {
    href: "posts/post39.html",
    title: "Cyberlightenment",
    deck: "A future of deeper truths",
    date: "2026-10-31",
    summaryHtml: [
      "What if technology could do more than make us faster and more connected? What if it could help us discover what we do not yet know, and understand reality itself? A vision of technology as an instrument of human enlightenment: amplifying human thought rather than replacing it, and measuring progress not by how much we automate, but by how much more of reality we come to understand.",
    ],
    tags: ["philosophy", "technology", "ai", "science"],
    labels: ["Philosophy", "Technology", "AI", "Science"],
  },
  {
    href: "posts/post40.html",
    title: "Scale as a Coordinate",
    deck: "What the Cantor set looks like from inside a logarithm",
    date: "2026-08-14",
    summaryHtml: [
      "Everyone learns that the middle-thirds Cantor set has dimension log 2 / log 3, and almost everyone moves on. This post treats logarithmic scale as a coordinate rather than a plotting convenience, turning self-similarity into visible geometry and following it to where the mathematics becomes genuinely deep: oscillations and complex dimensions.",
    ],
    tags: ["mathematics", "fractal-geometry"],
    labels: ["Mathematics", "Fractal Geometry"],
  },
  {
    href: "posts/post41.html",
    title: "God, Church, Christ & the Bishop",
    deck: "A brief heretical history of the foundations of mathematics",
    date: "2026-08-13",
    summaryHtml: [
      "Conway's joke about four Princeton figures maps onto Gödel, Church, Kreisel and Bishop, and onto four ways of asking what mathematics is: truth, computation, proof and construction.",
    ],
    tags: ["mathematics", "philosophy", "history", "logic"],
    labels: ["Mathematics", "Philosophy", "Logic", "History"],
  },
  {
    href: "posts/post37.html",
    title: "Claudius Economicus",
    deck: "From Homo economicus to the artificial economic agent",
    date: "2026-08-13",
    summaryHtml: [
      "Anthropic gave Claude a vending machine. What kind of economic actor did it turn out to be? On predictive management, the gap between intelligence and rationality, and who manages the manager when agents act on their own forecasts.",
    ],
    tags: ["ai", "economics", "technology"],
    labels: ["AI", "Economics", "Management"],
  },
  {
    href: "posts/post29.html",
    title: "Cylindrical Semi-martingale OT, Measure Contiguity, and Large Financial Markets",
    date: "2026-01-14",
    summaryHtml: [
      "We delve into optimal transport in infinite-dimensional settings (cylindrical semi-martingale OT) and the probabilistic notion of contiguity, exploring their roles and interactions in the context of large financial markets.",
    ],
    tags: ["mathematics", "probability", "finance", "stochastic-processes"],
    labels: ["Optimal Transport", "Stochastic Processes", "Large Financial Markets", "Contiguity", "Probability Theory"],
  },
  {
    href: "posts/post20.html",
    title: "Self-Reference: The Foundation and the Limit of Intelligence",
    date: "2026-01-06",
    summaryHtml: [
      "Self-reference lies at the heart of intelligence. It allows systems—biological or artificial—to construct internal models of themselves, predict their own behavior, and learn from self-generated representations. Yet it also defines the ultimate boundary of formal reasoning: the point beyond which a system cannot consistently describe itself without paradox. From Gödel’s incompleteness to Turing’s halting problem and modern self-modeling AI, self-reference has emerged as both the mechanism of understanding and the source of undecidability. This article examines how reflexivity functions as the structural essence of intelligence, and why every attempt at self-understanding—whether logical, computational, or cognitive—confronts the same recursive horizon.",
    ],
    tags: ["philosophy", "mathematics", "ai", "logic"],
    labels: ["Philosophy", "Mathematics", "AI", "Logic"],
  },
  {
    href: "posts/post5.html",
    title: "Optimal Transport Meets Martingales",
    date: "2025-12-05",
    summaryHtml: [
      "This post explores the union of optimal transport and martingale theory. We examine how enforcing a martingale constraint in transport problems leads to rich mathematical structures, with significant applications to mathematical finance and model-independent option pricing.",
    ],
    tags: ["mathematics", "stochastic-processes", "ot", "probability"],
    labels: ["Mathematics", "Optimal Transport", "Stochastic Processes", "Probability"],
  },
  {
    href: "posts/post30.html",
    title: "How to Organize an Unforgettable Hackathon",
    date: "2025-11-20",
    summaryHtml: [
      "A concise guide to planning hackathons: setting goals, themes, team roles, judging, and keeping participants energized while fostering collaboration and community.",
    ],
    tags: ["technology", "community", "innovation", "events"],
    labels: ["Hackathon", "Organization", "Innovation", "Community"],
  },
  {
    href: "posts/post26.html",
    title: "On the Information Bottleneck Principle",
    date: "2025-11-15",
    summaryHtml: [
      "The information bottleneck principle provides a framework for extracting relevant information from signals by balancing compression with predictive power. This post discusses its foundations in information theory, applications in statistics and deep learning, and how it guides the structure of efficient representations.",
    ],
    tags: ["mathematics", "information-theory", "statistics", "machine-learning"],
    labels: ["Mathematics", "Information Theory", "Statistics", "Machine Learning"],
  },
  {
    href: "posts/post27.html",
    title: "Ambit Causality: Continuous Markov Blankets in Space–Time",
    date: "2025-10-27",
    summaryHtml: [
      "How does causality work when randomness spreads continuously across space and time? This post introduces <strong>ambit causality</strong>: a geometric, field-based perspective on cause and effect. Instead of causal diagrams with nodes and arrows, we reason in terms of <em>regions</em> (supports) and the flow of influence in stochastic fields. Topics include: Causal Ambit Blankets (continuous Markov blankets), interventions on regions, local independence, and applications in turbulence, finance, and neuroscience.",
    ],
    tags: ["mathematics", "causality", "stochastic-processes", "random-fields"],
    labels: ["Mathematics", "Causality", "Stochastic Processes", "Random Fields"],
  },
  {
    href: "posts/post25.html",
    title: "Kolmogorov Complexity and Fractal Geometry: Information as Dimension",
    date: "2025-10-26",
    summaryHtml: [
      "This post explores the intersection of Kolmogorov complexity and fractal geometry, introducing the concept of algorithmic (effective) dimension. We discuss how the shortest description of an object (from algorithmic information theory) connects with how detail scales with resolution (fractal geometry), and how these perspectives unify in understanding the geometry of information.",
    ],
    tags: ["mathematics", "information-theory", "fractal-geometry"],
    labels: ["Mathematics", "Information Theory", "Fractal Geometry"],
  },
  {
    href: "posts/post28.html",
    title: "Cybernetics: The Science of Systems and Control",
    date: "2025-03-18",
    summaryHtml: [
      "An introduction to cybernetics, the transdisciplinary study of systems, feedback, and regulation in biology, engineering, and society. This post covers its historical roots, key concepts, and enduring influence across scientific and philosophical thought.",
    ],
    tags: ["philosophy", "systems-theory", "cybernetics", "science"],
    labels: ["Philosophy", "Systems Theory", "Cybernetics", "Science"],
  },
  {
    href: "posts/post18.html",
    title: "Sticky Path Dependency",
    deck: "On progress, stagnation and hope for the future",
    date: "2025-01-22",
    summaryHtml: [
      "Progress is often imagined as a linear ascent—an arrow from ignorance to enlightenment, from poverty to prosperity. Yet, as any careful observer of history or mathematics knows, the true trajectory is far more intricate, shaped by the recursive influence of prior choices. The concept of <strong>path dependence</strong> encapsulates this: past decisions, technologies, and institutions do not merely precede the present—they delimit its possibilities. When these inherited paths become \"sticky,\" they resist even the most rational attempts at reform, and progress stalls.",
    ],
    tags: ["society", "economics", "history"],
    labels: ["Society", "Economics", "History"],
  },
  {
    href: "posts/post15.html",
    title: "Econophysics: Bridging Economics and Physics",
    date: "2024-12-15",
    summaryHtml: [
      "Econophysics is an interdisciplinary research field that applies theories and methods originally developed by physicists to solve problems in economics. This post delves into the history, key concepts, and significant contributions of econophysics, exploring how it bridges the gap between economics and physics.",
    ],
    tags: ["economics", "finance", "mathematics"],
    labels: ["Economics", "Financial Mathematics", "Mathematics"],
  },
  {
    href: "posts/post7.html",
    title: "Brain-Computer Interfaces",
    deck: "The Future of Human-Machine Interaction",
    date: "2024-12-10",
    summaryHtml: [
      "Brain-Computer Interface (BCIs) represent a groundbreaking technology that enables direct communication between the human brain and external devices. This emerging field has the potential to revolutionize various aspects of human life, from medical applications to enhancing everyday interactions with technology.",
    ],
    tags: ["technology", "neuroscience", "ai"],
    labels: ["Technology", "Neuroscience", "AI"],
  },
  {
    href: "posts/post4.html",
    title: "Computational Methods in Education",
    date: "2024-12-07",
    summaryHtml: [
      "In this post, I explore the integration of computational tools and methods in the classroom.",
    ],
    tags: ["education", "technology"],
    labels: ["Education", "Technology"],
  },
  {
    href: "posts/post14.html",
    title: "The Unreasonable Effectiveness of Mathematics: Karpathy vs Wigner",
    date: "2024-12-04",
    summaryHtml: [
      "This post compares the perspectives of Eugene Wigner and Andrej Karpathy on the effectiveness of mathematics. Wigner's philosophical insights on the relationship between mathematics and physical reality are contrasted with Karpathy's observations on the capabilities of neural networks in capturing complex patterns.",
    ],
    tags: ["philosophy", "mathematics", "machine-learning"],
    labels: ["Philosophy", "Mathematics", "Machine Learning"],
  },
  {
    href: "posts/post13.html",
    title: "Mathematical Philosophy and Large Language Models: New Frontiers in Mathematical Reasoning",
    date: "2024-12-02",
    summaryHtml: [
      "The emergence of Large Language Models (LLMs) has opened new avenues for exploring mathematical reasoning and philosophical questions about the nature of mathematical understanding. This post examines the implications of LLMs for mathematical philosophy and the future of mathematical reasoning.",
    ],
    tags: ["philosophy", "machine-learning", "mathematics"],
    labels: ["Philosophy", "Machine Learning", "Mathematics"],
  },
  {
    href: "posts/post12.html",
    title: "Leonard Euler Infinite-Dimensional Influence",
    date: "2024-12-01",
    summaryHtml: [
      "Leonhard Euler was one of the most prolific mathematicians in history, whose contributions span virtually every area of mathematics known in his time. This post highlights Euler's groundbreaking work and lasting impact on mathematics, physics, and engineering.",
    ],
    tags: ["mathematics", "history"],
    labels: ["Mathematics", "History"],
  },
  {
    href: "posts/post8.html",
    title: "Ethical Implications of Finance in Von Neumann Universes",
    date: "2024-11-27",
    summaryHtml: [
      "Building upon our previous discussion of von Neumann's mathematical frameworks in finance, this post explores the ethical implications of applying these abstract mathematical structures to real-world financial systems. As financial markets become increasingly complex and automated, understanding the ethical dimensions of mathematical finance becomes crucial.",
    ],
    tags: ["philosophy", "mathematics", "ethics"],
    labels: ["Philosophy", "Mathematics", "Ethics"],
  },
  {
    href: "posts/post6.html",
    title: "The Philosophy of Mathematics in Finance",
    deck: "Conceptual and Ethical Considerations",
    date: "2024-11-20",
    summaryHtml: [
      "In recent years, there has been growing interest in the philosophical underpinnings of finance, particularly in how mathematical concepts shape our understanding of financial systems. This post explores how philosophical inquiry into mathematics can shed light on the nature of finance, its conceptual foundations, and its ethical implications.",
    ],
    tags: ["philosophy", "mathematics", "finance"],
    labels: ["Philosophy", "Mathematics", "Finance"],
  },
  {
    href: "posts/post21.html",
    title: "Never vote for a lawyer: An economic argument based on the historical evolution of society",
    date: "2024-11-13",
    summaryHtml: [
      "Historical context with an emphasis in Portugal and Spain and their inefficiency caused by the Court System. Innovation as a driver of successful societies. GDP per capita as a measure of success. Darwinism of Institutions.",
    ],
    tags: ["society", "economics", "history"],
    labels: ["Society", "Economics", "History"],
  },
  {
    href: "posts/post32.html",
    title: "Generative Models: Foundations, Types, and Applications",
    date: "2024-11-13",
    summaryHtml: [
      "This post explores <strong>generative models</strong>: a rapidly evolving class of machine learning models that learn the structure of data so they can create realistic images, text, music, and more. It covers model families (VAEs, GANs, diffusion models, etc.), their applications (art, science, language, and beyond), and some philosophical and scientific challenges—such as training stability, ethics, and interpreting what these networks have learned.",
    ],
    tags: ["machine-learning", "generative-models", "deep-learning", "ai"],
    labels: ["Machine Learning", "Generative Models", "Deep Learning", "AI"],
  },
  {
    href: "posts/post33.html",
    title: "Understanding Representation Learning: Foundations and Frontiers",
    date: "2024-11-13",
    summaryHtml: [
      "Representation learning is at the core of modern machine learning. This post introduces its motivation, surveys classic and cutting-edge techniques—including embeddings, neural networks, and self-supervised methods—and discusses its transformative impact across domains from vision to language, as well as the challenges and frontiers for interpretable, fair, and robust representations.",
    ],
    tags: ["machine-learning", "representation-learning", "deep-learning", "ai"],
    labels: ["Machine Learning", "Representation Learning", "Deep Learning", "AI"],
  },
  {
    href: "posts/post3.html",
    title: "Reducing Bias in Education Evaluation",
    date: "2024-09-03",
    summaryHtml: [
      "In this post, I explore how improved assessment methodologies can help reduce inequality and provide more accurate measures of student performance. The post discusses the merits of continuous assessment versus standardized testing, drawing on research from prominent economists and education researchers. Key topics include formative assessment practices, the challenges of different evaluation methods, and proposals for balanced approaches that combine multiple assessment types. The discussion aims to contribute to developing more equitable and effective evaluation systems in higher education.",
    ],
    tags: ["education", "economics", "research"],
    labels: ["Education", "Economics", "Research"],
  },
  {
    href: "posts/post2.html",
    title: "The weak law of poorly abbreviated large history",
    date: "2024-08-26",
    summaryHtml: [
      "In this post I do my best to synthesize the history of financial mathematics. The title references Stephen Hawking's iconic \"A Brief History of Time\". The (rather short) history takes us back to the end of the XIX Century and the beginning of the XX century. For attention grabbing purposes, notable names mentioned include Albert Einstein, Henri Poincaré, Louis Bachelier, Norbert Wiener, Vito Volterra, Paul Lévy, Benoit Mandelbrot, Fisher Black, Myron Scholes, Robert Merton, Emmanuel Derman, Paul Wilmott, Edward O. Thorp. I hope you enjoy reading this short account of the history of this field. The field presents itself as the product of the efforts of countless contributors to its development and dissemination.",
    ],
    tags: ["finance", "history", "mathematics"],
    labels: ["Financial Mathematics", "History", "Mathematics"],
  },
  {
    href: "posts/post1.html",
    title: "Learning via writing",
    date: "2024-08-13",
    summaryHtml: [
      "Recently I had to write this proposal. I find curious the concept of a proposal. I am (theoretically) proposing myself to do something. Carefully simulating planned experiences in my head prior to their (possible) unfloding in reality. Proposal writing seems analagous to goal setting, to define a loss (objective) function. What will be minimized (maximized) during the period of the proposal?",
      "Setting goal is a strenuous task. Firstly, you do not know where to start, so many possible targets, so many possible paths. The idea of a proposal should be to make both clear. Hopefully, by writing one, you will be able to understand (quantify) your goals. Firstly, there is the need to properly define your goals, secondly, there is the need to carefully deliniate a possible path to achieve them. At this moment, it does not need to be the shortest-most-optimal path. Such optimization processes surely will be underwent at some point. Currently, we are drawing a simple map. Once our loss (objetive) function is defined, we can start the optimization task, usually via parameter updating. There is a set goal and a path to get there, how can you reach it in the most efficient manner?",
      "At this stage, we start exploring our map in a virtual environment, in this case, our imagination. Concepts such as gradient descent and local minima are certainly useful to have in mind. Additionally, contrafactual thinking is a great tool we have at our disposal. What would happened if I perturbed my current path, i.e. shifted slighly my parameters. One can see the paths of alternative branches of the multiverse unfolding before ones' eyes. Nothing new, old techniques adapted to modern times. This is all I have for now, hope this helps, and hope you enjoy reading my proposal.",
    ],
    tags: ["research", "mathematics", "machine-learning"],
    labels: ["Research", "Mathematics", "Machine Learning"],
  },
];

export const blogroll: BlogrollGroup[] = [
  {
    name: 'Science, Philosophy, and Ideas',
    links: [
      { label: 'Edge.org', url: 'https://www.edge.org/' },
      { label: 'Quanta Magazine', url: 'https://www.quantamagazine.org/' },
      { label: 'Nintil', url: 'https://nintil.com/' },
      { label: 'Gradient', url: 'https://gradient.ngo/' },
      { label: 'LessWrong', url: 'https://www.lesswrong.com/' },
    ],
  },
  {
    name: 'AI, Machine Learning & Rationality',
    links: [
      { label: 'LessWrong', url: 'https://www.lesswrong.com/' },
      { label: 'Gradient', url: 'https://gradient.ngo/' },
      { label: 'Alignment Forum', url: 'https://www.alignmentforum.org/' },
      { label: 'Distill', url: 'https://distill.pub' },
    ],
  },
  {
    name: 'Individual Voices',
    links: [
      { label: 'K (Karpathy)', url: 'https://karpathy.ai/' },
      { label: 'W (Wolfram)', url: 'https://writings.stephenwolfram.com/' },
      { label: 'A (Aaronson)', url: 'https://www.scottaaronson.com/blog/' },
      { label: 'E (Rao/Ribbonfarm)', url: 'https://www.ribbonfarm.com/' },
      { label: 'R (Gwern)', url: 'https://www.gwern.net/' },
    ],
  },
];
