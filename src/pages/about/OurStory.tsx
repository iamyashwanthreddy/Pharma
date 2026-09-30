import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, SubNav } from '../../components/ui/Blocks';
import { HTimeline } from '../../components/ui/Extras';
import { Label, Marks, Photo } from '../../components/ui/primitives';
import { timeline } from '../../content/site';
import { aboutNav } from './sections';

const india = [
  {
    n: '01',
    title: 'A portfolio with a track record',
    body: 'ellura arrives with more than twenty years of cranberry research behind it — and a history of clinical study few botanical products can match.',
  },
  {
    n: '02',
    title: 'Built with Indian professionals',
    body: 'We intend to work alongside Indian clinicians and pharmacists, sharing the science openly so recommendations are informed ones.',
  },
  {
    n: '03',
    title: 'Evidence-led, by default',
    body: 'Everything we say about our products is grounded in what has been studied. Where the evidence is still emerging, we will say so.',
  },
];

export default function OurStory() {
  useMeta('Our Story', 'From cranberry research in France in 2004 to ellura, international recognition and a new chapter in India.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page">
      <PageHero
        variant="full"
        image="cranberry-bog"
        crumbs={[{ label: 'About Us', to: '/about' }, { label: 'Our Story' }]}
        idx="C-03"
        title={
          <>
            A story that began with <span className="serif hl">a cranberry.</span>
          </>
        }
        intro="In 2004, in France, Pharmatoka began developing a cranberry fruit-juice extract for urinary tract health. Two decades later, that work is arriving in India."
      />
      <SubNav items={aboutNav} label="About section" />

      <section className="section" data-theme="light">
        <div className="container story-open">
          <Label idx="01" fade>
            The founding
          </Label>
          <p className="t-h2" data-split>
            One botanical, studied seriously — and <span className="serif berry">standardised</span> so every capsule
            delivers the same defined dose.
          </p>
          <div className="story-open__cols" data-stagger>
            <p className="soft">
              Founded by Gunter Haesaerts, Pharmatoka has a clear focus: research, develop and produce botanical supplements
              for urogenital health — and fund the clinical research to support them.
            </p>
            <p className="soft">
              Its flagship brand, ellura, launched in 2006 — two years after development began — and is sold as urell® in
              European markets. In 2014 the portfolio grew with Prostaril®, a saw palmetto extract.
            </p>
          </div>
        </div>
      </section>

      <HTimeline items={timeline} />

      <section className="section" data-theme="light">
        <div className="container">
          <Heading
            idx="02"
            label="Global heritage"
            title={
              <>
                French research, <span className="serif berry">an American home.</span>
              </>
            }
            intro="Headquartered in Rueil-Malmaison, France, Pharmatoka markets ellura in the United States through Pharmatoka Inc., Atlanta."
          />
          <div className="story-heritage">
            <figure className="story-heritage__a">
              <div className="media" data-img>
                <Photo name="france" sizes="(max-width: 900px) 100vw, 55vw" />
              </div>
              <figcaption className="fig t-mono">
                <span>France</span>
                <span>Headquarters — Pharmatoka SAS</span>
              </figcaption>
            </figure>
            <figure className="story-heritage__b">
              <div className="media" data-img data-delay="0.15">
                <Photo name="atlanta" sizes="(max-width: 900px) 100vw, 35vw" />
              </div>
              <figcaption className="fig t-mono">
                <span>United States</span>
                <span>Pharmatoka Inc., Atlanta</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="india-why" data-theme="dark">
        <div className="slab slab--dark grain india-why__slab">
          <Marks />
          <div className="container india-why__inner">
            <div className="india-why__head">
              <Label idx="03" fade>
                Why India, why now
              </Label>
              <h2 className="t-h1" data-split>
                Twenty years of science, <span className="serif hl">arriving where it can help.</span>
              </h2>
            </div>
            <div className="india-why__media media" data-img>
              <Photo name="india" sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
            <ol className="india-why__list" data-stagger>
              {india.map((p) => (
                <li key={p.n}>
                  <span className="t-mono">{p.n}</span>
                  <h3 className="t-h4">{p.title}</h3>
                  <p className="soft">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <NextPage to="/about/mission-vision-values" label="Mission & Values" image="leaf-shadow" />
    </div>
  );
}
