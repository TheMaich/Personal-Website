import type { ReactNode } from "react";
import { cx } from "../utils";

export interface ServiceCardProps {
  title: ReactNode;
  /** Short positioning line under the title, capped at 36ch. */
  intro?: ReactNode;
  /** Deliverables. Rendered in two clay-ticked columns on desktop. */
  bullets?: ReactNode[];
  /** 32px stroke icon, framed in a 64px rounded box. */
  icon?: ReactNode;
  /** Chips linking to related articles or tools. Pass `Chip` elements. */
  related?: ReactNode;
  /** Label before the related chips. Defaults to "Related". */
  relatedLabel?: string;
  className?: string;
}

/**
 * A single service entry: icon rail, title + intro column, and a two-column
 * deliverables list. Rows are separated by a top rule, so stacking several
 * `ServiceCard`s produces the divided list used on the services section.
 */
export function ServiceCard({
  title,
  intro,
  bullets,
  icon,
  related,
  relatedLabel = "Related",
  className,
}: ServiceCardProps) {
  return (
    <article className={cx("spz-service", className)}>
      <div className="spz-service-icon">{icon}</div>
      <div>
        <h3 className="spz-service-title">{title}</h3>
        {intro && <p className="spz-service-intro">{intro}</p>}
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="spz-service-bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {related && (
        <div className="spz-service-related">
          <span className="spz-service-related-label">{relatedLabel}</span>
          {related}
        </div>
      )}
    </article>
  );
}
