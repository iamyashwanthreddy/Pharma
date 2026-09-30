import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import { useFormSubmit } from '../../lib/useFormSubmit';
import PageHero from '../../components/ui/PageHero';
import { NextPage } from '../../components/ui/Blocks';
import { Field, FormShell } from '../../components/ui/Form';
import { Label, Todo } from '../../components/ui/primitives';
import { company, roles } from '../../content/site';
import NotFound from '../NotFound';

/** C-20 — reusable job description layout. */
export default function JobOpening() {
  const { role } = useParams();
  const job = roles.find((r) => r.slug === role);
  useMeta(job ? `${job.title} — Careers` : 'Careers', job?.summary ?? '');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const { submitted, onSubmit, reset } = useFormSubmit();
  if (!job) return <NotFound />;

  const next = roles[(roles.indexOf(job) + 1) % roles.length];

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Careers', to: '/careers' }, { label: job.title }]}
        idx="C-20"
        title={job.title}
        intro={job.summary}
        meta={[
          { k: 'Team', v: job.team },
          { k: 'Location', v: job.location },
          { k: 'Type', v: job.type },
          { k: 'Status', v: <Todo>Illustrative listing</Todo> },
        ]}
      />

      <section className="section" data-theme="light">
        <div className="container job">
          <div className="job__main">
            <div className="job__block" data-fade>
              <Label idx="01">What you’ll do</Label>
              <ul className="job__list">
                {job.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="job__block" data-fade>
              <Label idx="02">What you’ll bring</Label>
              <ul className="job__list">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="job__block" data-fade>
              <Label idx="03">Good to know</Label>
              <Todo>Full description, compensation band &amp; location to be confirmed</Todo>
            </div>
          </div>
          <aside className="job__side" data-hide-sticky>
            <div className="job__card">
              <h2 className="t-h3">Apply for this role</h2>
              <FormShell
                onSubmit={onSubmit}
                submitted={submitted}
                reset={reset}
                submitLabel="Send application"
                successTitle="Application received."
                successBody={`Thank you for your interest. If you'd like to add anything, email ${company.emails.careers}.`}
              >
                <Field label="Full name" name="name" required wide autoComplete="name" />
                <Field label="Email" name="email" type="email" required wide autoComplete="email" />
                <Field label="LinkedIn or portfolio" name="link" type="url" wide />
                <Field label="Why this role?" name="note" type="textarea" wide required />
                <p className="form__note field--wide">
                  Please email your CV to <a href={`mailto:${company.emails.careers}`}>{company.emails.careers}</a> quoting “{job.title}”.
                </p>
              </FormShell>
            </div>
          </aside>
        </div>
      </section>

      <NextPage to={`/careers/${next.slug}`} label={next.title} kicker="Another role" image="team-2" />
    </div>
  );
}
