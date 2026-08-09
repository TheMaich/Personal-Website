import { CalculatorInput, Chip, ChipGroup } from "@spritz/design-system";

export const Currency = () => (
  <CalculatorInput
    label="Development Budget"
    hint="Total spend to ship — staff + outsourcing + tools + audio + QA."
    prefix="USD $"
    suffix=".00"
    inputProps={{ placeholder: "500,000", defaultValue: 500000 }}
  />
);

export const Percentage = () => (
  <CalculatorInput
    label="Publisher split"
    hint="Their share of net revenue after recoup."
    suffix="%"
    inputProps={{ placeholder: "50", defaultValue: 50 }}
  />
);

export const Bare = () => (
  <CalculatorInput label="Wishlists at launch" inputProps={{ placeholder: "25,000" }} />
);

export const WithPresets = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <CalculatorInput
      label="Development Budget"
      hint="Total spend to ship — staff + outsourcing + tools + audio + QA."
      prefix="USD $"
      suffix=".00"
      inputProps={{ defaultValue: 500000 }}
    />
    <ChipGroup>
      <Chip variant="preset">250K</Chip>
      <Chip variant="preset" active>
        500K
      </Chip>
      <Chip variant="preset">1M</Chip>
      <Chip variant="preset">2M</Chip>
    </ChipGroup>
  </div>
);
