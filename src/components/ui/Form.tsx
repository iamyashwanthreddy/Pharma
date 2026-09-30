import type { ReactNode } from 'react';
import { Btn } from './primitives';
import { Check } from './Icon';

/** Shared form shell with an honest success state (no backend yet). */
export function FormShell({
  onSubmit,
  submitted,
  reset,
  children,
  submitLabel,
  successTitle,
  successBody,
  note,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitted: boolean;
  reset: () => void;
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successBody: ReactNode;
  note?: ReactNode;
}) {
  if (submitted)
    return (
      <div className="form-done on-dark" role="status" aria-live="polite">
        <span className="form-done__icon">
          <Check size={22} />
        </span>
        <h3 className="t-h3">{successTitle}</h3>
        <p className="soft">{successBody}</p>
        <Btn variant="ghost" onClick={reset}>
          Send another
        </Btn>
      </div>
    );
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {children}
      <div className="form__foot">
        {note && <p className="form__note">{note}</p>}
        <Btn type="submit">{submitLabel}</Btn>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  wide?: boolean;
};
export function Field({ label, name, type = 'text', required, placeholder, autoComplete, wide }: FieldProps) {
  return (
    <label className={`field ${required ? 'field--req' : ''} ${wide ? 'field--wide' : ''}`}>
      <span>{label}</span>
      {type === 'textarea' ? (
        <textarea name={name} required={required} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} />
      )}
    </label>
  );
}

export function Select({ label, name, options, required, wide }: { label: string; name: string; options: string[]; required?: boolean; wide?: boolean }) {
  return (
    <label className={`field ${required ? 'field--req' : ''} ${wide ? 'field--wide' : ''}`}>
      <span>{label}</span>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function Pills({ legend, name, options, required }: { legend: string; name: string; options: string[]; required?: boolean }) {
  return (
    <fieldset className="field field--wide pills-field">
      <legend className={required ? 'req' : ''}>{legend}</legend>
      <div className="radio-pills">
        {options.map((o, i) => (
          <label key={o}>
            <input type="radio" name={name} value={o} required={required && i === 0} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
