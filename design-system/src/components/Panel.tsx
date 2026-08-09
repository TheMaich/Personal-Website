import type { ReactNode } from "react";
import { cx } from "../utils";

export interface PanelProps {
  children: ReactNode;
  /**
   * `raised` (default) — paper-3 surface with the system's soft drop shadow.
   * `flat` — paper-2 surface, no shadow; for blocks that sit inside prose.
   */
  variant?: "raised" | "flat";
  /** Add the top-right radial clay wash used on the hero and testimonial cards. */
  wash?: boolean;
  className?: string;
}

/** Generic bordered surface — the base every card in the system is built on. */
export function Panel({ children, variant = "raised", wash, className }: PanelProps) {
  return (
    <div
      className={cx(
        "spz-panel",
        variant === "flat" && "spz-panel--flat",
        wash && "spz-panel--wash",
        className
      )}
    >
      {children}
    </div>
  );
}
