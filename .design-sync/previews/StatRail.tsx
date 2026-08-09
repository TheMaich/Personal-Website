import { StatRail, Stat } from "@spritz/design-system";

export const FullRail = () => (
  <StatRail>
    <Stat
      value="10"
      title="Years in games"
      body="Production and publishing, on both sides of the table."
      tag="Since 2016"
    />
    <Stat
      value="40+"
      title="Titles shipped"
      body="From two-person teams to 60-strong studios."
      tag="Console + PC"
    />
    <Stat
      value="12"
      title="Deals reviewed"
      body="Term sheets read line by line before anyone signed."
      tag="2025"
    />
    <Stat
      value="3x"
      title="Median uplift"
      body="On renegotiated recoup terms."
      tag="Measured"
    />
  </StatRail>
);

export const Compact = () => (
  <StatRail variant="compact">
    <Stat value="10" title="Years" />
    <Stat value="40+" title="Titles" />
  </StatRail>
);

export const ThreeUp = () => (
  <StatRail columns={3}>
    <Stat value="10" title="Years in games" body="Both sides of the table." tag="Since 2016" />
    <Stat value="40+" title="Titles shipped" body="Two-person teams to 60-strong studios." tag="Console + PC" />
    <Stat value="12" title="Deals reviewed" body="Read line by line." tag="2025" />
  </StatRail>
);
