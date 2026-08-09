import type { ReactNode } from "react";
import { cx } from "../utils";

export interface KickerProps {
  /** Label text, rendered uppercase in the condensed display face. */
  children: ReactNode;
  /** Optional section number, e.g. "02" — shown in clay before the label. */
  num?: string;
  /** Show the 28px clay rule before the number. Defaults to true. */
  bar?: boolean;
  className?: string;
}

/**
 * Small uppercase section label — the clay rule + numeral that opens every
 * section on the site. Pair it with `Section`'s title.
 */
export function Kicker({ children, num, bar = true, className }: KickerProps) {
  return (
    <span className={cx("spz-kicker", className)}>
      {bar && <span className="spz-kicker-bar" aria-hidden="true" />}
      {num && <span className="spz-kicker-num">{num}</span>}
      <span>{children}</span>
    </span>
  );
}
