/* Hand-drawn 1.4px-stroke icon set — keeps the bundle lean and consistent. */
type P = { className?: string; size?: number };

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const ArrowRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M2 8h11.5M9 3.5 13.5 8 9 12.5" />
  </svg>
);
export const ArrowUpRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12 12 4M5.5 4H12v6.5" />
  </svg>
);
export const ArrowDown = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 2v11.5M3.5 9 8 13.5 12.5 9" />
  </svg>
);
export const Plus = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 2.5v11M2.5 8h11" />
  </svg>
);
export const Close = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);
export const Download = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 2v8.5M4.5 7 8 10.5 11.5 7M2.5 13.5h11" />
  </svg>
);
export const Copy = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
    <path d="M11 5V3.5A1 1 0 0 0 10 2.5H3.5a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1H5" />
  </svg>
);
export const Check = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 8.5 6.5 12 13 4.5" />
  </svg>
);
export const Mail = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
);
