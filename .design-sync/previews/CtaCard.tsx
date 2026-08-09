import { CtaCard } from "@spritz/design-system";

export const Default = () => (
  <CtaCard headline="Sharper read on your deal? Book a call." href="#" />
);

export const WithSub = () => (
  <CtaCard
    headline="Sharper read on your deal? Book a call."
    sub="Thirty minutes, no pitch. Bring the term sheet."
    action="Get in touch"
    href="#"
  />
);

export const LongHeadline = () => (
  <CtaCard
    headline="Not sure whether the offer on your desk is a good one? That's usually the moment to ask."
    action="Book a call"
    href="#"
  />
);
