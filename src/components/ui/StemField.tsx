import { useEffect, useRef } from 'react';
import { reducedMotion } from '../../lib/gsap';

/**
 * A field of cranberry "stems" drawn on canvas. Each stem sways gently and,
 * near the pointer, turns to face it (a botanical reinterpretation of the
 * reference's cursor-reactive separator grid). Only animates while visible.
 */
export default function StemField({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const still = reducedMotion();

    type Stem = { x: number; y: number; a: number; phase: number; len: number; berry: boolean };
    let stems: Stem[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const build = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 700 ? 30 : 36;
      stems = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const jitter = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          stems.push({
            x: x + jitter * 6,
            y: y + jitter * 4,
            a: 0,
            phase: jitter * Math.PI * 2,
            len: 13 + Math.abs(jitter) * 7,
            berry: Math.abs(jitter) > 0.45,
          });
        }
      }
      draw(performance.now());
    };

    const stroke = tone === 'dark' ? 'rgba(248,238,243,0.42)' : 'rgba(81,36,75,0.36)';
    const hot = tone === 'dark' ? '#f2b5c9' : '#b3234c';

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      for (const s of stems) {
        const dx = pointer.x - s.x;
        const dy = pointer.y - s.y;
        const dist = Math.hypot(dx, dy);
        const R = 170;
        const influence = pointer.active ? Math.max(0, 1 - dist / R) : 0;
        const sway = still ? 0 : Math.sin(t * 0.9 + s.phase + s.x * 0.004) * 0.22;
        const target = influence > 0 ? Math.atan2(dy, dx) + Math.PI / 2 : sway;
        // shortest-path lerp between angles
        let diff = target - s.a;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        s.a += diff * (still ? 1 : 0.12);

        const len = s.len * (1 + influence * 0.9);
        const ex = s.x + Math.sin(s.a) * len;
        const ey = s.y - Math.cos(s.a) * len;
        ctx.strokeStyle = influence > 0.05 ? hot : stroke;
        ctx.globalAlpha = 0.5 + influence * 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        if (s.berry || influence > 0.35) {
          ctx.fillStyle = influence > 0.05 ? hot : stroke;
          ctx.beginPath();
          ctx.arc(ex, ey, 1.6 + influence * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !still) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      if (still) draw(performance.now());
    };
    const onLeave = () => {
      pointer.active = false;
      if (still) draw(performance.now());
    };
    const host = canvas.parentElement || canvas;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [tone]);

  return <canvas ref={ref} className={`stemfield ${className}`} aria-hidden="true" />;
}
