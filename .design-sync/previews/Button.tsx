import { Button } from "@spritz/design-system";

export const Primary = () => <Button href="#">Book a call</Button>;

export const Ghost = () => (
  <Button variant="ghost" href="#">
    Read the FAQ
  </Button>
);

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <Button href="#">Book a call</Button>
    <Button variant="ghost" href="#">
      See services
    </Button>
    <Button variant="primary" arrow={false}>
      Send it
    </Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button disabled>Send it</Button>
    <Button variant="ghost" disabled>
      Cancel
    </Button>
  </div>
);
