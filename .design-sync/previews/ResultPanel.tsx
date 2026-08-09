import { ResultPanel } from "@spritz/design-system";

export const MarketingBudget = () => (
  <ResultPanel
    label="Marketing budget"
    value="$125,000"
    breakdown={[
      { label: "Rate", value: "25% of budget" },
      { label: "Recoup units @ $20", value: "6,250" },
    ]}
  />
);

export const WithoutBreakdown = () => (
  <ResultPanel label="Break-even units" value="42,800" />
);

export const LongBreakdown = () => (
  <ResultPanel
    label="Net to developer"
    value="$318,400"
    breakdown={[
      { label: "Gross revenue", value: "$1,240,000" },
      { label: "Platform cut (30%)", value: "-$372,000" },
      { label: "Recoup remaining", value: "-$240,000" },
      { label: "Publisher split (50%)", value: "-$309,600" },
    ]}
  />
);
