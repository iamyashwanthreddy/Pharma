import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { CtaBand, Heading, Statement } from '../../components/ui/Blocks';
import HoverList from '../../components/ui/HoverList';
import { Label, Photo } from '../../components/ui/primitives';
import { company, roles, values } from '../../content/site';

const apply = [
  { n: '01', t: 'Find your role', b: 'Read the description and check it fits your experience and ambitions.' },
  { n: '02', t: 'Apply', b: 'Send your CV and a short note on why the role interests you.' },
  { n: '03', t: 'Conversations', b: 'Shortlisted candidates meet the team — for us to learn about you, and you about us.' },
];

export default function Careers() {
  useMeta('Careers', 'Careers at Pharmatoka India: culture, open roles and how to apply.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="team"
        crumbs={[{ label: 'Careers' }]}
        idx="C-19"
        title={
          <>
            Do careful work <span className="serif hl">that matters.</span>
          </>
        }
        intro="We’re building Pharmatoka’s team in India — people who care about evidence, accuracy and the people our products are for."
      />

      <section className="section" data-theme="light">
        <div className="container about-intro">
          <Label idx="01" fade>
            Culture
          </Label>
          <Statement>
            Small enough that your work is visible, serious enough that the details matter. We value clear thinking, honest communication and respect for the science.
          </Statement>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container culture">
          <div className="culture__media media" data-img>
            <Photo name="team-2" sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <ol className="culture__list" data-stagger>
            {values.map((v) => (
              <li key={v.n}>
                <span className="t-mono">{v.n}</span>
                <div>
                  <h3 className="t-h4">{v.title}</h3>
                  <p className="soft">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" data-theme="light" id="roles">
        <div className="container">
          <Heading idx="02" label="Open roles" title="Current openings." intro="Listings shown are illustrative while hiring plans are confirmed." />
          <HoverList
            rows={roles.map((r) => ({
              to: `/careers/${r.slug}`,
              kicker: r.team,
              title: r.title,
              meta: `${r.location} · ${r.type}`,
              aside: 'Illustrative',
            }))}
          />
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Label idx="03" fade>
            How to apply
          </Label>
          <ol className="steps3" data-stagger>
            {apply.map((s) => (
              <li key={s.n}>
                <span className="steps3__n">{s.n}</span>
                <h3 className="t-h3">{s.t}</h3>
                <p className="soft">{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="soft careers-mail" data-fade>
            Don’t see the right role? Write to <a href={`mailto:${company.emails.careers}`}>{company.emails.careers}</a>.
          </p>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Help bring botanical science <span className="serif hl">to India.</span>
          </>
        }
        primary={{ to: '/careers#roles', label: 'See open roles' }}
        secondary={{ to: '/about', label: 'About Pharmatoka' }}
        image="leaf-dark"
      />
    </div>
  );
}
