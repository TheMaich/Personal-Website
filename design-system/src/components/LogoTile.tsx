import { cx } from "../utils";

export interface LogoTileProps {
  /** Logo image URL. */
  src: string;
  /** Company name — used as the image alt text. */
  alt: string;
  /**
   * `tile` (default) frames the logo in a bordered paper-3 card.
   * `bare` drops the frame and lets a full-bleed logo strip stand alone.
   */
  variant?: "tile" | "bare";
  href?: string;
  className?: string;
}

/** Client logo tile — the unit the `Marquee` scrolls. */
export function LogoTile({ src, alt, variant = "tile", href, className }: LogoTileProps) {
  const cls = cx("spz-logo-tile", variant === "bare" && "spz-logo-tile--bare", className);
  const img = <img src={src} alt={alt} loading="lazy" decoding="async" />;

  if (href) {
    return (
      <a className={cls} href={href}>
        {img}
      </a>
    );
  }
  return <div className={cls}>{img}</div>;
}
