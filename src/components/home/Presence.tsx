import { Heading } from '../ui/Blocks';
import { Photo, Todo, ULink } from '../ui/primitives';
import { offices } from '../../content/site';

/** France → United States → India, joined by a route that draws on scroll. */
export default function Presence() {
  return (
    <section className="presence section" data-theme="light" data-draw-trigger>
      <div className="container">
        <Heading
          idx="07"
          label="Global presence"
          title={
            <>
              From Rueil-Malmaison <span className="serif berry">to India.</span>
            </>
          }
          intro="French research, an American home for ellura, and a new chapter in India."
        />

        <div className="presence__route" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className="presence__path-bg" d="M40 90 C 260 -10, 420 -10, 600 60 S 940 130, 1160 40" />
            <path className="presence__path" data-draw d="M40 90 C 260 -10, 420 -10, 600 60 S 940 130, 1160 40" />
          </svg>
        </div>

        <div className="presence__grid" data-stagger>
          {offices.map((o) => (
            <article key={o.id} className="presence__item">
              <div className="presence__media media">
                <Photo name={o.image} sizes="(max-width: 900px) 100vw, 33vw" />
                <span className="presence__code">{o.code}</span>
              </div>
              <div className="presence__meta t-mono">
                <span>{o.role}</span>
                <span>{o.coords}</span>
              </div>
              <h3 className="t-h3">{o.city === o.country ? o.country : `${o.city}, ${o.country}`}</h3>
              <p className="soft">{o.body}</p>
              {!o.confirmed && <Todo>Office address</Todo>}
            </article>
          ))}
        </div>
        <div className="presence__more" data-fade>
          <ULink to="/about/global-presence">Explore our global presence</ULink>
        </div>
      </div>
    </section>
  );
}
