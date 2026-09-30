import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Label, Marks, Todo } from '../../components/ui/primitives';
import { Sprig } from '../../components/ui/Botanical';
import { leadership } from '../../content/site';
import { aboutNav } from './sections';

export default function Leadership() {
  useMeta('Leadership Team', 'The founder, partners and India leadership of Pharmatoka.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  const founder = leadership.find((p) => p.group === 'Founder')!;
  const groups = ['Partners', 'India leadership'] as const;

  return (
    <div ref={ref} className="page">
      <PageHero
        crumbs={[{ label: 'About Us', to: '/about' }, { label: 'Leadership' }]}
        idx="C-05"
        title={
          <>
            The people behind <span className="serif hl">Pharmatoka.</span>
          </>
        }
        intro="A founder-led company with a long view on research — and a growing team in India."
        image="team-2"
        caption="Leadership"
      />
      <SubNav items={aboutNav} label="About section" />

      <section className="section" data-theme="light">
        <div className="container founder">
          <div className="founder__plate on-dark" data-img>
            <Marks />
            <Sprig className="founder__sprig" />
            <span className="founder__mono" aria-hidden="true">
              GH
            </span>
            <span className="t-mono founder__cap">Portrait to be supplied</span>
          </div>
          <div className="founder__text">
            <Label idx="01" fade>
              Founder
            </Label>
            <h2 className="t-h1" data-split>
              {founder.name}
            </h2>
            <p className="t-lead soft" data-fade>
              {founder.bio}
            </p>
            <p className="soft" data-fade>
              Pharmatoka’s commitment to funding clinical research on its cranberry formulation was recognised by the American
              Botanical Council in 2018.
            </p>
            <div data-fade>
              <Todo>Current title, portrait &amp; full biography</Todo>
            </div>
          </div>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section key={g} className="section section--tight" data-theme="light">
          <div className="container">
            <Heading
              idx={`0${gi + 2}`}
              label={g}
              title={g === 'Partners' ? 'Partners' : 'India leadership'}
              intro={
                g === 'Partners'
                  ? 'The partners who shape Pharmatoka’s direction.'
                  : 'The team building Pharmatoka’s presence in India.'
              }
            />
            <ul className="people" data-stagger>
              {leadership
                .filter((p) => p.group === g)
                .map((p, i) => (
                  <li key={p.role + i} className="person">
                    <div className="person__img" aria-hidden="true">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="person__txt">
                      <h3 className="t-h4">{p.name ?? 'Name to be announced'}</h3>
                      <p className="t-mono muted">{p.role}</p>
                      <Todo>Profile published with consent</Todo>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <p className="consent-note" data-fade>
            We publish names, photographs and biographies only with each person’s consent.
          </p>
        </div>
      </section>

      <NextPage to="/about/global-presence" label="Global Presence" image="france" />
    </div>
  );
}
