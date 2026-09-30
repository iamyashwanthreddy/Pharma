import StemField from '../ui/StemField';

/** Interactive botanical interlude between chapters of the home page. */
export default function Interlude() {
  return (
    <section className="interlude" data-theme="dark" aria-label="Rooted in nature, refined by science">
      <div className="interlude__slab slab slab--deep">
        <StemField />
        <div className="interlude__inner">
          <span className="label" data-fade>
            <span className="label__idx">(06)</span>
            <span>Our philosophy</span>
          </span>
          <p className="t-display interlude__title" data-split>
            Rooted in nature. Refined by <span className="serif hl">science.</span>
          </p>
          <p className="interlude__hint t-mono" data-fade aria-hidden="true">
            Move through the field
          </p>
        </div>
      </div>
    </section>
  );
}
