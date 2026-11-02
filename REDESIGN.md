# Mandala / Oat Design

Implemented on design/mandala-oat-refresh, validated locally before publishing
through the existing GitHub Pages deployment.

## Direction

Preserve the warm cream palette, supplied transparent logos, and approved
watermarked mandala hero. Refine navigation, hierarchy, spacing, and page rhythm
using Oat's semantic foundation and the restrained layouts of listmonk and
Fourth Cross Labs.

## Implementation

- Bundle Oat 1.1.0 CSS locally with its MIT license; no build or CDN requirement.
- Use native details/summary for the More menu, plus keyboard and click handling.
- Keep mobile navigation available when JavaScript is disabled.
- Retain header logos at 192 x 48 desktop and 168 x 42 mobile.
- Keep original art on /art/ and use concise links from the homepage.
- Use one shared theme for all eight pages, with consistent buttons and headings.
- Bundle Lucide 0.468.0 icons locally with their license.
- Keep catalogue filters selected while data loads; expose aria-pressed state.
- Current address: 1/1 Canal Road, Kishanpur #3, Jakhan, Dehradun 248009.
  Supplied by the owner in a gallery video poster. Visiting hours remain unconfirmed.
- Neutral white/slate theme with listmonk's blue accent; the supplied logo retains its gold.
- Oat supplies native typography and button variants. oat-local.css contains tokens
  and accessibility helpers, rather than an imitation component layer.

## References

- https://oat.ink/usage/
- https://oat.ink/customizing/
- https://listmonk.app/
- https://fourthcross.tech/

## Preview

Run python3 -m http.server 4181 from the project root.
Open http://127.0.0.1:4181/ to review the design before publishing.
