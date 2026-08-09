import { useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "../utils";

export interface FieldProps {
  /** Uppercase label above the control. */
  label: string;
  /** Render a clay asterisk after the label and set `required` on the control. */
  required?: boolean;
  /** Error message. Any non-empty value flips the control into its error skin. */
  error?: string;
  /** Render a textarea instead of a single-line input. */
  multiline?: boolean;
  /** Span both columns inside `Form`'s two-up grid. */
  wide?: boolean;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/**
 * Labelled form control with the system's error state. Reads as a stacked
 * label / control / message triple; the message reserves its line so the
 * layout does not jump when validation fires.
 */
export function Field({
  label,
  required,
  error,
  multiline,
  wide,
  className,
  inputProps,
}: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  const shared = {
    id,
    required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errId : undefined,
    ...inputProps,
  };

  return (
    <div
      className={cx("spz-field", wide && "spz-field--wide", className)}
      data-error={error ? "true" : undefined}
    >
      <label className="spz-field-label" htmlFor={id}>
        {label}
        {required && <span className="spz-field-req">*</span>}
      </label>
      {multiline ? <textarea {...shared} /> : <input {...shared} />}
      <span className="spz-field-err" id={errId}>
        {error}
      </span>
    </div>
  );
}
