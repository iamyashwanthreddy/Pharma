import { Heading } from '../ui/Blocks';
import HoverList from '../ui/HoverList';
import { ULink } from '../ui/primitives';
import { news, articles, formatDate } from '../../content/site';

/** Latest news and knowledge — an editorial list with cursor-following previews. */
export default function Stories() {
  const rows = [
    ...news.slice(0, 3).map((n) => ({
      to: `/news/${n.slug}`,
      kicker: formatDate(n.date),
      title: n.title,
      meta: `Newsroom · ${n.category}`,
      image: n.image,
    })),
    ...articles.slice(0, 2).map((a) => ({
      to: `/knowledge/${a.slug}`,
      kicker: formatDate(a.date),
      title: a.title,
      meta: `Knowledge · ${a.topic}`,
      image: a.image,
    })),
  ];
  return (
    <section className="stories section" data-theme="light">
      <div className="container">
        <Heading idx="08" label="Latest" title={<>News &amp; knowledge</>} align="stack" />
        <HoverList rows={rows} size="md" />
        <div className="stories__more" data-fade>
          <ULink to="/news">All news</ULink>
          <ULink to="/knowledge">Knowledge Centre</ULink>
        </div>
      </div>
    </section>
  );
}
