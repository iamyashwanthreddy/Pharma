import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Todo } from '../../components/ui/primitives';
import { advisorDisciplines } from '../../content/site';
import { scienceNav } from '../about/sections';

const commitments = [
  { t: 'Consent first', b: 'Advisor names, photographs and biographies are published only with each advisor’s consent.' },
  { t: 'Relevant expertise', b: 'Seats are defined by discipline, so the board covers the questions our portfolio raises.' },
  { t: 'Transparency', b: 'Advisors’ roles and affiliations will be disclosed alongside their profiles.' },
];

export default function AdvisoryBoard() {
  useMeta('Scientific Advisory Board', 'The scientific and medical disciplines represented on Pharmatoka’s Scientific Advisory Board.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        crumbs={[{ label: 'Science & Quality', to: '/science' }, { label: 'Scientific Advisory Board' }]}
        idx="C-10"
        title={
          <>
            Scientific <span className="serif hl">advisory board.</span>
          </>
        }
        intro="Independent scientific and medical perspective on our research, our products and how we talk about them."
        image="lab-scientist"
        caption="Scientific counsel"
      />
      <SubNav items={scienceNav} label="Science section" />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading
            idx="01"
            label="The board"
            title="Five disciplines, one table."
            intro="Advisor profiles will be published here once each advisor has consented to their bio being shared."
          />
          <ol className="seats" data-stagger>
            {advisorDisciplines.map((d, i) => (
              <li key={d.field} className="seat">
                <span className="seat__n t-mono">Seat {String(i + 1).padStart(2, '0')}</span>
                <span className="seat__ring" aria-hidden="true">
                  <span>{d.field.slice(0, 2)}</span>
                </span>
                <h3 className="t-h3">{d.field}</h3>
                <p className="soft">{d.focus}</p>
                <Todo>Advisor name &amp; consented bio</Todo>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container two-col">
          <div className="two-col__side">
            <Heading idx="02" label="Our commitments" title="How the board works." align="stack" />
          </div>
          <ol className="commit" data-stagger>
            {commitments.map((c, i) => (
              <li key={c.t}>
                <span className="t-mono">0{i + 1}</span>
                <div>
                  <h3 className="t-h4">{c.t}</h3>
                  <p className="soft">{c.b}</p>
                </div>
              </li>
            ))}
            <li>
              <span className="t-mono">—</span>
              <Todo>Board charter to be confirmed</Todo>
            </li>
          </ol>
        </div>
      </section>

      <NextPage to="/science/quality" label="Quality & Manufacturing" image="capsule-macro" />
    </div>
  );
}
