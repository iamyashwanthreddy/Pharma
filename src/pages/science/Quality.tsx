import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Label, Photo, Todo } from '../../components/ui/primitives';
import { qualitySteps } from '../../content/site';
import { scienceNav } from '../about/sections';

const standards = [
  { k: 'Sourcing', b: 'Named botanical source — 100% concentrated cranberry fruit-juice extract from Vaccinium macrocarpon.', todo: 'Supplier qualification process' },
  { k: 'Manufacturing', b: 'Manufacturing site, standards and certifications for the India portfolio will be published here.', todo: 'Manufacturing site & GMP scope' },
  { k: 'Testing', b: 'Active content quantified — PACs by the DMAC/A2 method.', todo: 'Release testing protocol' },
];

export default function Quality() {
  useMeta('Quality & Manufacturing', 'Sourcing, standardisation, formulation and manufacturing standards behind Pharmatoka products.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="capsule-macro"
        crumbs={[{ label: 'Science & Quality', to: '/science' }, { label: 'Quality & Manufacturing' }]}
        idx="C-11"
        title={
          <>
            Quality, from source <span className="serif hl">to capsule.</span>
          </>
        }
        intro="Every step between the cranberry and the capsule is an opportunity to lose consistency. Our process is designed to keep it."
      />
      <SubNav items={scienceNav} label="Science section" />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="01" label="The process" title="Four steps, one defined dose." />
          <ol className="qsteps">
            {qualitySteps.map((s, i) => (
              <li key={s.n} className={`qstep ${i % 2 ? 'qstep--rev' : ''}`}>
                <div className="qstep__media media" data-img>
                  <Photo name={s.image} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="qstep__text">
                  <span className="qstep__n" data-fade>
                    {s.n}
                  </span>
                  <h3 className="t-h2" data-split>
                    {s.title}
                  </h3>
                  <p className="t-lead soft" data-fade>
                    {s.body}
                  </p>
                  {s.todo && (
                    <div data-fade>
                      <Todo>{s.todo}</Todo>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight qstd" data-theme="light">
        <div className="container">
          <Label idx="02" fade>
            Standards
          </Label>
          <div className="qstd__grid" data-stagger>
            {standards.map((s) => (
              <article key={s.k}>
                <h3 className="t-h3">{s.k}</h3>
                <p className="soft">{s.b}</p>
                <Todo>{s.todo}</Todo>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NextPage to="/science/certifications" label="Certifications" image="cleanroom" />
    </div>
  );
}
