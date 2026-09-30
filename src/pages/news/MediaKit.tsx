import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading } from '../../components/ui/Blocks';
import { CopyButton } from '../../components/ui/Extras';
import { Btn, Label, Todo } from '../../components/ui/primitives';
import { Download, Mail } from '../../components/ui/Icon';
import { company } from '../../content/site';

const logos = [
  { file: '/brand/pharmatoka-logo.png', name: 'Primary logo', note: 'Square · aubergine · PNG', bg: 'aub', preview: '/brand/pharmatoka-logo.png', square: true },
  { file: '/brand/wordmark-aubergine.png', name: 'Wordmark — aubergine', note: 'Transparent · PNG', bg: 'paper', preview: '/brand/wordmark-aubergine.png' },
  { file: '/brand/wordmark-white.png', name: 'Wordmark — white', note: 'Transparent · PNG', bg: 'aub', preview: '/brand/wordmark-white.png' },
];

const colours = [
  { name: 'Aubergine', hex: '#51244B', note: 'Primary — from the logo', cls: 'sw--aub' },
  { name: 'Deep aubergine', hex: '#22101F', note: 'Dark surfaces', cls: 'sw--deep' },
  { name: 'Paper', hex: '#F6F1EE', note: 'Light surfaces', cls: 'sw--paper' },
  { name: 'Blush', hex: '#F2B5C9', note: 'Highlight on dark', cls: 'sw--blush' },
  { name: 'Cranberry', hex: '#B3234C', note: 'Botanical accent', cls: 'sw--berry' },
];

export default function MediaKit() {
  useMeta('Media Kit', 'Pharmatoka logos, boilerplate, brand colours and media contacts for journalists.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Newsroom', to: '/news' }, { label: 'Media Kit' }]}
        idx="C-15"
        title={
          <>
            Media <span className="serif hl">kit.</span>
          </>
        }
        intro="Everything you need to write about Pharmatoka accurately: logos, the company boilerplate, brand colours and who to contact."
      >
        <Btn href={`mailto:${company.emails.media}`} variant="light">
          {company.emails.media}
        </Btn>
      </PageHero>

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="01" label="Logos" title="Logo files." intro="Please don’t recolour, stretch or add effects to the logo. Leave clear space around it equal to the height of the ‘P’." />
          <div className="logos" data-stagger>
            {logos.map((l) => (
              <article key={l.file} className="logo-card">
                <div className={`logo-card__prev logo-card__prev--${l.bg}`}>
                  <img src={l.preview} alt={l.name} className={l.square ? 'is-square' : ''} />
                </div>
                <div className="logo-card__meta">
                  <div>
                    <h3 className="t-h4">{l.name}</h3>
                    <p className="t-mono muted">{l.note}</p>
                  </div>
                  <a href={l.file} download className="dl-btn" aria-label={`Download ${l.name}`}>
                    <Download size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mk-todo" data-fade>
            <Todo>Vector logo files (SVG / EPS) &amp; brand guidelines PDF</Todo>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container two-col">
          <div className="two-col__side">
            <Heading idx="02" label="Boilerplate" title="About Pharmatoka." align="stack" />
            <CopyButton text={company.boilerplate} label="Copy boilerplate" />
          </div>
          <blockquote className="boilerplate t-lead" data-fade>
            {company.boilerplate}
          </blockquote>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Heading idx="03" label="Colour & type" title="Brand colours." align="stack" />
          <div className="swatches" data-stagger>
            {colours.map((c) => (
              <div key={c.hex} className={`sw ${c.cls}`}>
                <div className="sw__chip" />
                <div className="sw__meta">
                  <strong>{c.name}</strong>
                  <span className="t-mono">{c.hex}</span>
                  <span className="muted">{c.note}</span>
                  <CopyButton text={c.hex} label="Copy hex" />
                </div>
              </div>
            ))}
          </div>
          <div className="type-spec" data-stagger>
            <div>
              <span className="t-mono muted">Primary — matches the wordmark</span>
              <p className="type-spec__sample">Open Sans</p>
            </div>
            <div>
              <span className="t-mono muted">Editorial accent</span>
              <p className="type-spec__sample serif">Instrument Serif</p>
            </div>
            <div>
              <span className="t-mono muted">Annotation</span>
              <p className="type-spec__sample" style={{ fontFamily: 'var(--font-mono)', letterSpacing: 0 }}>
                IBM Plex Mono
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container two-col">
          <div className="two-col__side">
            <Heading idx="04" label="People" title="Spokespeople." align="stack" />
          </div>
          <div className="prose">
            <p>Approved spokesperson photographs and biographies will be available here.</p>
            <Todo>Spokesperson photos &amp; bios (with consent)</Todo>
            <Label plain>Media contact</Label>
            <a href={`mailto:${company.emails.media}`} className="mk-mail">
              <Mail size={18} /> {company.emails.media}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
