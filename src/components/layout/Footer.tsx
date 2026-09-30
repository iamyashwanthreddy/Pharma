import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { footerNav, footerUtility, company, offices } from '../../content/site';
import { gsap, reducedMotion } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { scrollToTop } from '../../lib/smooth';
import { Btn, Marks } from '../ui/primitives';
import { ArrowUpRight } from '../ui/Icon';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (reducedMotion()) return;
    // Giant wordmark rises letter by letter as the footer arrives
    gsap.fromTo(
      '.ftr__giant span',
      { yPercent: 105 },
      {
        yPercent: 0,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: { trigger: '.ftr__giant', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
      },
    );
    // The slab eases up from a slightly smaller scale — a "reveal" into the footer
    gsap.fromTo(
      '.ftr__slab',
      { scale: 0.96, borderRadius: '3.5rem' },
      {
        scale: 1,
        borderRadius: 'var(--radius-slab)',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 35%', scrub: true },
      },
    );
  }, ref);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="ftr" data-theme="dark" data-hide-sticky>
      <div className="ftr__slab slab slab--deep grain">
        <Marks />
        <div className="ftr__top">
          <p className="ftr__statement t-h2">
            Botanical science,
            <br />
            made with <span className="serif hl">care</span>.
          </p>
          <div className="ftr__ctas">
            <Btn to="/partners" variant="light">
              Partner with us
            </Btn>
            <Btn to="/contact" variant="ghost">
              Get in touch
            </Btn>
          </div>
        </div>

        <div className="ftr__grid">
          {footerNav.map((col) => (
            <nav key={col.title} className="ftr__col" aria-label={col.title}>
              <span className="label label--plain">{col.title}</span>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="ftr__col ftr__col--offices">
            <span className="label label--plain">Offices</span>
            {offices
              .filter((o) => o.confirmed)
              .map((o) => (
                <address key={o.id}>
                  <strong>{o.entity}</strong>
                  {o.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
              ))}
            <a className="ftr__mail" href={`mailto:${company.emails.corporate}`}>
              {company.emails.corporate}
            </a>
          </div>
        </div>

        <div className="ftr__utility">
          <ul>
            {footerUtility.map((u) => (
              <li key={u.to}>
                <Link to={u.to}>{u.label}</Link>
              </li>
            ))}
            <li>
              <a href="https://ellurautihealth.com/" target="_blank" rel="noopener noreferrer">
                ellura <ArrowUpRight size={11} />
              </a>
            </li>
          </ul>
          <button className="ftr__top-btn" onClick={() => scrollToTop(false)}>
            Back to top ↑
          </button>
        </div>

        <div className="ftr__legal">
          <p>
            © {year} {company.legalFR}. All rights reserved. ellura® and Gikacran® are registered trademarks of {company.legalFR}.
          </p>
          <p>
            The information on this website is for general information only and is not medical advice. Always consult a
            qualified healthcare professional about your health.
          </p>
        </div>

        <div className="ftr__giant" aria-hidden="true">
          {'Pharmatoka'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
          <sup>™</sup>
        </div>
      </div>
    </footer>
  );
}
