import { useRef } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import PageHero from '../components/ui/PageHero';
import { CtaBand, Heading } from '../components/ui/Blocks';
import { Marquee } from '../components/ui/Extras';
import { Btn, Label, Marks, Photo, Todo } from '../components/ui/primitives';
import { ellura, vondberi } from '../content/site';

const shared = [
  { n: '01', title: 'A defined dose', body: 'Each product is built around a stated, measured amount of its key botanical compound.' },
  { n: '02', title: 'A named botanical source', body: 'We say exactly which plant is used, and in what form.' },
  { n: '03', title: 'Honest communication', body: 'Claims follow the evidence — and disclaimers are never hidden.' },
];

export default function Brands() {
  useMeta('Our Brands', 'The Pharmatoka portfolio: ellura, the established cranberry supplement for urinary tract health, and Vondberi, an emerging brand.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="berries-dark"
        crumbs={[{ label: 'Our Brands' }]}
        idx="C-07"
        title={
          <>
            Two brands, <span className="serif hl">one discipline.</span>
          </>
        }
        intro="An established name in urinary tract health, and an emerging brand for everyday wellbeing — both built on Pharmatoka’s botanical science."
        meta={[
          { k: 'Established', v: 'ellura® (urell® in Europe)' },
          { k: 'Emerging', v: 'Vondberi' },
          { k: 'Parent company', v: 'Pharmatoka SAS' },
        ]}
      />

      {/* ---------- ellura ---------- */}
      <section id="ellura" className="section brand-ellura" data-theme="light">
        <div className="container brand-ellura__grid">
          <div className="brand-ellura__media">
            <div className="media brand-ellura__img" data-img>
              <Photo name="cranberry-cut" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="brand-ellura__chip on-dark">
              <span className="t-mono">Per capsule</span>
              <strong>36 mg</strong>
              <span>soluble, bioactive A-type PACs</span>
            </div>
          </div>
          <div className="brand-ellura__text">
            <Label idx="01" fade>
              {ellura.status}
            </Label>
            <p className="brand-ellura__mark" data-split>
              ellura<sup>®</sup>
            </p>
            <h2 className="t-h3" data-fade>
              {ellura.tagline}
            </h2>
            <p className="soft" data-fade>
              {ellura.summary} {ellura.heritage}
            </p>
            <dl className="factsheet" data-stagger>
              {ellura.facts.map((f) => (
                <div key={f.k}>
                  <dt className="t-mono">{f.k}</dt>
                  <dd>{f.k === 'Botanical' ? <em>{f.v}</em> : f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="brand-actions" data-fade>
              <Btn href={ellura.external} external>
                Visit {ellura.externalLabel}
              </Btn>
            </div>
            <p className="brand-disclaimer" data-fade>
              {ellura.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <Marquee items={['36 mg A-type PACs', 'Vegan', 'Gluten-free', 'Non-GMO', 'Sugar-free', 'One capsule daily', 'Vaccinium macrocarpon']} />

      {/* ---------- Vondberi ---------- */}
      <section id="vondberi" className="brand-vond" data-theme="dark">
        <div className="slab slab--deep grain brand-vond__slab">
          <Marks />
          <div className="brand-vond__bg" aria-hidden="true">
            <Photo name="leaf-drops" sizes="100vw" alt="" />
          </div>
          <div className="container brand-vond__inner">
            <Label idx="02" fade>
              {vondberi.status}
            </Label>
            <p className="brand-vond__mark" data-split>
              Vondberi
            </p>
            <div className="brand-vond__cols">
              <div>
                <h2 className="t-h3" data-fade>
                  {vondberi.tagline}
                </h2>
                <p className="soft" data-fade>
                  {vondberi.summary}
                </p>
                <div className="brand-actions" data-fade>
                  <Btn to="/contact" variant="light">
                    Ask about Vondberi
                  </Btn>
                </div>
              </div>
              <div className="brand-vond__soon" data-fade>
                <span className="t-mono">What we’ll share at launch</span>
                <ul>
                  {vondberi.todos.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                      <Todo>Coming soon</Todo>
                    </li>
                  ))}
                  <li>
                    <span>Website</span>
                    <Todo>Coming soon</Todo>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Shared standard ---------- */}
      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="03" label="The Pharmatoka standard" title="What every brand we make shares." />
          <ol className="principles" data-stagger>
            {shared.map((s) => (
              <li key={s.n}>
                <span className="principles__n">{s.n}</span>
                <h3 className="t-h3">{s.title}</h3>
                <p className="soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Stock or recommend <span className="serif hl">our brands.</span>
          </>
        }
        body="We work with distributors, pharmacies, hospitals and institutional buyers across India."
        primary={{ to: '/partners', label: 'Partner with us' }}
        secondary={{ to: '/science/research', label: 'See the research' }}
        image="berries-frost"
      />
    </div>
  );
}
