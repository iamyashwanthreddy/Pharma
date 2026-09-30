import { useRef } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import { useFormSubmit } from '../lib/useFormSubmit';
import PageHero from '../components/ui/PageHero';
import { Heading } from '../components/ui/Blocks';
import { Field, FormShell, Pills, Select } from '../components/ui/Form';
import { Label } from '../components/ui/primitives';
import { company } from '../content/site';

const types = [
  { n: '01', t: 'Side effect', b: 'An unexpected or unwanted reaction after using one of our products.' },
  { n: '02', t: 'Quality', b: 'Something about the product itself seems wrong — appearance, smell, contents.' },
  { n: '03', t: 'Packaging', b: 'Damaged, tampered, mislabelled or missing packaging or information.' },
];

export default function ReportConcern() {
  useMeta('Report a Product Concern', 'Report a side effect, quality or packaging concern about a Pharmatoka product.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const { submitted, onSubmit, reset } = useFormSubmit();

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Report a Product Concern' }]}
        idx="C-23"
        title={
          <>
            Report a product <span className="serif hl">concern.</span>
          </>
        }
        intro="For customers, patients and healthcare professionals. Every report is reviewed by our safety team."
      />

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <div className="urgent" role="note" data-fade>
            <span className="urgent__mark" aria-hidden="true">
              !
            </span>
            <div>
              <strong>If this is a medical emergency, call 112 or go to your nearest hospital now.</strong>
              <p>This form is not monitored around the clock and is not a substitute for medical care.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Label idx="01" fade>
            What can I report?
          </Label>
          <ol className="steps3" data-stagger>
            {types.map((s) => (
              <li key={s.n}>
                <span className="steps3__n">{s.n}</span>
                <h3 className="t-h3">{s.t}</h3>
                <p className="soft">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" data-theme="light" data-hide-sticky>
        <div className="container form-wrap">
          <div className="form-wrap__side">
            <Heading idx="02" label="Your report" title="Tell us what happened." align="stack" />
            <p className="soft">
              You can also email <a href={`mailto:${company.emails.safety}`}>{company.emails.safety}</a>. Please keep the product
              and its packaging if you can.
            </p>
          </div>
          <FormShell
            onSubmit={onSubmit}
            submitted={submitted}
            reset={reset}
            submitLabel="Submit report"
            successTitle="Thank you — your report has been received."
            successBody="Our safety team will review it and may contact you for more information. If symptoms worsen, seek medical care."
            note="Your report is handled confidentially and used for product safety purposes."
          >
            <Pills legend="I am a" name="reporter" options={['Patient / consumer', 'Healthcare professional', 'Pharmacist', 'Other']} required />
            <Pills legend="Type of concern" name="concern" options={['Side effect', 'Quality', 'Packaging']} required />
            <Select label="Product" name="product" required options={['ellura', 'Vondberi', 'Other / not sure']} />
            <Field label="Batch / lot number" name="batch" placeholder="Printed on the pack" />
            <Field label="Date of the event" name="date" type="date" />
            <Field label="Where was it bought?" name="where" />
            <Field label="What happened?" name="description" type="textarea" required wide />
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <label className="check field--wide">
              <input type="checkbox" required />
              <span>I consent to Pharmatoka processing this information, including health information, to investigate my report.</span>
            </label>
          </FormShell>
        </div>
      </section>
    </div>
  );
}
