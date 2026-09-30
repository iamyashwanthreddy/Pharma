import { useRef } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import { company } from '../content/site';
import Hero from '../components/home/Hero';
import Routes from '../components/home/Routes';
import Manifesto from '../components/home/Manifesto';
import BrandStack from '../components/home/BrandStack';
import Numbers from '../components/home/Numbers';
import FieldToCapsule from '../components/home/FieldToCapsule';
import Interlude from '../components/home/Interlude';
import Presence from '../components/home/Presence';
import Stories from '../components/home/Stories';
import { CtaBand } from '../components/ui/Blocks';

export default function Home() {
  useMeta('Pharmatoka — Botanical science, made with care', company.description);
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);

  return (
    <div ref={ref} className="page page--home">
      <Hero />
      <Routes />
      <Manifesto />
      <BrandStack />
      <Numbers />
      <FieldToCapsule />
      <Interlude />
      <Presence />
      <Stories />
      <CtaBand
        title={
          <>
            Let’s bring botanical science <span className="serif hl">to more people.</span>
          </>
        }
        body="Distributors, pharmacies, hospitals and institutional buyers — we’d like to hear from you."
        primary={{ to: '/partners', label: 'Partner with us' }}
        secondary={{ to: '/careers', label: 'Join the team' }}
      />
    </div>
  );
}
