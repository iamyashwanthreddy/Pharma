import { useRef, useState } from 'react';
import { ScrollTrigger } from '../../lib/gsap';
import { useGsap } from '../../lib/useGsap';
import { Heading } from '../ui/Blocks';
import { Photo, Todo, ULink } from '../ui/primitives';
import { qualitySteps } from '../../content/site';

/**
 * Sticky split: the image column holds while the steps scroll past; each
 * step wipes its image in over the last (clip-path, CSS-transitioned).
 */
export default function FieldToCapsule() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGsap(() => {
    ref.current!.querySelectorAll<HTMLElement>('.ftc__step').forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  }, ref);

  return (
    <section ref={ref} className="ftc section" data-theme="light">
      <div className="container">
        <Heading
          idx="05"
          label="Science & quality"
          title={
            <>
              From the field <span className="serif berry">to the capsule.</span>
            </>
          }
          intro="A botanical only becomes dependable when the dose is defined. Here is how ellura gets from the American cranberry to a standardised capsule."
        />

        <div className="ftc__grid">
          <div className="ftc__sticky">
            <div className="ftc__stack media">
              {qualitySteps.map((s, i) => (
                <div key={s.n} className={`ftc__img ${i <= active ? 'is-in' : ''} ${i === active ? 'is-active' : ''}`}>
                  <Photo name={s.image} sizes="(max-width: 900px) 100vw, 45vw" />
                </div>
              ))}
              <div className="ftc__hud t-mono" aria-hidden="true">
                <span>Step {qualitySteps[active].n}</span>
                <span>{qualitySteps[active].title}</span>
              </div>
            </div>
          </div>

          <ol className="ftc__steps">
            {qualitySteps.map((s, i) => (
              <li key={s.n} className={`ftc__step ${i === active ? 'is-active' : ''}`}>
                <figure className="ftc__img-m media">
                  <Photo name={s.image} sizes="100vw" />
                </figure>
                <span className="ftc__n">{s.n}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="soft">{s.body}</p>
                  {s.todo && <Todo>{s.todo}</Todo>}
                </div>
              </li>
            ))}
            <li className="ftc__more">
              <ULink to="/science/quality">Quality &amp; manufacturing</ULink>
              <ULink to="/science/research">Research &amp; evidence</ULink>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
