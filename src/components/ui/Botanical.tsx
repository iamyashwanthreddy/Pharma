/* Original botanical line drawings (cranberry, Vaccinium macrocarpon).
   Stroke-based so they can be drawn on with [data-draw]. */

export function Sprig({ className = '', draw = false }: { className?: string; draw?: boolean }) {
  const d = draw ? { 'data-draw': '' } : {};
  return (
    <svg className={className} viewBox="0 0 400 520" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {/* main stem */}
        <path {...d} d="M60 510C96 430 128 370 176 318c44-48 92-86 118-150 18-44 22-92 14-150" />
        {/* branches */}
        <path {...d} d="M176 318c-40-6-74-30-92-70" />
        <path {...d} d="M226 262c34 4 66-6 92-32" />
        <path {...d} d="M270 196c-30-16-48-44-50-78" />
        <path {...d} d="M128 380c-34 10-68 4-96-18" />
        {/* leaves — small elliptic, as on the cranberry vine */}
        <path {...d} d="M84 248c-2-22 10-40 32-48 4 22-8 40-32 48Z" />
        <path {...d} d="M318 230c-8-20-2-40 18-52 10 20 4 40-18 52Z" />
        <path {...d} d="M220 118c-14-16-14-38 0-54 14 16 14 38 0 54Z" />
        <path {...d} d="M32 362c6-20 24-32 46-30-6 20-24 32-46 30Z" />
        <path {...d} d="M296 150c16-10 36-10 52 2-16 12-36 12-52-2Z" />
        <path {...d} d="M150 300c-18 4-34-4-42-20 18-4 34 4 42 20Z" />
        {/* pedicels */}
        <path {...d} d="M176 318c2 22 0 40-8 56" />
        <path {...d} d="M226 262c-4 22-2 40 6 58" />
        <path {...d} d="M128 380c8 18 10 36 4 54" />
      </g>
      {/* berries */}
      <g stroke="currentColor" strokeWidth="1.1">
        <circle {...d} cx="166" cy="392" r="20" />
        <circle {...d} cx="234" cy="338" r="17" />
        <circle {...d} cx="130" cy="452" r="15" />
      </g>
      <g fill="currentColor" opacity="0.5">
        <circle cx="159" cy="385" r="3" />
        <circle cx="228" cy="332" r="2.5" />
        <circle cx="125" cy="447" r="2.2" />
      </g>
    </svg>
  );
}

/** Proanthocyanidin-inspired ring motif (schematic, not a chemical diagram). */
export function Rings({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <polygon points="120,40 155,60 155,100 120,120 85,100 85,60" />
        <polygon points="155,100 190,120 190,160 155,180 120,160 120,120" />
        <polygon points="85,100 120,120 120,160 85,180 50,160 50,120" />
        <line x1="120" y1="40" x2="120" y2="14" />
        <line x1="190" y1="160" x2="214" y2="174" />
        <line x1="50" y1="160" x2="26" y2="174" />
      </g>
      <g fill="currentColor">
        <circle cx="120" cy="12" r="4" />
        <circle cx="216" cy="175" r="4" />
        <circle cx="24" cy="175" r="4" />
        <circle cx="120" cy="120" r="3" />
      </g>
    </svg>
  );
}
