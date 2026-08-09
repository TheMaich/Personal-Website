import type { FormHTMLAttributes, ReactNode } from "react";
import { cx } from "../utils";

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "className"> {
  children: ReactNode;
  className?: string;
}

/**
 * Contact-form shell — paper-3 panel that warms to a slow clay glow on hover.
 * Put `Field`s inside a `FormGrid` and actions inside a `FormFoot`.
 */
export function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={cx("spz-form", className)} {...rest}>
      {children}
    </form>
  );
}

/** Two-column field grid; collapses to one column under 640px. */
export function FormGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("spz-form-grid", className)}>{children}</div>;
}

/** Footer row for the submit button plus a small uppercase note. */
export function FormFoot({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("spz-form-foot", className)}>{children}</div>;
}
