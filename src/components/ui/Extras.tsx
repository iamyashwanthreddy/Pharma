import { useEffect, useRef, useState, type ReactNode } from 'react';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Photo } from './primitives';
import { Check, Copy } from './Icon';

/* ---------- Horizontal pinned timeline ---------- */
export function HTimeline({ items }: { items: { year: string; title: string; body: string; image: string }[] }) {
  const ref = useRef<HTMLElement>(null);
  useGsap(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const track = ref.current!.querySelector<HTMLElement>('.htl__track')!;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to('.htl__progress i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${dist()}`, scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('.htl__item').forEach((item) => {
        gsap.from(item.querySelector('.htl__year'), {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left 80%' },
        });
        const img = item.querySelector('img');
        if (img)
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          });
      });
    });
  }, ref);

  return (
    <section ref={ref} className="htl" data-theme="dark" data-hide-sticky aria-label="Timeline">
      <div className="htl__slab slab slab--deep grain">
        <div className="htl__progress" aria-hidden="true">
          <i />
        </div>
        <ol className="htl__track">
          {items.map((it, i) => (
            <li className="htl__item" key={it.year}>
              <div className="htl__media media">
                <Photo name={it.image} sizes="(max-width: 900px) 100vw, 30vw" />
              </div>
              <div className="htl__text">
                <span className="t-mono htl__n">
                  {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <p className="htl__year">{it.year}</p>
                <h3 className="t-h3">{it.title}</h3>
                <p className="soft">{it.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Live local clock ---------- */
export function Clock({ tz }: { tz: string }) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: false }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 15000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tz]);
  return <time className="clock">{t}</time>;
}

/* ---------- Copy to clipboard ---------- */
export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copybtn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
      <span>{done ? 'Copied' : label}</span>
    </button>
  );
}

/* ---------- Filter pills ---------- */
export function Filters<T extends string>({ options, value, onChange, label }: { options: T[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={o === value} className={o === value ? 'is-on' : ''} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items, dark }: { items: string[]; dark?: boolean }) {
  const group = (
    <div className="marquee__group">
      {items.map((it) => (
        <span key={it}>
          {it}
          <i aria-hidden="true">✳</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${dark ? 'marquee--dark' : ''}`} aria-label={items.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        {group}
        {group}
      </div>
    </div>
  );
}

/* ---------- Spec sheet (definition table) ---------- */
export function Spec({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="spec" data-stagger>
      {rows.map((r) => (
        <div key={r.k} className="spec__row">
          <dt className="t-mono">{r.k}</dt>
          <dd>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Reading progress (articles) ---------- */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div ref={ref} className="readbar" aria-hidden="true" />;
}
