import { useRef } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import PageHero from '../components/ui/PageHero';
import { CtaBand, Heading, Statement } from '../components/ui/Blocks';
import { Label, Photo, Todo } from '../components/ui/primitives';

const pillars = [
  {
    n: '01',
    t: 'Responsible sourcing',
    b: 'Our flagship product starts with a single, named botanical — the American cranberry — used as 100% concentrated fruit-juice extract.',
    todo: 'Sourcing standards & supplier commitments',
    image: 'cranberry-bog',
  },
  {
    n: '02',
    t: 'Clean formulation',
    b: 'ellura is vegan, gluten-free, non-GMO and sugar-free — formulations with nothing that doesn’t need to be there.',
    image: 'capsules-sprig',
  },
  {
    n: '03',
    t: 'Community programmes',
    b: 'Programmes in India focused on health awareness will be shared here as they are launched.',
    todo: 'Programme partners, scope & reporting',
    image: 'leaf-shadow-2',
  },
];

export default function Sustainability() {
  useMeta('Sustainability & CSR', 'Responsible sourcing and community programmes at Pharmatoka.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="leaf-shadow"
        crumbs={[{ label: 'Sustainability & CSR' }]}
        idx="C-24"
        title={
          <>
            Responsible, <span className="serif hl">by nature.</span>
          </>
        }
        intro="A botanical company depends on healthy plants and healthy communities. This is where we will report on both."
        meta={[{ k: 'Status', v: 'Phase 2 — programme in development' }]}
      />

      <section className="section" data-theme="light">
        <div className="container about-intro">
          <Label idx="01" fade>
            Our view
          </Label>
          <Statement>
            We would rather publish a few commitments we can measure than many we cannot. Targets and progress will appear here as they are agreed.
          </Statement>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Heading idx="02" label="Focus areas" title="Where we’ll start." />
          <ol className="sus">
            {pillars.map((p, i) => (
              <li key={p.n} className={`sus__item ${i % 2 ? 'sus__item--rev' : ''}`}>
                <div className="sus__media media" data-img>
                  <Photo name={p.image} sizes="(max-width: 900px) 100vw, 45vw" />
                </div>
                <div className="sus__text">
                  <span className="sus__n" data-fade>
                    {p.n}
                  </span>
                  <h3 className="t-h2" data-split>
                    {p.t}
                  </h3>
                  <p className="t-lead soft" data-fade>
                    {p.b}
                  </p>
                  {p.todo && (
                    <div data-fade>
                      <Todo>{p.todo}</Todo>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="sus__targets" data-fade>
            <Label plain>Measurable targets</Label>
            <Todo>Targets, baselines &amp; annual progress report</Todo>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Partner on a <span className="serif hl">community programme.</span>
          </>
        }
        body="We’d like to hear from organisations working on health awareness in India."
        primary={{ to: '/contact', label: 'Get in touch' }}
        image="leaf-dark"
      />
    </div>
  );
}
