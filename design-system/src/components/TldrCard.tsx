import type { ReactNode } from "react";
import { cx } from "../utils";

export interface TldrCardProps {
  /** Bullet points. Keep them to one line each — this is a scan aid. */
  items: ReactNode[];
  /** Pill label. Defaults to "TL;DR". */
  label?: string;
  className?: string;
}

/** Article summary block — clay pill label over clay-marked bullets. */
export function TldrCard({ items, label = "TL;DR", className }: TldrCardProps) {
  return (
    <aside className={cx("spz-tldr", className)}>
      <span className="spz-tldr-label">{label}</span>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
