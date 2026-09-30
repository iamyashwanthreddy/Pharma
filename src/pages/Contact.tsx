import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import { useFormSubmit } from '../lib/useFormSubmit';
import PageHero from '../components/ui/PageHero';
import { Heading } from '../components/ui/Blocks';
import { Field, FormShell, Select } from '../components/ui/Form';
import { Todo } from '../components/ui/primitives';
import { ArrowRight, ArrowUpRight } from '../components/ui/Icon';
import { company, ellura, offices } from '../content/site';

const routes = [
  { k: 'Corporate', t: 'General enquiries', v: company.emails.corporate, href: `mailto:${company.emails.corporate}` },
  { k: 'Brands', t: 'ellura', v: ellura.externalLabel, href: ellura.external, external: true },
  { k: 'Brands', t: 'Vondberi', v: 'Use the form below', to: '#contact-form' },
  { k: 'Media', t: 'Press & media', v: company.emails.media, href: `mailto:${company.emails.media}` },
  { k: 'Partners', t: 'Distribution & partnerships', v: 'Partner With Us', to: '/partners' },
  { k: 'Careers', t: 'Working here', v: company.emails.careers, href: `mailto:${company.emails.careers}` },
  { k: 'Safety', t: 'Report a product concern', v: 'Report a Concern', to: '/report-concern', urgent: true },
];

export default function Contact() {
  useMeta('Contact Us', 'Contact Pharmatoka — corporate, brands, media, partners, careers and product safety.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const { submitted, onSubmit, reset } = useFormSubmit();

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Contact Us' }]}
        idx="C-21"
        title={
          <>
            Let’s <span className="serif hl">talk.</span>
          </>
        }
        intro="Choose the right route below and your message will reach the right team first time."
        meta={[
          { k: 'General', v: <a href={`mailto:${company.emails.corporate}`}>{company.emails.corporate}</a> },
          { k: 'Headquarters', v: 'Rueil-Malmaison, France' },
          { k: 'United States', v: 'Atlanta, GA' },
        ]}
      />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="01" label="Routes" title="Who would you like to reach?" align="stack" />
          <ul className="croutes" data-stagger>
            {routes.map((r) => {
              const inner = (
                <>
                  <span className="t-mono muted">{r.k}</span>
                  <span className="croutes__t">{r.t}</span>
                  <span className="croutes__v">
                    {r.v} {r.external ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
                  </span>
                </>
              );
              return (
                <li key={r.t} className={r.urgent ? 'is-urgent' : ''}>
                  {r.to ? (
                    r.to.startsWith('#') ? (
                      <a href={r.to} onClick={(e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        {inner}
                      </a>
                    ) : (
                      <Link to={r.to}>{inner}</Link>
                    )
                  ) : (
                    <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--tight" data-theme="light" id="contact-form" data-hide-sticky>
        <div className="container form-wrap">
          <div className="form-wrap__side">
            <Heading idx="02" label="Write to us" title="Send a message." align="stack" />
            <div className="offices-mini">
              {offices.map((o) => (
                <address key={o.id}>
                  <span className="t-mono muted">{o.role}</span>
                  <strong>{o.entity}</strong>
                  {o.confirmed ? o.lines.map((l) => <span key={l}>{l}</span>) : <Todo>Address</Todo>}
                </address>
              ))}
            </div>
          </div>
          <FormShell
            onSubmit={onSubmit}
            submitted={submitted}
            reset={reset}
            submitLabel="Send message"
            successTitle="Thank you — your message is on its way."
            successBody="We aim to reply to all enquiries promptly. For product safety concerns please use the dedicated form."
            note={
              <>
                Reporting a side effect or quality issue? Please use <Link to="/report-concern">Report a Product Concern</Link>.
              </>
            }
          >
            <Select
              label="Enquiry type"
              name="type"
              required
              wide
              options={['Corporate', 'ellura', 'Vondberi', 'Media', 'Partnerships', 'Careers', 'Healthcare professional', 'Other']}
            />
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Organisation" name="org" autoComplete="organization" />
            <Field label="Message" name="message" type="textarea" required wide />
            <label className="check field--wide">
              <input type="checkbox" required />
              <span>I agree to Pharmatoka using these details to respond to my message.</span>
            </label>
          </FormShell>
        </div>
      </section>
    </div>
  );
}
