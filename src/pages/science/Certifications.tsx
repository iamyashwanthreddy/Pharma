import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { Todo, ULink } from '../../components/ui/primitives';
import { certifications } from '../../content/site';
import { scienceNav } from '../about/sections';

export default function Certifications() {
  useMeta('Certifications & Licences', 'GMP, ISO, FSSAI and other certifications and licences relevant to the Pharmatoka portfolio.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Science & Quality', to: '/science' }, { label: 'Certifications & Licences' }]}
        idx="C-12"
        title={
          <>
            Certifications <span className="serif hl">&amp; licences.</span>
          </>
        }
        intro="The certificates and licences that apply to our products and operations. Reference numbers are shown only once they have been verified."
      />
      <SubNav items={scienceNav} label="Science section" />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="01" label="Register" title="On record." />
          <div className="certs" data-stagger>
            {certifications.map((c, i) => (
              <article key={c.code} className="cert">
                <div className="cert__seal" aria-hidden="true">
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path id={`c${i}`} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                    </defs>
                    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
                    <text fontSize="8.5" letterSpacing="2.4" fill="currentColor" fontFamily="IBM Plex Mono, monospace">
                      <textPath href={`#c${i}`}>PHARMATOKA · QUALITY REGISTER · PHARMATOKA · QUALITY REGISTER ·</textPath>
                    </text>
                  </svg>
                  <span>{c.code}</span>
                </div>
                <div className="cert__body">
                  <span className="t-mono muted">No. {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3">{c.name}</h3>
                  <p className="soft">{c.scope}</p>
                  <div className="cert__ref">
                    <span className="t-mono">Reference</span>
                    {c.ref ? <span>{c.ref}</span> : <Todo>Certificate number &amp; scope</Todo>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="certs__note" data-fade>
            Copies of certificates can be requested by partners and regulators. <ULink to="/contact">Request documentation</ULink>
          </p>
        </div>
      </section>

      <NextPage to="/news" label="Newsroom" image="india" />
    </div>
  );
}
