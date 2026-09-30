import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Filters } from '../../components/ui/Extras';
import { Label, Photo } from '../../components/ui/primitives';
import { ArrowRight } from '../../components/ui/Icon';
import { articles, formatDate } from '../../content/site';

type Topic = 'All' | 'Science' | 'Quality' | 'Wellness';

export default function Knowledge() {
  useMeta('Knowledge Centre', 'Articles from Pharmatoka on wellness, botanical science and quality.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const [topic, setTopic] = useState<Topic>('All');
  const list = topic === 'All' ? articles : articles.filter((a) => a.topic === topic);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: 'Knowledge Centre' }]}
        idx="C-16"
        title={
          <>
            Knowledge <span className="serif hl">centre.</span>
          </>
        }
        intro="Clear, careful writing on botanical science, quality and everyday wellness — credited to its authors and reviewers."
      />

      <section className="section" data-theme="light">
        <div className="container">
          <div className="list-head">
            <Label idx="01">Articles</Label>
            <Filters<Topic> label="Filter by topic" options={['All', 'Science', 'Quality', 'Wellness']} value={topic} onChange={setTopic} />
          </div>
          <div className="kgrid" key={topic}>
            {list.map((a, i) => (
              <Link key={a.slug} to={`/knowledge/${a.slug}`} className={`kcard ${i === 0 ? 'kcard--lead' : ''}`}>
                <div className="kcard__media media">
                  <Photo name={a.image} sizes={i === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 33vw'} />
                  <span className="kcard__topic t-mono">{a.topic}</span>
                </div>
                <div className="kcard__text">
                  <span className="t-mono muted">
                    {formatDate(a.date)} · {a.mins} min read
                  </span>
                  <h2 className={i === 0 ? 't-h2' : 't-h3'}>{a.title}</h2>
                  <p className="soft">{a.excerpt}</p>
                  <span className="kcard__cta">
                    Read article <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
