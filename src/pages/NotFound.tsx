import { useRef } from 'react';
import { useMeta } from '../lib/useMeta';
import { useReveals } from '../lib/useReveals';
import PageHero from '../components/ui/PageHero';
import { Btn } from '../components/ui/primitives';

export default function NotFound() {
  useMeta('Page not found', 'The page you were looking for could not be found.');
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  return (
    <div ref={ref} className="page">
      <PageHero
        variant="type"
        crumbs={[{ label: '404' }]}
        idx="404"
        title={
          <>
            This specimen <span className="serif hl">is missing.</span>
          </>
        }
        intro="The page you were looking for has moved or never existed."
      >
        <Btn to="/" variant="light">
          Back to home
        </Btn>
        <Btn to="/contact" variant="ghost">
          Contact us
        </Btn>
      </PageHero>
    </div>
  );
}
