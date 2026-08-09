import { Marquee, LogoTile } from "@spritz/design-system";

// Self-contained placeholder wordmarks — real usage passes the studio logos
// from the site's /assets.
const wordmark = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60">` +
      `<text x="100" y="38" font-family="Helvetica,Arial,sans-serif" font-size="20" ` +
      `font-weight="700" fill="#8E95A4" text-anchor="middle">${label}</text></svg>`
  )}`;

const studios = ["RAW FURY", "REBELLION", "UNTOLD", "MILESTONE", "34BIG", "BIPPINBITS"];

export const WithLabel = () => (
  <Marquee label="Studios I've worked with" labelRight="2016 — 2026">
    {studios.map((s) => (
      <LogoTile key={s} src={wordmark(s)} alt={s} />
    ))}
  </Marquee>
);

export const Bare = () => (
  <Marquee>
    {studios.map((s) => (
      <LogoTile key={s} src={wordmark(s)} alt={s} />
    ))}
  </Marquee>
);

export const Reverse = () => (
  <Marquee direction="reverse" duration={40} label="Also worked with">
    {studios.map((s) => (
      <LogoTile key={s} src={wordmark(s)} alt={s} />
    ))}
  </Marquee>
);
