import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils";

export interface StatProps {
  /** The figure — oversized clay numerals. Keep it short ("10", "40+", "3x"). */
  value: ReactNode;
  /** What the figure counts. */
  title: ReactNode;
  /** Optional supporting sentence. Omitted in the compact rail. */
  body?: ReactNode;
  /** Small uppercase tag pinned to the bottom of the tile. */
  tag?: string;
  className?: string;
}

/** One tile in a `StatRail`. */
export function Stat({ value, title, body, tag, className }: StatProps) {
  return (
    <div className={cx("spz-stat", className)}>
      <span className="spz-stat-n">{value}</span>
      <div>
        <h3 className="spz-stat-title">{title}</h3>
        {body && <p className="spz-stat-body">{body}</p>}
      </div>
      {tag && <span className="spz-stat-tag">{tag}</span>}
    </div>
  );
}

export interface StatRailProps {
  children: ReactNode;
  /**
   * `full` (default) — tall 4-up tiles with body copy.
   * `compact` — square 2-up tiles, number and title only, capped at 320px.
   */
  variant?: "full" | "compact";
  /** Column count override. Defaults to 4 for `full`, 2 for `compact`. */
  columns?: number;
  className?: string;
}

/**
 * Hairline-divided rail of stat tiles. The 2px gap over a rule-coloured
 * background is what draws the dividers — there are no per-tile borders.
 */
export function StatRail({ children, variant = "full", columns, className }: StatRailProps) {
  const style = columns ? ({ "--spz-stat-cols": columns } as CSSProperties) : undefined;
  return (
    <div
      className={cx("spz-stat-rail", variant === "compact" && "spz-stat-rail--compact", className)}
      style={style}
    >
      {children}
    </div>
  );
}
