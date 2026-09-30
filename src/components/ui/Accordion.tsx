import { useId, useState, type ReactNode } from 'react';
import { Plus } from './Icon';

export type AccItem = { q: ReactNode; a: ReactNode };

/** Accessible accordion using CSS grid-rows for smooth height animation. */
export default function Accordion({ items, startOpen = -1 }: { items: AccItem[]; startOpen?: number }) {
  const [open, setOpen] = useState(startOpen);
  const uid = useId();
  return (
    <div className="acc" data-stagger>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc__item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="acc__h">
              <button
                id={`${uid}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="acc__n t-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="acc__q">{it.q}</span>
                <span className="acc__icon" aria-hidden="true">
                  <Plus size={14} />
                </span>
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} className="acc__panel">
              <div className="acc__inner">
                <div className="acc__a">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
