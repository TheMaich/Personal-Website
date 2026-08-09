import type { ReactNode } from "react";
import { cx } from "../utils";

export interface ResultRow {
  label: string;
  value: ReactNode;
}

export interface ResultPanelProps {
  /** Output name. Rendered with a clay Σ prefix and a rule that runs to the edge. */
  label: string;
  /** The headline figure — oversized, tabular, letter-spaced tight. */
  value: ReactNode;
  /** Optional supporting rows under a clay-tinted divider. */
  breakdown?: ResultRow[];
  className?: string;
}

/**
 * Calculator output panel — clay-tinted surface with an oversized tabular
 * figure. This is the payoff element on every Spritz tool page, so it should
 * be the largest thing on screen when present.
 */
export function ResultPanel({ label, value, breakdown, className }: ResultPanelProps) {
  return (
    <div className={cx("spz-result", className)}>
      <span className="spz-result-label">{label}</span>
      <span className="spz-result-value">{value}</span>
      {breakdown && breakdown.length > 0 && (
        <div className="spz-result-breakdown">
          {breakdown.map((row, i) => (
            <div className="spz-result-row" key={i}>
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
