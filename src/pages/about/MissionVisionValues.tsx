import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Label, Photo, Todo } from '../../components/ui/primitives';
import { Sprig } from '../../components/ui/Botanical';
import { values } from '../../content/site';
import { aboutNav } from './sections';

const valueImages = ['lab-microscope', 'lab-wells', 'leaf-drops', 'pharmacist'];

export default function MissionVisionValues() {
  useMeta('Mission, Vision & Values', 'What Pharmatoka stands for: evidence before claims, a dose you can trust, respect for the body, and partnership.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  // Stacked value cards: earlier cards recede as later ones land on top
  useGsap(() => {
    if (reducedMotion()) return;
    const cards = gsap.utils.toArray<HTMLElement>('.vstack__card');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.92 + i * 0.02,
        filter: 'brightness(0.96)',
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top 90%', end: 'top 30%', scrub: true },
      });
    });
  }, ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'About Us', to: '/about' }, { label: 'Mission, Vision & Values' }]}
        idx="C-04"
        title={
          <>
            What we <span className="serif hl">stand for.</span>
          </>
        }
        intro="Credibility is built slowly. These are the commitments that shape how we research, source, make and talk about our products."
      />
      <SubNav items={aboutNav} label="About section" />

      <section className="section" data-theme="light">
        <div className="container mv">
          <article className="mv__plate mv__plate--mission">
            <span className="label">Mission</span>
            <p className="t-h2" data-split>
              To make botanical health products people can trust — <span className="serif berry">defined by science,</span> made
              with care, and described honestly.
            </p>
          </article>
          <article className="mv__plate mv__plate--vision on-dark">
            <Sprig className="mv__sprig" draw />
            <span className="label">Vision</span>
            <p className="t-h2" data-split>
              A world where plant-based health is held to <span className="serif hl">the standard of medicine.</span>
            </p>
          </article>
          <div className="mv__note" data-fade>
            <Todo>Mission &amp; vision wording to be approved</Todo>
          </div>
        </div>
      </section>

      <section className="section vstack" data-theme="light">
        <div className="container">
          <Heading idx="03" label="Our values" title="Four principles we won’t trade away." />
          <div className="vstack__list">
            {values.map((v, i) => (
              <article key={v.n} className={`vstack__card ${i === values.length - 1 ? "on-dark" : ""}`} style={{ top: `calc(var(--header-h) + ${1 + i * 1.6}rem)` }}>
                <div className="vstack__n">{v.n}</div>
                <div className="vstack__body">
                  <Label plain>Value {v.n}</Label>
                  <h3 className="t-h2">{v.title}</h3>
                  <p className="t-lead soft">{v.body}</p>
                </div>
                <div className="vstack__media media">
                  <Photo name={valueImages[i]} sizes="(max-width: 900px) 100vw, 30vw" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NextPage to="/about/leadership" label="Leadership" image="team" />
    </div>
  );
}
