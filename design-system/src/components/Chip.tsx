import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../utils";

type ChipCommon = {
  children: ReactNode;
  /**
   * `default` — paper-3 pill, clay on hover (related-resource chips)
   * `preset`  — condensed numerals, clay fill when active (calculator presets)
   * `filter`  — bold sans, ink fill when active (resource filter tabs)
   */
  variant?: "default" | "preset" | "filter";
  active?: boolean;
  className?: string;
};

export type ChipProps = ChipCommon &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

/** Pill chip. Renders an `<a>` when `href` is given, otherwise a `<button>`. */
export function Chip({
  children,
  variant = "default",
  active = false,
  className,
  ...rest
}: ChipProps) {
  const cls = cx("spz-chip", `spz-chip--${variant}`, active && "is-active", className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}

export interface ChipGroupProps {
  children: ReactNode;
  /**
   * `segmented` draws the enclosing pill-in-a-pill bar used for filter tabs.
   * `loose` (default) is a plain wrapping row, used for presets and chip rows.
   */
  layout?: "loose" | "segmented";
  /** Sets role="tablist" — use when the chips switch panels. */
  tablist?: boolean;
  className?: string;
}

/** Row of chips. Use `layout="segmented"` for the bordered filter bar. */
export function ChipGroup({ children, layout = "loose", tablist, className }: ChipGroupProps) {
  return (
    <div
      className={cx("spz-chip-group", layout === "segmented" && "spz-chip-group--segmented", className)}
      role={tablist ? "tablist" : undefined}
    >
      {children}
    </div>
  );
}
