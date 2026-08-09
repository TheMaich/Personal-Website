import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "./icons";
import { cx } from "../utils";

export interface TestimonialEntry {
  name: string;
  /** Role and company, e.g. "Producer, Untold Games". */
  role: string;
  quote: string;
  /** Company logo shown on the card stack. */
  logo?: string;
  /** Wide wordmark strips get more of the card than square marks. */
  logoWide?: boolean;
}

export interface TestimonialProps {
  entries: TestimonialEntry[];
  /** Index shown first. */
  defaultIndex?: number;
  className?: string;
}

/** Fixed per-card tilts, cycled so any number of entries stays varied. */
const TILTS = ["-6deg", "4deg", "-3deg", "7deg", "-5deg", "6deg"];

/**
 * Testimonial carousel: a tilted stack of logo cards on the left, the active
 * quote on the right. Inactive cards sit back at 50% opacity with a fixed
 * rotation; the active one rotates flat and scales up.
 */
export function Testimonial({ entries, defaultIndex = 0, className }: TestimonialProps) {
  const [index, setIndex] = useState(defaultIndex);
  const count = entries.length;
  const active = entries[index];
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  if (!active) return null;

  return (
    <div className={cx("spz-testi", className)}>
      <div className="spz-testi-stage">
        {entries.map((entry, i) => {
          // Layer by circular distance from the active card so the active one
          // always paints on top and neighbours fan out behind it.
          const raw = Math.abs(i - index);
          const dist = Math.min(raw, count - raw);
          return (
            <div
              key={i}
              className={cx("spz-testi-card", i === index && "is-active")}
              style={
                {
                  "--spz-testi-tilt": TILTS[i % TILTS.length],
                  zIndex: count - dist,
                } as CSSProperties
              }
              aria-hidden={i !== index}
            >
              {entry.logo && (
                <img
                  className={cx("spz-testi-logo", entry.logoWide && "spz-testi-logo--wide")}
                  src={entry.logo}
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>

      <div>
        <figure style={{ margin: 0 }}>
          <figcaption>
            <p className="spz-testi-name">{active.name}</p>
            <p className="spz-testi-role">{active.role}</p>
          </figcaption>
          <blockquote className="spz-testi-quote">{active.quote}</blockquote>
        </figure>

        {count > 1 && (
          <div className="spz-testi-controls">
            <button
              className="spz-icon-btn"
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <button
              className="spz-icon-btn"
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
