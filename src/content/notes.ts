import type { NoteShelf } from '../types.ts';

// The notes library. Each entry points to an existing page under /notes;
// the pages themselves are hand-written and are not modified by the build,
// apart from the shared site header and footer.
//
// `description` lists the main topics, taken from each note's own table of
// contents.

export const notesIntro =
  'Study notes on core topics in mathematics, statistics and computing, compiled while learning and teaching. Most sets build from definitions to the main theorems, with figures, common pitfalls and references for further reading.';

export const notesDisclaimer =
  'These are personal notes compiled for reference and learning. They may contain errors, incomplete information or personal interpretations, and they are not peer-reviewed. For academic or professional purposes, please consult textbooks, research papers or other authoritative sources.';

export const noteShelves: NoteShelf[] = [
  {
    id: 'foundations',
    name: 'Foundations of mathematics',
    description: 'The core of an undergraduate mathematics degree.',
    subjects: [
      {
        id: 'analysis',
        name: 'Mathematical Analysis',
        folder: 'mathematical-analysis',
        notes: [
          { title: 'Sequences and Series', href: 'notes/mathematical-analysis/sequences-series.html', format: 'HTML', updated: '2026-08', description: 'Completeness, Bolzano–Weierstrass, Cauchy sequences, convergence tests, power series.' },
          { title: 'Continuity and Limits', href: 'notes/mathematical-analysis/continuity.html', format: 'HTML', updated: '2026-08', description: 'Limits, the Intermediate and Extreme Value Theorems, uniform continuity.' },
          { title: 'Convergence Theory', href: 'notes/mathematical-analysis/convergence.html', format: 'HTML', updated: '2026-08', description: 'Pointwise and uniform convergence, interchanging limits, the Weierstrass M-test.' },
        ],
      },
      {
        id: 'calculus',
        name: 'Calculus',
        folder: 'calculus',
        notes: [
          { title: 'Differentiation', href: 'notes/calculus/differentiation.html', format: 'HTML', updated: '2026-08', description: 'The chain rule, the Mean Value Theorem, L’Hôpital’s rule, Taylor’s theorem.' },
          { title: 'Integration', href: 'notes/calculus/integration.html', format: 'HTML', updated: '2026-08', description: 'Riemann sums, the Fundamental Theorem of Calculus, improper and numerical integration.' },
          { title: 'Multivariable Calculus', href: 'notes/calculus/multivariable-calculus.html', format: 'HTML', updated: '2026-08', description: 'Gradients, the Hessian, the Implicit Function Theorem, Lagrange multipliers.' },
        ],
      },
      {
        id: 'linear-algebra',
        name: 'Linear Algebra',
        folder: 'linear-algebra',
        notes: [
          { title: 'Matrices and Operations', href: 'notes/linear-algebra/matrices.html', format: 'HTML', updated: '2026-08', description: 'Matrix multiplication, determinants, invertibility, rank, Gaussian elimination.' },
          { title: 'Vector Spaces', href: 'notes/linear-algebra/vector-spaces.html', format: 'HTML', updated: '2026-08', description: 'Bases and dimension, rank–nullity, inner products, orthogonal projection, Gram–Schmidt.' },
          { title: 'Eigenvalues and Eigenvectors', href: 'notes/linear-algebra/eigenvalues.html', format: 'HTML', updated: '2026-08', description: 'Diagonalisation, the spectral theorem, the power method, PCA.' },
        ],
      },
      {
        id: 'discrete-mathematics',
        name: 'Discrete Mathematics',
        folder: 'discrete-mathematics',
        notes: [
          { title: 'Combinatorics', href: 'notes/discrete-mathematics/combinatorics.html', format: 'HTML', updated: '2026-08', description: 'Inclusion–exclusion, generating functions, Catalan numbers, Ramsey theory.' },
          { title: 'Graph Theory', href: 'notes/discrete-mathematics/graph-theory.html', format: 'HTML', updated: '2026-08', description: 'Trees, planarity and Euler’s formula, colouring, matchings and Hall’s theorem.' },
          { title: 'Mathematical Logic', href: 'notes/discrete-mathematics/logic.html', format: 'HTML', updated: '2026-08', description: 'Propositional logic, soundness and completeness, compactness, resolution.' },
        ],
      },
      {
        id: 'number-theory',
        name: 'Number Theory',
        folder: 'number-theory',
        notes: [
          { title: 'Prime Numbers', href: 'notes/number-theory/prime-numbers.html', format: 'HTML', updated: '2024-12', description: 'The Fundamental Theorem of Arithmetic, the Prime Number Theorem, primality tests.' },
          { title: 'Modular Arithmetic', href: 'notes/number-theory/modular-arithmetic.html', format: 'HTML', updated: '2024-12', description: 'Congruences, modular inverses, Euler’s theorem, the Chinese Remainder Theorem.' },
          { title: 'Cryptography', href: 'notes/number-theory/cryptography.html', format: 'HTML', updated: '2024-12', description: 'RSA, Diffie–Hellman, elliptic-curve cryptography, digital signatures.' },
        ],
      },
    ],
  },
  {
    id: 'data-learning',
    name: 'Statistics, econometrics & learning',
    description: 'Inference from data, from regression to neural networks.',
    subjects: [
      {
        id: 'econometrics',
        name: 'Econometrics',
        folder: 'econometrics',
        notes: [
          { title: 'Regression Methods', href: 'notes/econometrics/regression-methods.html', format: 'HTML', updated: '2026-08', description: 'OLS as projection, Gauss–Markov, robust standard errors, ridge regression.' },
          { title: 'Time Series Analysis', href: 'notes/econometrics/time-series-analysis.html', format: 'HTML', updated: '2026-08', description: 'Stationarity, ARMA models, unit roots, spurious regression, forecasting.' },
          { title: 'Causal Inference', href: 'notes/econometrics/causal-inference.html', format: 'HTML', updated: '2026-08', description: 'Potential outcomes, instrumental variables, regression discontinuity, difference-in-differences.' },
          { title: 'Econometrics: personal notes', href: 'notes/econometrics/econometrics.pdf', format: 'PDF', description: 'A single 32-page PDF.' },
        ],
      },
      {
        id: 'machine-learning',
        name: 'Machine Learning',
        folder: 'machine-learning',
        notes: [
          { title: 'Neural Networks', href: 'notes/machine-learning/neural-networks.html', format: 'HTML', updated: '2026-08', description: 'Universal approximation, backpropagation, vanishing gradients, initialisation.' },
          { title: 'Optimization Methods', href: 'notes/machine-learning/optimization.html', format: 'HTML', updated: '2026-08', description: 'Convexity, gradient descent rates, Newton’s method, SGD, duality and KKT.' },
          { title: 'Probabilistic Models', href: 'notes/machine-learning/probabilistic-models.html', format: 'HTML', updated: '2026-08', description: 'Maximum likelihood, Bayesian inference, the EM algorithm, variational inference, MCMC.' },
        ],
      },
    ],
  },
  {
    id: 'computing',
    name: 'Computing',
    description: 'What can be computed, and how to reason about programs and systems.',
    subjects: [
      {
        id: 'theoretical-computer-science',
        name: 'Theoretical Computer Science',
        folder: 'computer-programming',
        notes: [
          { title: 'Computability and Formal Languages', href: 'notes/computer-programming/computability.html', format: 'HTML', updated: '2026-08', description: 'Automata, Turing machines, the Halting Problem, P versus NP.' },
          { title: 'Type Theory and Functional Programming', href: 'notes/computer-programming/type-theory.html', format: 'HTML', updated: '2026-08', description: 'The lambda calculus, type safety, strong normalisation, Curry–Howard.' },
          { title: 'Distributed Systems and Concurrency', href: 'notes/computer-programming/distributed-systems.html', format: 'HTML', updated: '2026-08', description: 'Logical and vector clocks, FLP, the CAP theorem, Byzantine fault tolerance.' },
        ],
      },
    ],
  },
];
