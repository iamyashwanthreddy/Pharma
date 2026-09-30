import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import HoverList from '../../components/ui/HoverList';
import { Filters } from '../../components/ui/Extras';
import { Btn, Label, Marks, Photo } from '../../components/ui/primitives';
import { ArrowRight } from '../../components/ui/Icon';
import { company, formatDate, news } from '../../content/site';

type Cat = 'All' | 'Corporate' | 'Brand' | 'Recognition';

export default function Newsroom() {
  useMeta('Newsroom', 'Press releases, announcements and media coverage from Pharmatoka.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const [cat, setCat] = useState<Cat>('All');
  const [featured, ...rest] = news;
  const list = (cat === 'All' ? rest : news.filter((n) => n.category === cat)).map((n) => ({
    to: `/news/${n.slug}`,
    kicker: formatDate(n.date),
    title: n.title,
    meta: n.category,
    image: n.image,
  }));

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Newsroom' }]}
        idx="C-13"
        title={
          <>
            News<span className="serif hl">room.</span>
          </>
        }
        intro="Press releases, announcements and coverage from Pharmatoka."
        meta={[
          { k: 'Media enquiries', v: <a href={`mailto:${company.emails.media}`}>{company.emails.media}</a> },
          { k: 'Resources', v: <Link to="/news/media-kit">Media Kit →</Link> },
        ]}
      />

      <section className="section" data-theme="light">
        <div className="container">
          <Label idx="01" fade>
            Featured
          </Label>
          <Link to={`/news/${featured.slug}`} className="feature" data-fade>
            <div className="feature__media media">
              <Photo name={featured.image} sizes="(max-width: 900px) 100vw, 60vw" />
            </div>
            <div className="feature__text">
              <span className="t-mono muted">
                {formatDate(featured.date)} · {featured.category}
              </span>
              <h2 className="t-h2">{featured.title}</h2>
              <p className="soft">{featured.excerpt}</p>
              <span className="feature__cta">
                Read the release <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container">
          <div className="list-head">
            <Label idx="02">All releases</Label>
            <Filters<Cat> label="Filter by category" options={['All', 'Corporate', 'Brand', 'Recognition']} value={cat} onChange={setCat} />
          </div>
          <HoverList key={cat} rows={list} size="md" />
          {list.length === 0 && <p className="soft empty">No releases in this category yet.</p>}
        </div>
      </section>

      <section className="section section--tight" data-theme="dark">
        <div className="slab slab--dark grain mk-band">
          <Marks />
          <div className="container mk-band__inner">
            <div>
              <Label>For journalists</Label>
              <h2 className="t-h2" data-split>
                Logos, boilerplate <span className="serif hl">&amp; contacts.</span>
              </h2>
            </div>
            <Btn to="/news/media-kit" variant="light">
              Open the Media Kit
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
