import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './gsap';

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and
 * scroll position stay perfectly in sync. Disabled for reduced motion.
 * Touch devices keep native scrolling (Lenis default).
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (reducedMotion() || lenis) return () => {};
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToEl(el: HTMLElement, offset = -100) {
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

export function stopScroll(stop: boolean) {
  if (!lenis) {
    document.documentElement.style.overflow = stop ? 'hidden' : '';
    return;
  }
  if (stop) lenis.stop();
  else lenis.start();
}
