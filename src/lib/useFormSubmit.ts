import { useState, type FormEvent } from 'react';

/**
 * Client-side form handling. There is no backend yet, so on submit we run
 * native validation and show an honest confirmation state.
 * TODO: POST to the real endpoint (CRM / safety inbox) once it exists.
 */
export function useFormSubmit() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    form.reset();
  };

  return { submitted, reset: () => setSubmitted(false), onSubmit };
}
