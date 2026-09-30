import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({ ease: 'power3.out', duration: 1 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Custom eases shared across the site so motion feels like one system. */
export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
  inOut: 'power4.inOut',
};

export { gsap, ScrollTrigger, SplitText };
