import type { ReactNode } from "react";
import { cx } from "../utils";

export interface MetaItem {
  /** Left column label, rendered uppercase in the condensed face. */
  term: string;
  /** Right column value. Wrap emphasis in `<em>` to tint it clay. */
  description: ReactNode;
}

export interface MetaListProps {
  items: MetaItem[];
  className?: string;
}

/**
 * Definition rows with a fixed 110px label column — the "based in / focus /
 * availability" block in the hero capsule.
 */
export function MetaList({ items, className }: MetaListProps) {
  return (
    <dl className={cx("spz-meta-list", className)}>
      {items.map((item, i) => (
        <div className="spz-meta-row" key={i}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
