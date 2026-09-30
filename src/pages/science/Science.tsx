import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, Statement, SubNav } from '../../components/ui/Blocks';
import HoverList from '../../components/ui/HoverList';
import { Label } from '../../components/ui/primitives';
import { Rings } from '../../components/ui/Botanical';
import { nav, researchPillars } from '../../content/site';
import { scienceNav } from '../about/sections';

export default function Science() {
  useMeta('Science & Quality', 'The science and quality behind the Pharmatoka portfolio: A-type PACs, standardised dosing, clinical research and quality systems.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const subpages = nav.find((n) => n.to === '/science')!.children!;

  return (
    <div ref={ref} className="page">
      <PageHero
        crumbs={[{ label: 'Science & Quality' }]}
        idx="C-08"
        title={
          <>
            Science you <span className="serif hl">can trace.</span>
          </>
        }
        intro="A botanical earns trust when its dose is defined, its source is named and its effects are studied. That is the standard we hold ourselves to."
        image="lab-microscope"
        caption="Research"
        meta={[
          { k: 'Active compound', v: 'A-type PACs' },
          { k: 'Measured by', v: 'DMAC/A2 method' },
          { k: 'Clinical trials on ellura', v: '7 by 2018' },
        ]}
      />
      <SubNav items={scienceNav} label="Science section" />

      <section className="section" data-theme="light">
        <div className="container about-intro">
          <Label idx="01" fade>
            Our approach
          </Label>
          <Statement>
            Plants are variable by nature. Our work is to turn a botanical into something dependable — the same defined dose, capsule after capsule, backed by research in people.
          </Statement>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Heading idx="02" label="Four pillars" title="How we build credibility." />
          <div className="plates" data-stagger>
            {researchPillars.map((p, i) => (
              <article key={p.k} className="plate">
                <div className="plate__top">
                  <span className="t-mono">
                    {String(i + 1).padStart(2, '0')} — {p.k}
                  </span>
                  <Rings className="plate__rings" />
                </div>
                <h3 className="t-h3">{p.title}</h3>
                <p className="soft">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="03" label="Explore" title="Science & quality, in depth" align="stack" />
          <HoverList
            rows={subpages.map((s, i) => ({ to: s.to, kicker: `0${i + 1}`, title: s.label, meta: s.desc, image: s.image }))}
          />
        </div>
      </section>

      <NextPage to="/science/research" label="Research & Evidence" image="lab-microscope" />
    </div>
  );
}
