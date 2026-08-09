import type { ReactNode } from "react";
import { cx } from "../utils";

export interface NavItem {
  label: string;
  href: string;
  /** Clay numeral before the label, e.g. "01". */
  num?: string;
  active?: boolean;
  /** Render the link in clay — used to pull the Resources link out of the row. */
  accent?: boolean;
}

export interface SiteHeaderProps {
  /** Brand text. The dot between the two halves pulses in clay. */
  brand?: { before: string; after: string };
  /** Small uppercase descriptor after the wordmark, e.g. "Production & Publishing". */
  role?: string;
  items?: NavItem[];
  /** Extra controls on the right of the bar (theme toggle, CTA, …). */
  actions?: ReactNode;
  href?: string;
  className?: string;
}

/**
 * Sticky site header — blurred translucent bar, pulsing-dot wordmark, and
 * numbered uppercase nav where the active item takes a clay pill.
 */
export function SiteHeader({
  brand = { before: "spritz", after: "consulting" },
  role,
  items = [],
  actions,
  href = "/",
  className,
}: SiteHeaderProps) {
  return (
    <header className={cx("spz-header", className)}>
      <div className="spz-wrap spz-header-bar">
        <a className="spz-wordmark" href={href}>
          <span>
            {brand.before}
            <span className="spz-wordmark-dot" aria-hidden="true" />
            {brand.after}
          </span>
          {role && <span className="spz-wordmark-role">{role}</span>}
        </a>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          {items.length > 0 && (
            <nav className="spz-nav" aria-label="Primary">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cx(item.active && "is-active", item.accent && "spz-nav-accent")}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.num && <span className="spz-nav-num">{item.num}</span>}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          )}
          {actions}
        </div>
      </div>
    </header>
  );
}
