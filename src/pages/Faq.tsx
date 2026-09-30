import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import { scrollToEl } from '../lib/smooth';
import PageHero from '../components/ui/PageHero';
import Accordion from '../components/ui/Accordion';
import { Label } from '../components/ui/primitives';
import { faqs } from '../content/site';

export default function Faq() {
  useMeta('FAQs', 'Company-level questions about Pharmatoka, its brands and working with us.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const id = (g: string) => 'faq-' + g.toLowerCase().replace(/\s+/g, '-');

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'FAQs' }]}
        idx="C-22"
        title={
          <>
            Frequently asked <span className="serif hl">questions.</span>
          </>
        }
        intro="Company-level answers. For questions about using a product, please ask your pharmacist or doctor, or visit the brand’s website."
      />

      <section className="section" data-theme="light">
        <div className="container two-col faq">
          <nav className="two-col__side faq__nav" aria-label="FAQ topics">
            <Label plain>Topics</Label>
            <ol>
              {faqs.map((g, i) => (
                <li key={g.group}>
                  <a
                    href={`#${id(g.group)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(id(g.group));
                      if (el) scrollToEl(el);
                    }}
                  >
                    <span className="t-mono">0{i + 1}</span> {g.group}
                  </a>
                </li>
              ))}
            </ol>
            <p className="soft faq__more">
              Still curious? <Link to="/contact">Contact us</Link>.
            </p>
          </nav>
          <div className="faq__groups">
            {faqs.map((g) => (
              <div key={g.group} id={id(g.group)} className="faq__group">
                <h2 className="t-h3" data-split>
                  {g.group}
                </h2>
                <Accordion items={g.items.map((f) => ({ q: f.q, a: f.a }))} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
