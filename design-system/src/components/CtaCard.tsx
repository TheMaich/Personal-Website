import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";
import { cx } from "../utils";

export interface CtaCardProps {
  /** The ask, phrased as a sentence. This is the card's whole job. */
  headline: ReactNode;
  /** Optional supporting line under the headline. */
  sub?: ReactNode;
  /** Button label. Defaults to "Get in touch". */
  action?: string;
  href: string;
  className?: string;
}

/**
 * Full-width end-of-article CTA. The entire card is the link: it scales 1.025
 * on hover and fades in a clay gradient frame.
 */
export function CtaCard({ headline, sub, action = "Get in touch", href, className }: CtaCardProps) {
  return (
    <a className={cx("spz-cta-card", className)} href={href}>
      <div className="spz-cta-card-text">
        <div className="spz-cta-card-headline">{headline}</div>
        {sub && <p className="spz-cta-card-sub">{sub}</p>}
      </div>
      <div className="spz-cta-card-action">
        <span className="spz-cta-card-btn">
          {action}
          <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  );
}
