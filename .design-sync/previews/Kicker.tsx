import { Kicker } from "@spritz/design-system";

export const Numbered = () => <Kicker num="02">Services</Kicker>;

export const LabelOnly = () => <Kicker>Trusted by</Kicker>;

export const NoBar = () => (
  <Kicker num="04" bar={false}>
    Contact
  </Kicker>
);

export const Sequence = () => (
  <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
    <Kicker num="01">My experience</Kicker>
    <Kicker num="02">Services</Kicker>
    <Kicker num="03">FAQ</Kicker>
    <Kicker num="04">Contact</Kicker>
  </div>
);
