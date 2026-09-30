import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, footerUtility, company, type NavItem } from '../../content/site';
import { gsap, ScrollTrigger, reducedMotion } from '../../lib/gsap';
import { stopScroll } from '../../lib/smooth';
import { Wordmark } from '../ui/primitives';
import { ArrowRight, Plus } from '../ui/Icon';
import { src } from '../../content/images';

type Mode = 'dark' | 'light';

export default function Header() {
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>('dark');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null); // mega menu key
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number>();

  /* Theme follows the section under the header (reference technique) */
  useEffect(() => {
    const detect = () => {
      const h = ref.current?.offsetHeight ?? 80;
      const stack = document.elementsFromPoint(window.innerWidth / 2, h / 2);
      const hit = stack.find((el) => !el.closest('.hdr, .mega, .curtain, .loader, .sticky-box'));
      const themed = hit?.closest<HTMLElement>('[data-theme]');
      setMode((themed?.dataset.theme as Mode) || 'light');
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        detect();
        const y = self.scroll();
        setScrolled(y > 40);
        setHidden(y > 240 && self.direction === 1);
      },
    });
    const t = window.setTimeout(detect, 60);
    const t2 = window.setTimeout(detect, 900);
    return () => {
      st.kill();
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [location.pathname]);

  /* Close everything on navigation */
  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setHidden(false);
  }, [location.pathname]);

  /* Escape closes menus */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Lock scroll when the mobile menu is open */
  useEffect(() => {
    stopScroll(mobile);
    return () => stopScroll(false);
  }, [mobile]);

  const openMenu = (key: string | null) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const activeMega = nav.find((n) => n.label === open && n.children);
  const effectiveMode: Mode = mobile || activeMega ? 'dark' : mode;

  return (
    <>
      <header
        ref={ref}
        className={`hdr hdr--${effectiveMode} ${hidden && !open && !mobile ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''} ${activeMega ? 'is-mega' : ''}`}
      >
        <div className="hdr__bar">
          <Link to="/" className="hdr__logo" aria-label="Pharmatoka — home">
            <Wordmark tone="white" className="hdr__wm hdr__wm--white" />
            <Wordmark tone="aubergine" className="hdr__wm hdr__wm--aub" />
          </Link>

          <nav className="hdr__nav" aria-label="Main">
            <ul className="hdr__list">
              {nav.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => openMenu(item.children ? item.label : null)}
                  onMouseLeave={scheduleClose}
                >
                  {item.children ? (
                    <button
                      className={`hdr__link ${location.pathname.startsWith(item.to) ? 'is-active' : ''}`}
                      aria-expanded={open === item.label}
                      aria-controls="mega-panel"
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      onFocus={() => openMenu(item.label)}
                    >
                      {item.label}
                      <Plus size={10} className="hdr__plus" />
                    </button>
                  ) : (
                    <NavLink to={item.to} className={({ isActive }) => `hdr__link ${isActive ? 'is-active' : ''}`}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr__actions">
            <Link to="/contact" className="hdr__cta" data-magnetic>
              <span>Contact us</span>
              <i aria-hidden="true" />
            </Link>
            <button
              className={`hdr__burger ${mobile ? 'is-open' : ''}`}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile((m) => !m)}
            >
              <span className="sr-only">{mobile ? 'Close menu' : 'Open menu'}</span>
              <span className="hdr__burger-lines" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="hdr__burger-text" aria-hidden="true">
                {mobile ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MegaPanel item={activeMega} onEnter={() => openMenu(open)} onLeave={scheduleClose} />
      <MobileMenu open={mobile} />
    </>
  );
}

/* ---------------- Mega menu (desktop) ---------------- */
function MegaPanel({ item, onEnter, onLeave }: { item?: NavItem; onEnter: () => void; onLeave: () => void }) {
  const [preview, setPreview] = useState(0);
  useEffect(() => setPreview(0), [item?.label]);
  const children = item?.children ?? [];

  return (
    <div
      id="mega-panel"
      className={`mega ${item ? 'is-open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-hidden={!item}
    >
      <div className="mega__inner">
        <div className="mega__intro">
          <span className="label">{item?.label}</span>
          {item && (
            <Link to={item.to} className="mega__overview" tabIndex={item ? 0 : -1}>
              Overview <ArrowRight />
            </Link>
          )}
        </div>
        <ul className="mega__links">
          {children.map((c, i) => (
            <li key={c.to} onMouseEnter={() => setPreview(i)}>
              <Link to={c.to} className="mega__link" tabIndex={item ? 0 : -1} onFocus={() => setPreview(i)}>
                <span className="mega__n">0{i + 1}</span>
                <span className="mega__t">{c.label}</span>
                <span className="mega__d">{c.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mega__preview" aria-hidden="true">
          {children.map((c, i) => (
            <img key={c.to} src={src(c.image, 800)} alt="" className={i === preview ? 'is-on' : ''} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile menu ---------------- */
function MobileMenu({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !open || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mm__item',
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out', delay: 0.2 },
      );
      gsap.fromTo('.mm__foot', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.5 });
    }, el);
    return () => ctx.revert();
  }, [open]);

  return (
    <div id="mobile-menu" ref={ref} className={`mm ${open ? 'is-open' : ''}`} aria-hidden={!open} data-theme="dark">
      <nav className="mm__nav" aria-label="Mobile">
        <ul>
          <li className="mm__item">
            <Link to="/" tabIndex={open ? 0 : -1}>Home</Link>
          </li>
          {nav.map((item) => (
            <li className="mm__item" key={item.label}>
              {item.children ? (
                <>
                  <button
                    aria-expanded={sub === item.label}
                    onClick={() => setSub(sub === item.label ? null : item.label)}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                    <Plus size={18} className={sub === item.label ? 'is-rot' : ''} />
                  </button>
                  <div className={`mm__sub ${sub === item.label ? 'is-open' : ''}`}>
                    <ul>
                      <li>
                        <Link to={item.to} tabIndex={open && sub === item.label ? 0 : -1}>Overview</Link>
                      </li>
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} tabIndex={open && sub === item.label ? 0 : -1}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link to={item.to} tabIndex={open ? 0 : -1}>{item.label}</Link>
              )}
            </li>
          ))}
          <li className="mm__item">
            <Link to="/careers" tabIndex={open ? 0 : -1}>Careers</Link>
          </li>
          <li className="mm__item">
            <Link to="/contact" tabIndex={open ? 0 : -1}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="mm__foot">
        <div className="mm__utility">
          {footerUtility.map((u) => (
            <Link key={u.to} to={u.to} tabIndex={open ? 0 : -1}>
              {u.label}
            </Link>
          ))}
        </div>
        <a href={`mailto:${company.emails.corporate}`} className="mm__mail" tabIndex={open ? 0 : -1}>
          {company.emails.corporate}
        </a>
      </div>
    </div>
  );
}
