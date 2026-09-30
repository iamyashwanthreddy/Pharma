import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, isTouch, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Btn, Marks, Photo } from '../ui/primitives';
import { ArrowDown } from '../ui/Icon';
import { scrollToEl } from '../../lib/smooth';

const WORDS = ['care', 'precision', 'patience', 'purpose'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (reducedMotion()) return;
    // Scroll: the slab recedes like a specimen slide being set down
    const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__slab', { scale: 0.93, borderRadius: '3rem', ease: 'none', scrollTrigger: st });
    gsap.to('.hero__photo', { yPercent: 14, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__content', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: st });
  }, ref);

  // Intro: photo settles from a slow zoom (the text reveals are declarative)
  useGsap(() => {
    if (reducedMotion()) return;
    gsap.fromTo('.hero__photo img', { scale: 1.22 }, { scale: 1.04, duration: 3.2, ease: 'expo.out', delay: 0.2 });
  }, ref);

  // Pointer parallax on the photo (desktop only)
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || isTouch()) return;
    const img = el.querySelector('.hero__photo-inner');
    const xTo = gsap.quickTo(img, 'x', { duration: 1.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(img, 'y', { duration: 1.4, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * -26);
      yTo((e.clientY / window.innerHeight - 0.5) * -18);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <section ref={ref} className="hero" data-theme="dark" aria-label="Introduction">
      <div className="hero__slab slab slab--dark">
        <div className="hero__photo" aria-hidden="true">
          <div className="hero__photo-inner">
            <Photo name="berries-frost" eager sizes="100vw" alt="" />
          </div>
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="grain hero__grain" aria-hidden="true" />
        <Marks />

        <p className="hero__coords t-mono" aria-hidden="true">
          48.877° N · 2.181° E — Rueil-Malmaison, FR
        </p>

        <div className="hero__content">
          <span className="label hero__eyebrow" data-fade="load">
            Parent company of ellura &amp; Vondberi
          </span>

          <h1 className="hero__title t-mega">
            <span className="sr-only">Botanical science, made with care.</span>
            <span aria-hidden="true" data-split="load" className="hero__line">
              Botanical science,
            </span>
            <span aria-hidden="true" className="hero__line hero__line--2">
              <span data-split="load" data-delay="0.12">made with</span>{' '}
              <Rotator words={WORDS} />
            </span>
          </h1>

          <div className="hero__foot">
            <p className="hero__intro t-lead" data-fade="load" data-delay="0.25">
              A French company with more than twenty years of cranberry research — bringing studied, botanical
              supplements to India.
            </p>
            <div className="hero__ctas" data-fade="load" data-delay="0.4">
              <Btn to="/brands" variant="light">
                Explore our brands
              </Btn>
              <Btn to="/about/our-story" variant="ghost">
                Our story
              </Btn>
            </div>
          </div>
        </div>

        <aside className="hero__specimen" data-fade="load" data-delay="0.6" aria-label="ellura at a glance">
          <div className="hero__specimen-img">
            <Photo name="cranberry-cut" sizes="200px" alt="" />
          </div>
          <div className="hero__specimen-txt">
            <span className="t-mono">Fig. 01 — Vaccinium macrocarpon</span>
            <p>
              <strong>36 mg</strong> soluble, bioactive A-type PACs in every ellura capsule.
            </p>
          </div>
        </aside>

        <button
          className="hero__scroll t-mono"
          data-fade="load"
          data-delay="0.7"
          onClick={() => {
            const next = ref.current?.nextElementSibling as HTMLElement | null;
            if (next) scrollToEl(next, -40);
          }}
        >
          <span>Scroll to discover</span>
          <span className="hero__scroll-icon">
            <ArrowDown size={14} />
          </span>
        </button>
      </div>
    </section>
  );
}

/** Rotating italic word, masked and cycling (reference: hero word carousel). */
function Rotator({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);
  const still = reducedMotion();

  // GSAP owns every word's transform: park all but the first below the mask.
  useLayoutEffect(() => {
    if (still || !ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>('.rot__w');
    gsap.set(els, { y: 0, yPercent: (n: number) => (n === 0 ? 0 : 150) });
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2800);
    return () => window.clearInterval(id);
  }, [still, words.length]);

  const started = useRef(false);
  useEffect(() => {
    if (still || !ref.current) return;
    if (!started.current) {
      // first run: words are parked, allow them to be seen from now on
      started.current = true;
      ref.current.dataset.started = '1';
      return;
    }
    const all = ref.current.querySelectorAll<HTMLElement>('.rot__w');
    const next = all[i];
    const prev = all[(i - 1 + words.length) % words.length];
    gsap.to(prev, { yPercent: -150, rotate: -3, duration: 0.9, ease: 'expo.inOut', overwrite: true });
    gsap.fromTo(next, { yPercent: 150, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.inOut', delay: 0.08, overwrite: true });
  }, [i, still, words.length]);

  return (
    <span ref={ref} className="rot serif hl" data-fade="load" data-delay="0.2">
      {/* invisible sizer keeps width to the longest word */}
      <span className="rot__sizer" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}.
      </span>
      {(still ? words.slice(0, 1) : words).map((w, n) => (
        <span key={w} data-i={n} className="rot__w">
          {w}.
        </span>
      ))}
    </span>
  );
}
