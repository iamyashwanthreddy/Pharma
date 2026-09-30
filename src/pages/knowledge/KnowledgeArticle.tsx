import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { NextPage } from '../../components/ui/Blocks';
import { ReadingProgress } from '../../components/ui/Extras';
import { Label, Photo, Todo } from '../../components/ui/primitives';
import { articles, formatDate } from '../../content/site';
import { scrollToEl } from '../../lib/smooth';
import NotFound from '../NotFound';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** C-17 — reusable article layout with author and reviewer credit. */
export default function KnowledgeArticle() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  useMeta(a?.title ?? 'Article', a?.excerpt ?? '');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  if (!a) return <NotFound />;

  const idx = articles.indexOf(a);
  const next = articles[(idx + 1) % articles.length];

  return (
    <div ref={ref} className="page">
      <ReadingProgress />
      <PageHero
        variant="type"
        crumbs={[{ label: 'Knowledge Centre', to: '/knowledge' }, { label: a.topic }]}
        idx="C-17"
        title={a.title}
        intro={a.excerpt}
        meta={[
          { k: 'Written by', v: a.author },
          { k: 'Reviewed by', v: a.reviewer ?? <Todo>Named reviewer</Todo> },
          { k: 'Published', v: formatDate(a.date) },
          { k: 'Reading time', v: `${a.mins} minutes` },
        ]}
      />

      <article className="section article" data-theme="light">
        <div className="container article__grid">
          <aside className="article__side">
            <nav className="article__sticky toc" aria-label="In this article">
              <Label plain>In this article</Label>
              <ol>
                {a.sections.map((s) => (
                  <li key={s.h}>
                    <a
                      href={`#${slugify(s.h)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(slugify(s.h));
                        if (el) scrollToEl(el);
                      }}
                    >
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="article__main">
            <figure className="article__hero media" data-img>
              <Photo name={a.image} sizes="(max-width: 900px) 100vw, 65vw" />
            </figure>
            {a.sections.map((s) => (
              <section key={s.h} id={slugify(s.h)} className="article__section">
                <h2 className="t-h3" data-split>
                  {s.h}
                </h2>
                <div className="article__body" data-stagger>
                  {s.p.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="credit" data-fade>
              <div>
                <span className="t-mono muted">Author</span>
                <strong>{a.author}</strong>
              </div>
              <div>
                <span className="t-mono muted">Medical / scientific review</span>
                {a.reviewer ? <strong>{a.reviewer}</strong> : <Todo>Named reviewer &amp; credentials</Todo>}
              </div>
              <div>
                <span className="t-mono muted">References</span>
                <Todo>Reference list</Todo>
              </div>
            </div>
            <p className="article__disclaimer">
              This article is for general information and is not medical advice. Speak to your doctor or pharmacist about what is
              right for you.
            </p>
          </div>
        </div>
      </article>

      <NextPage to={`/knowledge/${next.slug}`} label={next.title} kicker="Next article" image={next.image} />
    </div>
  );
}
