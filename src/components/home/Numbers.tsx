import { useRef } from 'react';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Photo } from '../ui/primitives';

const figures = [
  { value: 2004, from: 1980, suffix: '', label: 'Cranberry research begins in France', note: 'Development of the cranberry fruit-juice extract', glyph: 'ruler' },
  { value: 36, from: 0, suffix: 'mg', label: 'Soluble, bioactive A-type PACs', note: 'In every ellura capsule', glyph: 'capsule' },
  { value: 20, from: 0, suffix: '+', label: 'Years of cranberry research', note: 'From Rueil-Malmaison to India', glyph: 'bars' },
  { value: 7, from: 0, suffix: '', label: 'Clinical trials on ellura', note: 'Conducted by 2018', glyph: 'dots' },
  { value: 3, from: 0, suffix: '', label: 'Regions', note: 'France · United States · India', glyph: 'nodes' },
  { value: 2, from: 0, suffix: '', label: 'Brands', note: 'ellura · Vondberi', glyph: 'pair' },
] as const;

/** Small data drawings that visualise each figure (animated via .g-anim). */
function Glyph({ kind }: { kind: (typeof figures)[number]['glyph'] }) {
  const common = { className: 'nums__glyph', viewBox: '0 0 240 90', fill: 'none', 'aria-hidden': true } as const;
  switch (kind) {
    case 'ruler':
      return (
        <svg {...common}>
          {Array.from({ length: 27 }).map((_, i) => (
            <line key={i} className="g-anim" x1={8 + i * 8.6} x2={8 + i * 8.6} y1={i % 5 === 0 ? 46 : 56} y2={70} />
          ))}
          <line x1="8" x2="232" y1="70" y2="70" />
          <circle className="g-hot g-anim" cx={8 + 4 * 8.6} cy="30" r="5" />
          <line className="g-hot" x1={8 + 4 * 8.6} x2={8 + 4 * 8.6} y1="36" y2="70" />
          <text x={8} y={86}>2000</text>
          <text x={196} y={86}>2026</text>
        </svg>
      );
    case 'capsule':
      return (
        <svg {...common}>
          <rect x="30" y="22" width="180" height="46" rx="23" />
          <line x1="120" x2="120" y1="22" y2="68" />
          <clipPath id="capclip">
            <rect x="30" y="22" width="180" height="46" rx="23" />
          </clipPath>
          <g clipPath="url(#capclip)">
            {Array.from({ length: 36 }).map((_, i) => (
              <circle key={i} className="g-hot g-anim" cx={42 + (i % 12) * 14} cy={32 + Math.floor(i / 12) * 13} r="3" />
            ))}
          </g>
        </svg>
      );
    case 'bars':
      return (
        <svg {...common}>
          {Array.from({ length: 22 }).map((_, i) => (
            <rect key={i} className={`g-anim ${i > 19 ? 'g-hot' : ''}`} x={10 + i * 10.2} y={78 - (12 + i * 2.6)} width="4" height={12 + i * 2.6} rx="2" />
          ))}
        </svg>
      );
    case 'dots':
      return (
        <svg {...common}>
          <line x1="20" x2="220" y1="45" y2="45" />
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} className="g-hot g-anim" cx={20 + i * 33.3} cy="45" r="9" />
          ))}
        </svg>
      );
    case 'nodes':
      return (
        <svg {...common}>
          <path d="M30 60 C 80 10, 120 10, 120 45 S 170 80, 210 30" />
          {[
            [30, 60, 'FR'],
            [120, 45, 'US'],
            [210, 30, 'IN'],
          ].map(([x, y, t]) => (
            <g key={t as string} className="g-anim">
              <circle className="g-hot" cx={x as number} cy={y as number} r="7" />
              <text x={(x as number) - 7} y={(y as number) + 24}>
                {t}
              </text>
            </g>
          ))}
        </svg>
      );
    case 'pair':
      return (
        <svg {...common}>
          <circle className="g-anim" cx="95" cy="45" r="34" />
          <circle className="g-anim g-hot-stroke" cx="145" cy="45" r="34" />
        </svg>
      );
  }
}

/**
 * Pinned horizontal track (reference: numbers). Figures count up as each
 * card slides into view (containerAnimation). Vertical list on mobile.
 */
export default function Numbers() {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.nums__card');
    const count = (card: HTMLElement) => {
      const el = card.querySelector<HTMLElement>('[data-num]');
      if (!el || el.dataset.done) return;
      el.dataset.done = '1';
      const o = { v: parseFloat(el.dataset.from || '0') };
      gsap.to(o, { v: parseFloat(el.dataset.num || '0'), duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(o.v))) });
    };
    if (reducedMotion()) return;
    cards.forEach((card) => {
      const el = card.querySelector<HTMLElement>('[data-num]');
      if (el) el.textContent = el.dataset.from || '0';
    });
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const track = ref.current!.querySelector<HTMLElement>('.nums__track')!;
      const dist = () => track.scrollWidth - window.innerWidth + 40;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      cards.forEach((card) => {
        gsap.from(card.querySelectorAll('.nums__value, .nums__label, .nums__note'), {
          yPercent: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 88%', onEnter: () => count(card) },
        });
        gsap.from(card.querySelectorAll('.g-anim'), {
          opacity: 0,
          scale: 0.2,
          transformOrigin: '50% 100%',
          duration: 0.9,
          stagger: 0.025,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 80%' },
        });
      });
      gsap.fromTo('.nums__photo img', { xPercent: -8 }, {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${dist()}`, scrub: true },
      });
    });

    mm.add('(max-width: 899px)', () => {
      cards.forEach((card) => {
        gsap.from(card, { opacity: 0, y: 40, duration: 1, scrollTrigger: { trigger: card, start: 'top 88%', onEnter: () => count(card) } });
      });
    });
  }, ref);

  return (
    <section ref={ref} className="nums" data-theme="dark" data-hide-sticky aria-label="Pharmatoka in numbers">
      <div className="nums__pin slab slab--dark grain">
        <div className="nums__track">
          <div className="nums__intro">
            <span className="label">
              <span className="label__idx">(04)</span>
              <span>In numbers</span>
            </span>
            <h2 className="t-h1">
              Twenty years,
              <br />
              <span className="serif hl">measured.</span>
            </h2>
            <p className="soft">Every figure here is drawn from published company information.</p>
            <div className="nums__photo media">
              <Photo name="berry-branch" sizes="30vw" />
            </div>
          </div>
          {figures.map((f, i) => (
            <article className="nums__card" key={f.label}>
              <span className="t-mono nums__idx">{String(i + 1).padStart(2, '0')}</span>
              <Glyph kind={f.glyph} />
              <p className="nums__value">
                <span data-num={f.value} data-from={f.from}>
                  {f.value}
                </span>
                {f.suffix && <small>{f.suffix}</small>}
              </p>
              <h3 className="nums__label">{f.label}</h3>
              <p className="nums__note t-mono">{f.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
