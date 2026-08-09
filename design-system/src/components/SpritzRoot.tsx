import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils";

export interface SpritzRootProps {
  /** Page content. Every other Spritz component must render inside this. */
  children: ReactNode;
  /** Colour theme. `dark` is the brand default (mustard on near-black). */
  theme?: "dark" | "light";
  /** Render the animated film-grain overlay. */
  grain?: boolean;
  /** Render the drifting clay aurora washes behind content. */
  aurora?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Root wrapper for the Spritz design system.
 *
 * This is where the design tokens live — every component reads `var(--spz-*)`
 * from this element, so anything rendered outside it is unstyled. Wrap the
 * whole page (or the whole preview) in exactly one SpritzRoot.
 */
export function SpritzRoot({
  children,
  theme = "dark",
  grain = false,
  aurora = false,
  className,
  style,
}: SpritzRootProps) {
  return (
    <div className={cx("spz-root", className)} data-theme={theme} style={style}>
      {aurora && (
        <div className="spz-aurora" aria-hidden="true">
          <div className="spz-aurora-blob spz-aurora-blob--1" />
          <div className="spz-aurora-blob spz-aurora-blob--2" />
        </div>
      )}
      {grain && <div className="spz-grain" aria-hidden="true" />}
      {children}
    </div>
  );
}

export interface WrapProps {
  children: ReactNode;
  className?: string;
}

/** Centred 1280px content column with the system's fluid side gutters. */
export function Wrap({ children, className }: WrapProps) {
  return <div className={cx("spz-wrap", className)}>{children}</div>;
}
