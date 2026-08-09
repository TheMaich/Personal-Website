import type { ReactNode } from "react";
import { cx } from "../utils";

export interface ResourceRowProps {
  title: ReactNode;
  /** One-line summary. Kept to 70ch so it stays scannable. */
  description?: ReactNode;
  /** 22px stroke icon. Renders inside a 48px bordered box. */
  icon?: ReactNode;
  href: string;
  /** CTA pill text. Defaults to "Read →". */
  cta?: string;
  /**
   * Unlocked rows tint their icon clay and darken the CTA on hover. Locked
   * rows stay neutral — use it for gated or upcoming resources.
   */
  unlocked?: boolean;
  className?: string;
}

/**
 * Resource index row. Deliberately a divided list row rather than a tile —
 * the resources page reads as a list, not a card grid.
 */
export function ResourceRow({
  title,
  description,
  icon,
  href,
  cta = "Read →",
  unlocked = true,
  className,
}: ResourceRowProps) {
  return (
    <a className={cx("spz-res-row", unlocked && "is-unlocked", className)} href={href}>
      <div className="spz-res-icon">{icon}</div>
      <div className="spz-res-body">
        <div className="spz-res-text">
          <h3 className="spz-res-title">{title}</h3>
          {description && <p className="spz-res-desc">{description}</p>}
        </div>
        <span className="spz-res-cta">{cta}</span>
      </div>
    </a>
  );
}
