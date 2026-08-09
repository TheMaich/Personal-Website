import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils";

export interface MarqueeProps {
  /** Tiles to scroll — normally `LogoTile` elements. */
  children: ReactNode;
  /** Optional uppercase label row above the track. */
  label?: ReactNode;
  /** Optional right-aligned counterpart to `label`. */
  labelRight?: ReactNode;
  /** Scroll direction. */
  direction?: "forward" | "reverse";
  /** One full loop in seconds. Slower reads calmer; the site uses 58s. */
  duration?: number;
  className?: string;
}

/**
 * Infinite logo rail with edge fades. Children are rendered twice so the loop
 * is seamless — pass one set and the component handles the duplicate.
 * Hovering the rail pauses it.
 */
export function Marquee({
  children,
  label,
  labelRight,
  direction = "forward",
  duration = 58,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cx("spz-marquee", className)}
      style={{ "--spz-marquee-dur": `${duration}s` } as CSSProperties}
    >
      {(label || labelRight) && (
        <div className="spz-wrap spz-marquee-kicker">
          <span>{label}</span>
          <span>{labelRight}</span>
        </div>
      )}
      <div
        className={cx(
          "spz-marquee-track",
          direction === "reverse" && "spz-marquee-track--reverse"
        )}
      >
        {children}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {children}
        </span>
      </div>
    </div>
  );
}
