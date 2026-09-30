# Pharmatoka — Corporate Website (v2)

The corporate site for **pharmatoka.in**: 24 routes from the sitemap CSV (C-01 to C-24) plus a 404 page.
Pharmatoka is presented as the parent company of **ellura** (established) and **Vondberi** (emerging).

## Stack
- **React 18 + TypeScript + Vite**, the same framework as v1
- **React Router 6**, one route per CSV row, including the `[slug]` and `[role]` templates
- **GSAP 3.15** with ScrollTrigger and SplitText (SplitText is free as of GSAP 3.13)
- **Lenis** for smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync
- No CSS framework and no icon library. Styles live in `src/styles/`; icons are hand-drawn SVGs in `components/ui/Icon.tsx`

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve the build
```
Deep links need SPA fallback in production. Rewrite unknown paths to `index.html` (Netlify, Vercel, S3 and similar hosts support this).

## Brand system
| Token | Value | Source |
| --- | --- | --- |
| Aubergine (primary) | `#51244B` | Sampled from the supplied logo PNG |
| Wordmark | `public/brand/wordmark-{white,aubergine}.png` | Extracted pixel by pixel from the supplied logo (transparent) |
| Typeface | **Open Sans** | Matches the logo wordmark |
| Accent serif | Instrument Serif (italic) | Editorial emphasis |
| Annotation | IBM Plex Mono | Scientific labels, figure captions, coordinates |
| Accents | Blush `#F2B5C9`, Cranberry `#B3234C`, Sage `#A8BBA2` | Used sparingly |

Every token is defined in `src/styles/tokens.css`.

## Structure
```
src/
  content/     site.ts (all copy and data) · images.ts (photo library, alt text)
  lib/         gsap, smooth (Lenis), useGsap (scoped context), useReveals (declarative motion),
               intro (loader/curtain timing), useMeta, useFormSubmit
  components/
    layout/    Header (theme-aware, mega menu, mobile menu) · Footer · Loader · StickyBox · Layout (route curtain)
    home/      Hero · Routes · Manifesto · BrandStack · Numbers · FieldToCapsule · Interlude · Presence · Stories
    ui/        PageHero · HoverList · Accordion · Blocks (CtaBand, NextPage, SubNav, Heading, Statement)
               Extras (HTimeline, Clock, Marquee, Spec, Filters, CopyButton) · Form · StemField · Botanical
  pages/       one file per CSV page
  styles/      tokens · base · layout · components · home · pages
```

### Declarative motion
`useReveals(ref)` animates any element marked with these attributes:
`data-split` (masked word rise), `data-fade`, `data-stagger`, `data-img` (clip-path wipe), `data-parallax`, `data-count` and `data-draw`.
Append `="load"` to play an element as part of the page intro.
All motion runs inside a `gsap.context` and is reverted on unmount.
Under `prefers-reduced-motion`, the loader, curtain and Lenis are disabled, content is never hidden, and pinned sections fall back to stacked layouts.

## Content integrity
See **CONTENT-SOURCES.md**. Anything unverified renders with a visible dashed "To be confirmed" marker (`<Todo>`), so it can't be mistaken for fact.
