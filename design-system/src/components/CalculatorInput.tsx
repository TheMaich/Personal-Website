import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../utils";

export interface CalculatorInputProps {
  /** Large serif label above the control. */
  label: string;
  /** Optional explanatory line under the label. */
  hint?: ReactNode;
  /** Leading affix chip, e.g. "USD $". */
  prefix?: string;
  /** Trailing affix chip, e.g. ".00" or "%". */
  suffix?: string;
  className?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
}

/**
 * The calculator field used across the Spritz tools: a serif label, a hint
 * line, and a composite input where paper-3 affix chips bracket a transparent
 * control. The whole wrap turns clay on focus-within.
 */
export function CalculatorInput({
  label,
  hint,
  prefix,
  suffix,
  className,
  inputProps,
}: CalculatorInputProps) {
  const id = useId();
  return (
    <div className={cx("spz-calc-group", className)}>
      <label className="spz-calc-label" htmlFor={id}>
        {label}
      </label>
      {hint && <span className="spz-calc-hint">{hint}</span>}
      <div className="spz-calc-input-wrap">
        {prefix && <span className="spz-calc-affix spz-calc-affix--prefix">{prefix}</span>}
        <input
          id={id}
          className="spz-calc-input"
          type="number"
          inputMode="decimal"
          {...inputProps}
        />
        {suffix && <span className="spz-calc-affix spz-calc-affix--suffix">{suffix}</span>}
      </div>
    </div>
  );
}
