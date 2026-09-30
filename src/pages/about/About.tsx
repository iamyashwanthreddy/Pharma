import { useRef } from 'react';
import { useMeta } from '../../lib/useMeta';
import { useReveals } from '../../lib/useReveals';
import PageHero from '../../components/ui/PageHero';
import { Heading, NextPage, Statement, SubNav } from '../../components/ui/Blocks';
import HoverList from '../../components/ui/HoverList';
import { Spec } from '../../components/ui/Extras';
import { Label, Photo, ULink } from '../../components/ui/primitives';
import { company, nav } from '../../content/site';
import { aboutNav } from './sections';

export default function About() {
  useMeta('About Us', company.description);
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  const subpages = nav.find((n) => n.to === '/about')!.children!;

  return (
    <div ref={ref} className="page">
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        idx="C-02"
        title={
          <>
            A French company, rooted in <span className="serif hl">botanical science.</span>
          </>
        }
        intro="Pharmatoka researches, develops and produces botanical supplements for urogenital health — and is now bringing that work to India."
        image="berry-branch"
        caption="Botanical study"
        meta={[
          { k: 'Research since', v: '2004' },
          { k: 'Headquarters', v: 'Rueil-Malmaison, France' },
          { k: 'US business', v: 'Pharmatoka Inc., Atlanta' },
          { k: 'Brands', v: 'ellura · Vondberi' },
        ]}
      />
      <SubNav items={aboutNav} label="About section" />

      <section className="section" data-theme="light">
        <div className="container about-intro">
          <Label idx="01" fade>
            In brief
          </Label>
          <Statement>
            We believe everyday wellbeing deserves the rigour of medicine and the wisdom of plants — so we define the dose, fund the research, and say plainly what is still being learned.
          </Statement>
        </div>
      </section>

      <section className="section section--tight" data-theme="light">
        <div className="container two-col">
          <div className="two-col__side">
            <Heading idx="02" label="At a glance" title="The company, on one page." align="stack" />
            <div className="about-glance__img media" data-img>
              <Photo name="france" sizes="(max-width: 900px) 100vw, 35vw" />
            </div>
          </div>
          <Spec
            rows={[
              { k: 'Legal entity', v: company.legalFR },
              { k: 'Headquarters', v: '20–22 Avenue de la République, 92500 Rueil-Malmaison, France' },
              { k: 'United States', v: `${company.legalUS} — Atlanta, GA 30309` },
              { k: 'India', v: 'Operations being established' },
              { k: 'Founder', v: company.founder },
              { k: 'Focus', v: 'Botanical supplements for urogenital health' },
              { k: 'Flagship brand', v: 'ellura® — sold as urell® in European markets' },
              { k: 'Emerging brand', v: 'Vondberi' },
              { k: 'Recognition', v: 'American Botanical Council — 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award' },
            ]}
          />
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className="container">
          <Heading idx="03" label="Explore" title="More about Pharmatoka" align="stack" />
          <HoverList
            rows={subpages.map((s, i) => ({
              to: s.to,
              kicker: `0${i + 1}`,
              title: s.label,
              meta: s.desc,
              image: s.image,
            }))}
          />
          <div className="stories__more" data-fade>
            <ULink to="/brands">Our brands</ULink>
            <ULink to="/science">Science &amp; quality</ULink>
          </div>
        </div>
      </section>

      <NextPage to="/about/our-story" label="Our Story" image="cranberry-bog" />
    </div>
  );
}
