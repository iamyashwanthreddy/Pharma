import { useRef } from 'react';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Heading } from '../ui/Blocks';
import { Btn, Photo, Todo } from '../ui/primitives';
import { ellura, vondberi } from '../../content/site';

/**
 * Stacked sticky panels (reference: services). As each panel arrives, the
 * one beneath recedes — scaled, blurred and dimmed.
 */
export default function BrandStack() {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    // Stacking only exists on desktop (panels are static on small screens)
    mm.add('(min-width: 901px)', () => {
    const panels = gsap.utils.toArray<HTMLElement>('.bstack__panel');
    panels.forEach((panel, i) => {
      const prev = panels[i - 1];
      if (!prev) return;
      gsap.to(prev.querySelector('.bstack__card'), {
        scale: 0.9,
        filter: 'blur(4px) brightness(0.72)',
        ease: 'none',
        scrollTrigger: { trigger: panel, start: 'top 85%', end: 'top 15%', scrub: true },
      });
    });
    });
    // Inner image drift inside each card
    gsap.utils.toArray<HTMLElement>('.bstack__media img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.bstack__panel'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }, ref);

  return (
    <section ref={ref} className="bstack section" data-theme="light" id="brands" data-hide-sticky>
      <div className="container">
        <Heading
          idx="03"
          label="The portfolio"
          title={
            <>
              Two brands. One standard <span className="serif berry">of care.</span>
            </>
          }
          intro="An established name in urinary tract health, an emerging brand for everyday wellbeing — and a place for the professionals who recommend them."
        />
      </div>

      <div className="bstack__panels container">
        {/* ellura */}
        <div className="bstack__panel">
          <article className="bstack__card bstack__card--ellura">
            <div className="bstack__media media">
              <Photo name="cranberry-cut" sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="bstack__tag t-mono">Vaccinium macrocarpon</span>
            </div>
            <div className="bstack__body">
              <div className="bstack__top">
                <span className="t-mono">01 — {ellura.status}</span>
                <span className="bstack__mark bstack__mark--ellura">
                  ellura<sup>®</sup>
                </span>
              </div>
              <h3 className="t-h3">{ellura.tagline}</h3>
              <p className="soft">{ellura.summary}</p>
              <dl className="bstack__facts">
                {ellura.facts.slice(0, 4).map((f) => (
                  <div key={f.k}>
                    <dt className="t-mono">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="bstack__actions">
                <Btn href={ellura.external} external size="sm">
                  Visit {ellura.externalLabel}
                </Btn>
                <Btn to="/brands#ellura" variant="ghost" size="sm">
                  In the portfolio
                </Btn>
              </div>
              <p className="bstack__disclaimer">{ellura.disclaimer}</p>
            </div>
          </article>
        </div>

        {/* Vondberi */}
        <div className="bstack__panel">
          <article className="bstack__card bstack__card--vondberi on-dark">
            <div className="bstack__media media">
              <Photo name="leaf-drops" sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="bstack__tag t-mono">Website coming soon</span>
            </div>
            <div className="bstack__body">
              <div className="bstack__top">
                <span className="t-mono">02 — {vondberi.status}</span>
                <span className="bstack__mark bstack__mark--vondberi">Vondberi</span>
              </div>
              <h3 className="t-h3">{vondberi.tagline}</h3>
              <p className="soft">{vondberi.summary}</p>
              <ul className="bstack__soon">
                {vondberi.todos.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                    <Todo>Coming soon</Todo>
                  </li>
                ))}
              </ul>
              <div className="bstack__actions">
                <Btn to="/brands#vondberi" variant="light" size="sm">
                  Learn about Vondberi
                </Btn>
              </div>
            </div>
          </article>
        </div>

        {/* HCP */}
        <div className="bstack__panel">
          <article className="bstack__card bstack__card--hcp on-dark">
            <div className="bstack__media media">
              <Photo name="lab-scientist" sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="bstack__tag t-mono">For healthcare professionals</span>
            </div>
            <div className="bstack__body">
              <div className="bstack__top">
                <span className="t-mono">03 — HCP portal</span>
                <span className="bstack__mark bstack__mark--hcp">For professionals</span>
              </div>
              <h3 className="t-h3">Scientific information for the people who recommend us.</h3>
              <p className="soft">
                A dedicated portal for clinicians and pharmacists is in preparation. Until it opens, explore the research
                behind our portfolio or contact our medical team directly.
              </p>
              <Todo>HCP portal URL &amp; access model</Todo>
              <div className="bstack__actions">
                <Btn to="/science/research" size="sm">
                  Research &amp; evidence
                </Btn>
                <Btn to="/contact" variant="ghost" size="sm">
                  Contact the medical team
                </Btn>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
