// Minimal, dependency-free HTML templating.
//
// `html` is a tagged template that escapes every interpolated value unless it
// is an `Html` instance (produced by `html` itself or by `raw`). This keeps
// content data from ever being injected into the page as markup by accident:
// only strings explicitly wrapped in `raw()` are trusted.

export class Html {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
  toString(): string {
    return this.value;
  }
}

type Interpolation = Html | string | number | boolean | null | undefined | Interpolation[];

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

function render(value: Interpolation): string {
  if (value === null || value === undefined || value === false || value === true) return '';
  if (value instanceof Html) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escapeHtml(String(value));
}

export function html(strings: TemplateStringsArray, ...values: Interpolation[]): Html {
  let out = '';
  strings.forEach((chunk, i) => {
    out += chunk;
    if (i < values.length) out += render(values[i]);
  });
  return new Html(out);
}

/** Marks a string of trusted, hand-authored markup as safe to emit verbatim. */
export function raw(markup: string): Html {
  return new Html(markup);
}

export function join(parts: Interpolation[], separator: Html | string = ''): Html {
  const sep = render(separator);
  return new Html(parts.map(render).filter(Boolean).join(sep));
}

// ---------------------------------------------------------------------------
// URLs
// ---------------------------------------------------------------------------

/**
 * Validates an external URL at build time. Only http(s) and mailto are
 * accepted; anything else (javascript:, data:, typos) fails the build.
 */
export function safeUrl(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid URL in content: ${JSON.stringify(url)}`);
  }
  if (!['https:', 'http:', 'mailto:'].includes(parsed.protocol)) {
    throw new Error(`Disallowed URL scheme in content: ${JSON.stringify(url)}`);
  }
  return url;
}

/** Visually hidden hint appended to links that open in a new tab. */
const NEW_TAB_HINT = html`<span class="visually-hidden"> (opens in a new tab)</span>`;

/**
 * An external link that opens in a new tab with `rel="noopener noreferrer"`
 * and an accessible hint. `content` may be text or markup.
 */
export function extLink(
  url: string,
  content: Interpolation,
  opts: { className?: string; arrow?: boolean; label?: string } = {},
): Html {
  const cls = opts.className ? html` class="${opts.className}"` : '';
  const aria = opts.label ? html` aria-label="${opts.label} (opens in a new tab)"` : '';
  const arrow = opts.arrow === false ? '' : html`<span class="ext-arrow" aria-hidden="true">↗</span>`;
  return html`<a href="${safeUrl(url)}"${cls}${aria} target="_blank" rel="noopener noreferrer">${content}${arrow}${opts.label ? '' : NEW_TAB_HINT}</a>`;
}

/** An optional external link: plain text when no URL is known. */
export function maybeLink(url: string | undefined, content: Interpolation, opts: { className?: string; arrow?: boolean } = {}): Html {
  return url ? extLink(url, content, opts) : html`${content}`;
}
