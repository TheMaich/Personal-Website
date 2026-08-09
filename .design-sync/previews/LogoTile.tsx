import { LogoTile } from "@spritz/design-system";

// Self-contained placeholder wordmark — real usage passes a studio logo file.
const wordmark = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60">` +
      `<text x="100" y="38" font-family="Helvetica,Arial,sans-serif" font-size="20" ` +
      `font-weight="700" fill="#8E95A4" text-anchor="middle">${label}</text></svg>`
  )}`;

export const Framed = () => <LogoTile src={wordmark("RAW FURY")} alt="Raw Fury" />;

export const Bare = () => (
  <LogoTile variant="bare" src={wordmark("REBELLION")} alt="Rebellion" />
);

export const Linked = () => (
  <LogoTile src={wordmark("MILESTONE")} alt="Milestone" href="#" />
);

export const Row = () => (
  <div style={{ display: "flex", gap: 18 }}>
    <LogoTile src={wordmark("RAW FURY")} alt="Raw Fury" />
    <LogoTile src={wordmark("UNTOLD")} alt="Untold Games" />
    <LogoTile src={wordmark("34BIG")} alt="34BigThings" />
  </div>
);
