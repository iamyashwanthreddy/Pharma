import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import HoverList from '../../components/ui/HoverList';
import { CopyButton } from '../../components/ui/Extras';
import { Label, Photo, ULink } from '../../components/ui/primitives';
import { company, formatDate, news } from '../../content/site';
import NotFound from '../NotFound';

/** C-14 — reusable press release layout. */
export default function PressRelease() {
  const { slug } = useParams();
  const item = news.find((n) => n.slug === slug);
  useMeta(item?.title ?? 'Press release', item?.excerpt ?? '');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  if (!item) return <NotFound />;

  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Newsroom', to: '/news' }, { label: item.category }]}
        idx="C-14"
        title={item.title}
        meta={[
          { k: 'Published', v: formatDate(item.date) },
          { k: 'Category', v: item.category },
          { k: 'Media contact', v: <a href={`mailto:${company.emails.media}`}>{company.emails.media}</a> },
        ]}
      />

      <article className="section article" data-theme="light">
        <div className="container article__grid">
          <aside className="article__side">
            <div className="article__sticky">
              <Label plain>Share</Label>
              <CopyButton text={typeof window !== 'undefined' ? window.location.href : ''} label="Copy link" />
              <ULink to="/news">All news</ULink>
            </div>
          </aside>
          <div className="article__main">
            <figure className="article__hero media" data-img>
              <Photo name={item.image} sizes="(max-width: 900px) 100vw, 65vw" />
            </figure>
            <p className="t-lead article__lede" data-fade>
              {item.excerpt}
            </p>
            <div className="article__body" data-stagger>
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {item.external && (
              <p className="article__source">
                Source: <ULink href={item.external} external>original announcement</ULink>
              </p>
            )}
            <div className="boiler" data-fade>
              <span className="t-mono">About Pharmatoka</span>
              <p>{company.boilerplate}</p>
              <span className="t-mono">Media contact</span>
              <p>
                <a href={`mailto:${company.emails.media}`}>{company.emails.media}</a>
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <Label idx="→">More news</Label>
          <div style={{ height: '1.5rem' }} />
          <HoverList
            size="md"
            rows={related.map((n) => ({ to: `/news/${n.slug}`, kicker: formatDate(n.date), title: n.title, meta: n.category, image: n.image }))}
          />
        </div>
      </section>
    </div>
  );
}
