import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Label, Marks, Photo, Todo, ULink } from '../../components/ui/primitives';
import { Rings } from '../../components/ui/Botanical';
import { scienceNav } from '../about/sections';

export default function Research() {
  useMeta('Research & Evidence', 'A public summary of the research behind the Pharmatoka portfolio: A-type PACs, DMAC/A2 measurement and clinical research on ellura.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Science & Quality', to: '/science' }, { label: 'Research & Evidence' }]}
        idx="C-09"
        title={
          <>
            Research &amp; <span className="serif hl">evidence.</span>
          </>
        }
        intro="A plain-language summary of the science behind our portfolio, written for everyone. It describes research — it does not make claims about treating any disease."
      />
      <SubNav items={scienceNav} label="Science section" />

      {/* 01 — the compound */}
      <section className="section" data-theme="light">
        <div className="container rs-compound">
          <div className="rs-compound__diagram" aria-hidden="true">
            <Rings className="rs-compound__rings" />
            <span className="t-mono rs-compound__cap">Schematic — A-type proanthocyanidin linkage</span>
          </div>
          <div className="prose">
            <Label idx="01" fade>
              The active compound
            </Label>
            <h2 className="t-h2" data-split>
              A-type PACs: the compound, <span className="serif berry">not just the fruit.</span>
            </h2>
            <p className="t-lead" data-fade>
              Proanthocyanidins (PACs) are naturally occurring plant compounds. The American cranberry, <em>Vaccinium macrocarpon</em>, is
              notable for its A-type PACs.
            </p>
            <p data-fade>
              Cranberry A-type PACs have been studied for their ability to reduce the adherence of certain bacteria to the lining of
              the urinary tract. ellura is standardised to 36 mg of soluble, bioactive A-type PACs per capsule, from 100% concentrated
              cranberry fruit-juice extract.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — measurement */}
      <section className="rs-measure" data-theme="dark">
        <div className="slab slab--dark grain rs-measure__slab">
          <Marks />
          <div className="container rs-measure__inner">
            <div>
              <Label idx="02" fade>
                Measurement
              </Label>
              <h2 className="t-h1" data-split>
                36 mg, measured <span className="serif hl">the rigorous way.</span>
              </h2>
            </div>
            <div className="rs-measure__body">
              <p className="t-lead soft" data-fade>
                PAC content is quantified using the DMAC/A2 method. Stating the amount — and how it was measured — is what makes a
                cranberry dose meaningful and comparable.
              </p>
              <div className="rs-measure__figure" data-fade>
                <span className="rs-measure__num">
                  <span data-count="36">36</span>
                  <small>mg</small>
                </span>
                <span className="t-mono">Soluble, bioactive A-type PACs · per capsule · DMAC/A2</span>
              </div>
            </div>
          </div>
          <div className="rs-measure__img media" data-img>
            <Photo name="lab-wells" sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      {/* 03 — clinical research & recognition */}
      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="03" label="Clinical research" title="Studied in people, recognised by peers." />
          <div className="rs-grid" data-stagger>
            <article className="rs-card">
              <span className="rs-card__big" data-count="7">
                7
              </span>
              <h3 className="t-h4">Clinical trials on ellura</h3>
              <p className="soft">
                Pharmatoka has consistently funded clinical research on its key formulation. By 2018, seven clinical trials had been
                conducted on ellura.
              </p>
              <Todo>Full publication list &amp; references</Todo>
            </article>
            <article className="rs-card">
              <span className="rs-card__big">ABC</span>
              <h3 className="t-h4">2017 Varro E. Tyler Award</h3>
              <p className="soft">
                The American Botanical Council presented Pharmatoka with its 2017 Varro E. Tyler Commercial Investment in
                Phytomedicinal Research Award, at its ceremony on 8 March 2018.
              </p>
              <ULink href="https://www.globenewswire.com/news-release/2018/03/01/1409517/0/en/Pharmatoka-to-Receive-ABC-Varro-E-Tyler-Award-for-Excellence-in-Phytomedicinal-Research.html" external>
                Read the announcement
              </ULink>
            </article>
            <article className="rs-card">
              <span className="rs-card__big">
                20<small>+</small>
              </span>
              <h3 className="t-h4">Years of cranberry research</h3>
              <p className="soft">
                Development of Pharmatoka’s cranberry fruit-juice extract began in France in 2004; ellura followed in 2006.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container rs-note" data-fade>
          <span className="t-mono">For healthcare professionals</span>
          <p className="t-lead">
            Full study references and scientific information are available on request from our medical team.
          </p>
          <ULink to="/contact">Contact the medical team</ULink>
        </div>
      </section>

      <NextPage to="/science/advisory-board" label="Advisory Board" image="lab-scientist" />
    </div>
  );
}
