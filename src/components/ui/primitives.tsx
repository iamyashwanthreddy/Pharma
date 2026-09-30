import type { ReactNode, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Icon';
import { images, src, srcSet } from '../../content/images';

/* ---------- Photo ---------- */
type PhotoProps = {
  name: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  alt?: string;
  style?: CSSProperties;
};
export function Photo({ name, className, sizes = '(max-width: 760px) 100vw, 50vw', eager, alt, style }: PhotoProps) {
  const meta = (images as Record<string, { alt: string; w: number; h: number }>)[name];
  return (
    <img
      src={src(name)}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={meta?.w}
      height={meta?.h}
      alt={alt ?? meta?.alt ?? ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
      {...(eager ? { fetchpriority: 'high' } : {})}
    />
  );
}

/* ---------- Button ---------- */
type BtnProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: 'solid' | 'light' | 'ghost';
  size?: 'md' | 'sm';
  external?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
};
export function Btn({ to, href, children, variant = 'solid', size = 'md', external, type = 'button', className = '', onClick }: BtnProps) {
  const cls = `btn ${variant !== 'solid' ? `btn--${variant}` : ''} ${size === 'sm' ? 'btn--sm' : ''} ${className}`;
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {variant !== 'ghost' && (
        <span className="btn__icon">
          <Arrow />
        </span>
      )}
      {variant === 'ghost' && <Arrow className="btn__ghost-icon" />}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} data-magnetic>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} data-magnetic {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick} data-magnetic>
      {inner}
    </button>
  );
}

/* ---------- Underline link ---------- */
export function ULink({ to, href, children, external }: { to?: string; href?: string; children: ReactNode; external?: boolean }) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  if (to)
    return (
      <Link to={to} className="ulink">
        {children}
        <Arrow />
      </Link>
    );
  return (
    <a href={href} className="ulink" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      <Arrow />
    </a>
  );
}

/* ---------- Section label ---------- */
export function Label({ idx, children, plain, className = '', fade }: { idx?: string; children: ReactNode; plain?: boolean; className?: string; fade?: boolean | 'load' }) {
  return (
    <span
      className={`label ${plain ? 'label--plain' : ''} ${className}`}
      {...(fade ? { 'data-fade': fade === 'load' ? 'load' : '' } : {})}
    >
      {idx && <span className="label__idx">({idx})</span>}
      <span>{children}</span>
    </span>
  );
}

/* ---------- Registration marks ---------- */
export const Marks = () => (
  <div className="marks" aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
  </div>
);

/* ---------- TODO marker ---------- */
export const Todo = ({ children }: { children?: ReactNode }) => (
  <span className="todo" title="Content awaiting confirmation from Pharmatoka">
    <span aria-hidden="true">◌</span> {children ?? 'To be confirmed'}
  </span>
);

/* ---------- Wordmark (extracted from the supplied logo) ---------- */
export function Wordmark({ tone = 'aubergine', className = '' }: { tone?: 'white' | 'aubergine'; className?: string }) {
  return (
    <img
      src={`/brand/wordmark-${tone}.png`}
      width={178}
      height={28}
      alt="Pharmatoka"
      className={`wordmark ${className}`}
      decoding="async"
    />
  );
}
