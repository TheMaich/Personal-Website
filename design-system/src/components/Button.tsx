import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./icons";
import { cx } from "../utils";

type Common = {
  children: ReactNode;
  /** `primary` is the clay-filled CTA; `ghost` is the outlined secondary. */
  variant?: "primary" | "ghost";
  /** Append the sliding right-arrow. On by default for primary. */
  arrow?: boolean;
  className?: string;
};

export type ButtonProps = Common &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

/**
 * Pill CTA. Renders an `<a>` when `href` is passed, otherwise a `<button>`.
 *
 * The arrow micro-slides 3px right on hover and the whole pill drops 1px on
 * press — both are part of the brand feel, not decoration.
 */
export function Button({ children, variant = "primary", arrow, className, ...rest }: ButtonProps) {
  const showArrow = arrow ?? variant === "primary";
  const cls = cx("spz-btn", `spz-btn--${variant}`, className);
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="spz-arrow" />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cls} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={buttonProps.type ?? "button"} {...buttonProps}>
      {content}
    </button>
  );
}
