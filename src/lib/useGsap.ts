import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from './gsap';

/**
 * Runs GSAP code inside a scoped gsap.context so every tween, ScrollTrigger
 * and SplitText created in `setup` is reverted when the component unmounts
 * (and safely re-run under React StrictMode).
 */
export function useGsap(
  setup: (self: gsap.Context) => void | (() => void),
  scope: RefObject<Element>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = setup(self);
    }, scope.current);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
