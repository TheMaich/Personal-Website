import type { ReactNode } from "react";
import { Kicker } from "./Kicker";
import { cx } from "../utils";

export interface SectionProps {
  children?: ReactNode;
  /** Kicker label above the title, e.g. "Services". */
  kicker?: string;
  /** Section number shown in the kicker, e.g. "02". */
  num?: string;
  /**
   * Section heading. Wrap a phrase in `<em>` to tint it clay and italicise it —
   * that clay emphasis is the site's main typographic signature.
   */
  title?: ReactNode;
  /** Supporting paragraph. In `split` layout it sits in the right column. */
  lede?: ReactNode;
  /**
   * `stacked` (default) — heading block above content.
   * `split` — heading left, lede right, aligned to their baselines.
   * `center` — centred heading block.
   */
  layout?: "stacked" | "split" | "center";
  /** Halve the vertical padding. Use for sections that sit close together. */
  tight?: boolean;
  id?: string;
  className?: string;
}

/**
 * Section wrapper with the system's heading block and vertical rhythm.
 *
 * The padding is fluid (clamp) rather than fixed, so sections breathe on wide
 * screens and tighten on mobile without a breakpoint.
 */
export function Section({
  children,
  kicker,
  num,
  title,
  lede,
  layout = "stacked",
  tight,
  id,
  className,
}: SectionProps) {
  const hasHead = Boolean(kicker || title || lede);
  return (
    <section className={cx("spz-section", tight && "spz-section--tight", className)} id={id}>
      {hasHead && (
        <div
          className={cx(
            "spz-section-head",
            layout === "split" && "spz-section-head--split",
            layout === "center" && "spz-section-head--center"
          )}
        >
          <div>
            {kicker && <Kicker num={num}>{kicker}</Kicker>}
            {title && <h2 className="spz-section-title">{title}</h2>}
            {lede && layout !== "split" && <p className="spz-section-lede">{lede}</p>}
          </div>
          {lede && layout === "split" && <p className="spz-section-lede">{lede}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export interface DisplayProps {
  children: ReactNode;
  /** Renders an `<h1>` by default; pass `as="h2"` for a secondary display line. */
  as?: "h1" | "h2" | "p";
  className?: string;
}

/**
 * Hero-scale display type — the 112px-max serif line. Use `<em>` inside for
 * the clay italic accent.
 */
export function Display({ children, as: Tag = "h1", className }: DisplayProps) {
  return <Tag className={cx("spz-display", className)}>{children}</Tag>;
}
