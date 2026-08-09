import { Testimonial } from "@spritz/design-system";

// Self-contained placeholder wordmarks — the real cards use the studio logos
// from the site's /assets, which aren't part of the package.
const wordmark = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="96">` +
      `<text x="140" y="60" font-family="Helvetica,Arial,sans-serif" font-size="28" ` +
      `font-weight="700" fill="#8E95A4" text-anchor="middle">${label}</text></svg>`
  )}`;

const entries = [
  {
    name: "Michele B.",
    role: "Studio Director, Untold Games",
    quote: "He asked the two questions our publisher was hoping we wouldn't.",
    logo: wordmark("UNTOLD GAMES"),
    logoWide: true,
  },
  {
    name: "Andrea R.",
    role: "Producer, 34BigThings",
    quote: "Turned a vague milestone plan into something we could actually hit.",
    logo: wordmark("34BIGTHINGS"),
  },
  {
    name: "Sam T.",
    role: "Founder, BippinBits",
    quote: "Saved us a full quarter of runway on the recoup terms alone.",
    logo: wordmark("BIPPINBITS"),
  },
];

export const Carousel = () => <Testimonial entries={entries} />;

export const SecondEntryActive = () => <Testimonial entries={entries} defaultIndex={1} />;

export const SingleEntry = () => <Testimonial entries={[entries[0]]} />;
