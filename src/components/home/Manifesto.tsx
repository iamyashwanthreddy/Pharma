import { useRef } from 'react';
import { gsap, SplitText, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Photo } from '../ui/primitives';

const chapters = [
  {
    k: 'Heritage',
    title: 'Rooted in France, since 2004.',
    text: 'Pharmatoka began developing a cranberry fruit-juice extract for urinary tract health in 2004 — and launched ellura two years later.',
    image: 'cranberry-bog',
    fig: 'Cranberry harvest',
  },
  {
    k: 'Science',
    title: 'A dose defined by science.',
    text: 'Each ellura capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit-juice extract — measured by the DMAC/A2 method.',
    image: 'lab-wells',
    fig: 'Standardised extract',
  },
  {
    k: 'India',
    title: 'Now, arriving in India.',
    text: 'More than twenty years of cranberry research, brought to Indian patients, pharmacists and clinicians — led by ellura, joined by Vondberi.',
    image: 'india',
    fig: 'India operations',
  },
];

/**
 * Pinned, scroll-scrubbed storytelling (reference: "why us" block).
 * Desktop: the slab pins; each chapter's words light up character by
 * character, then the image wipes to the next chapter. Mobile: stacked.
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const texts = gsap.utils.toArray<HTMLElement>('.mf__chapter');
      const imgs = gsap.utils.toArray<HTMLElement>('.mf__img');
      const splits = texts.map((t) => SplitText.create(t.querySelector('.mf__text')!, { type: 'words,chars' }));
      const counter = ref.current!.querySelector('.mf__count-now');

      gsap.set(texts.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
      splits.forEach((s) => gsap.set(s.chars, { opacity: 0.18 }));

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * chapters.length * 1.1}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length * 0.9999));
            if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
            ref.current?.querySelectorAll('.mf__dot').forEach((d, i) => d.classList.toggle('is-on', i <= idx));
          },
        },
      });

      chapters.forEach((_, i) => {
        tl.to(splits[i].chars, { opacity: 1, stagger: 0.012, duration: 0.5 });
        if (i < chapters.length - 1) {
          tl.to(texts[i], { autoAlpha: 0, y: -60, duration: 0.3 }, '+=0.15')
            .to(texts[i + 1], { autoAlpha: 1, y: 0, duration: 0.3 }, '<0.12')
            .to(imgs[i + 1], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45, ease: 'power2.inOut' }, '<-0.12')
            .fromTo(imgs[i + 1].querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 0.6 }, '<');
        } else {
          tl.to({}, { duration: 0.2 });
        }
      });
      tl.fromTo('.mf__bar i', { scaleX: 0 }, { scaleX: 1, duration: tl.duration(), ease: 'none' }, 0);
    });

    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray<HTMLElement>('.mf__chapter').forEach((ch) => {
        const s = SplitText.create(ch.querySelector('.mf__text')!, { type: 'words' });
        gsap.fromTo(
          s.words,
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: ch, start: 'top 75%', end: 'bottom 60%', scrub: true } },
        );
      });
    });
  }, ref);

  return (
    <section ref={ref} className="mf" data-theme="dark" data-hide-sticky aria-label="Our story in three chapters">
      <div className="mf__pin slab slab--deep grain">
        <div className="mf__grid">
          <div className="mf__media">
            {chapters.map((c, i) => (
              <figure key={c.k} className="mf__img media">
                <Photo name={c.image} sizes="(max-width: 900px) 100vw, 45vw" />
                <figcaption className="mf__fig t-mono">
                  <span>Fig. 0{i + 2}</span>
                  <span>{c.fig}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mf__texts">
            <div className="mf__progress" aria-hidden="true">
              <span className="t-mono">
                <span className="mf__count-now">01</span> / 0{chapters.length}
              </span>
              <span className="mf__bar">
                <i />
              </span>
              <span className="mf__dots">
                {chapters.map((c, i) => (
                  <span key={c.k} className={`mf__dot ${i === 0 ? 'is-on' : ''}`}>
                    {c.k}
                  </span>
                ))}
              </span>
            </div>
            {chapters.map((c, i) => (
              <article key={c.k} className="mf__chapter">
                <figure className="mf__img-m media">
                  <Photo name={c.image} sizes="100vw" />
                </figure>
                <span className="label">
                  <span className="label__idx">(0{i + 1})</span>
                  <span>{c.k}</span>
                </span>
                <h2 className="t-h1 mf__title">{c.title}</h2>
                <p className="mf__text t-h3">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
