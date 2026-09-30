import type { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, reducedMotion } from './gsap';
import { introDelay } from './intro';
import { useGsap } from './useGsap';

/**
 * Declarative motion for a page. Mark up elements and this hook animates them:
 *
 *   data-split            masked line/word rise when scrolled into view
 *   data-split="load"     same, played as part of the page intro
 *   data-fade[="load"]    fade + rise
 *   data-stagger          direct children fade + rise in sequence
 *   data-img              clip-path wipe + image settle (wrap an <img>)
 *   data-parallax="n"     scrubbed vertical drift, n = yPercent
 *   data-count="n"        count-up (optional data-from, data-decimals)
 *   data-draw             SVG stroke draw, scrubbed
 *   data-delay="s"        extra delay for load/scroll items
 */
export function useReveals(scope: RefObject<HTMLElement>, deps: unknown[] = []) {
  useGsap(
    () => {
      const root = scope.current;
      if (!root) return;
      const base = introDelay();
      if (reducedMotion()) return;

      const delayOf = (el: HTMLElement) => parseFloat(el.dataset.delay || '0');

      // --- Split headings (reference: masked lines, words rise, 0.05 stagger)
      root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        const onLoad = el.dataset.split === 'load';
        SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'split-line',
          onSplit(self) {
            el.classList.add('is-split');
            return gsap.from(self.words, {
              yPercent: 115,
              duration: onLoad ? 1.25 : 1.1,
              ease: 'expo.out',
              stagger: onLoad ? 0.055 : 0.035,
              delay: (onLoad ? base : 0) + delayOf(el),
              scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
      });

      // --- Fades
      root.querySelectorAll<HTMLElement>('[data-fade]').forEach((el) => {
        const onLoad = el.dataset.fade === 'load';
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: (onLoad ? base + 0.35 : 0) + delayOf(el),
            scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
          },
        );
      });

      // --- Staggered groups
      root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.085,
            delay: delayOf(group),
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          },
        );
      });

      // --- Image wipes
      root.querySelectorAll<HTMLElement>('[data-img]').forEach((el) => {
        const img = el.querySelector('img');
        const onLoad = el.dataset.img === 'load';
        const tl = gsap.timeline({
          delay: (onLoad ? base + 0.15 : 0) + delayOf(el),
          scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
        });
        tl.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0% round var(--radius-card))' },
          { clipPath: 'inset(0% 0% 0% 0% round var(--radius-card))', duration: 1.4, ease: 'expo.out' },
        );
        if (img) tl.fromTo(img, { scale: 1.28 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
      });

      // --- Parallax drift
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || '10');
        gsap.fromTo(
          el,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      // --- Count-ups
      root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count || '0');
        const from = parseFloat(el.dataset.from || '0');
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: from };
        el.textContent = from.toFixed(dec);
        gsap.to(obj, {
          v: to,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(dec);
          },
        });
      });

      // --- SVG stroke draw
      root.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: path.closest('[data-draw-trigger]') || path,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 1,
            },
          },
        );
      });

      // Recalculate trigger positions as lazy images settle
      let t: number | undefined;
      const refresh = () => {
        window.clearTimeout(t);
        t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      };
      const imgs = Array.from(root.querySelectorAll('img')).filter((i) => !i.complete);
      imgs.forEach((i) => i.addEventListener('load', refresh, { once: true }));
      return () => {
        window.clearTimeout(t);
        imgs.forEach((i) => i.removeEventListener('load', refresh));
      };
    },
    scope,
    deps,
  );
}
