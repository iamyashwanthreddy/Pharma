import { useRef, useState } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import { useFormSubmit } from '../lib/useFormSubmit';
import PageHero from '../components/ui/PageHero';
import { Heading } from '../components/ui/Blocks';
import { Field, FormShell, Pills, Select } from '../components/ui/Form';
import { Label, Photo } from '../components/ui/primitives';
import { company } from '../content/site';

const audiences = [
  {
    key: 'Distributors',
    image: 'capsule-line',
    title: 'Regional and national distributors',
    body: 'Bring a studied, botanical portfolio to the pharmacies and institutions you already serve.',
    points: ['A portfolio led by an established brand', 'Clear, compliant product information', 'A partner team that answers quickly'],
  },
  {
    key: 'Pharmacies',
    image: 'pharmacist',
    title: 'Pharmacy chains and independents',
    body: 'Offer customers a cranberry supplement with a defined, measured dose — and the science to explain it.',
    points: ['Scientific information for pharmacists', 'Honest, easy-to-explain positioning', 'Support for in-store education'],
  },
  {
    key: 'Hospitals',
    image: 'lab-scientist',
    title: 'Hospitals and clinics',
    body: 'Work with our medical team on the evidence behind the portfolio and how it is communicated.',
    points: ['Access to study references', 'Direct line to Medical Affairs', 'Evidence-first communication'],
  },
  {
    key: 'Institutional buyers',
    image: 'cleanroom',
    title: 'Institutional and corporate buyers',
    body: 'Procurement conversations grounded in documentation, quality and reliability.',
    points: ['Certification documentation on request', 'Transparent specifications', 'Structured account management'],
  },
];

const steps = [
  { n: '01', t: 'Tell us about you', b: 'Share your organisation, region and how you’d like to work together.' },
  { n: '02', t: 'We review', b: 'Our partnerships team reviews every enquiry against our distribution model.' },
  { n: '03', t: 'We talk', b: 'Where there’s a fit, we set up a conversation to plan next steps.' },
];

export default function Partners() {
  useMeta('Partner With Us', 'Partner with Pharmatoka in India — for distributors, pharmacies, hospitals and institutional buyers.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const [tab, setTab] = useState(0);
  const { submitted, onSubmit, reset } = useFormSubmit();
  const a = audiences[tab];

  return (
    <div ref={ref} className="page">
      <PageHero
        crumbs={[{ label: 'Partner With Us' }]}
        idx="C-18"
        title={
          <>
            Partner with <span className="serif hl">Pharmatoka.</span>
          </>
        }
        intro="We’re building our presence in India with partners who share our standards — distributors, pharmacies, hospitals and institutional buyers."
        image="pharmacist"
        caption="Partnerships"
      />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="01" label="Who we work with" title="Four kinds of partner." />
          <div className="aud">
            <div className="aud__tabs" role="tablist" aria-label="Partner types">
              {audiences.map((x, i) => (
                <button
                  key={x.key}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={tab === i}
                  aria-controls="aud-panel"
                  className={tab === i ? 'is-on' : ''}
                  onClick={() => setTab(i)}
                >
                  <span className="t-mono">0{i + 1}</span>
                  <span>{x.key}</span>
                </button>
              ))}
            </div>
            <div className="aud__panel" id="aud-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
              <div className="aud__media media">
                {audiences.map((x, i) => (
                  <div key={x.key} className={`aud__img ${i === tab ? 'is-on' : ''}`}>
                    <Photo name={x.image} sizes="(max-width: 900px) 100vw, 40vw" />
                  </div>
                ))}
              </div>
              <div className="aud__text" key={a.key}>
                <h3 className="t-h2">{a.title}</h3>
                <p className="t-lead soft">{a.body}</p>
                <ul>
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Label idx="02" fade>
            How it works
          </Label>
          <ol className="steps3" data-stagger>
            {steps.map((s) => (
              <li key={s.n}>
                <span className="steps3__n">{s.n}</span>
                <h3 className="t-h3">{s.t}</h3>
                <p className="soft">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" data-theme="light" id="enquiry" data-hide-sticky>
        <div className="container form-wrap">
          <div className="form-wrap__side">
            <Heading idx="03" label="Enquiry" title="Start a conversation." align="stack" />
            <p className="soft">
              Prefer email? Write to <a href={`mailto:${company.emails.partners}`}>{company.emails.partners}</a>.
            </p>
          </div>
          <FormShell
            onSubmit={onSubmit}
            submitted={submitted}
            reset={reset}
            submitLabel="Send enquiry"
            successTitle="Thank you — we’ve received your enquiry."
            successBody="Our partnerships team reviews every enquiry and will be in touch if there’s a fit."
            note="We use these details only to respond to your enquiry."
          >
            <Pills legend="I represent" name="type" options={audiences.map((x) => x.key)} required />
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Organisation" name="org" required autoComplete="organization" />
            <Field label="Work email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="City" name="city" required />
            <Select label="Area of interest" name="interest" options={['ellura', 'Vondberi', 'Whole portfolio']} />
            <Field label="Tell us about your business" name="message" type="textarea" wide required />
            <label className="check field--wide">
              <input type="checkbox" required />
              <span>I agree to Pharmatoka contacting me about this enquiry.</span>
            </label>
          </FormShell>
        </div>
      </section>
    </div>
  );
}
