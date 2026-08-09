import { Chip, ChipGroup } from "@spritz/design-system";

export const FilterTabs = () => (
  <ChipGroup layout="segmented" tablist>
    <Chip variant="filter" active>
      All
    </Chip>
    <Chip variant="filter">Articles</Chip>
    <Chip variant="filter">Tools</Chip>
  </ChipGroup>
);

export const BudgetPresets = () => (
  <ChipGroup>
    <Chip variant="preset">250K</Chip>
    <Chip variant="preset" active>
      500K
    </Chip>
    <Chip variant="preset">1M</Chip>
    <Chip variant="preset">2M</Chip>
  </ChipGroup>
);

export const RelatedLinks = () => (
  <ChipGroup>
    <Chip href="#">Recoup calculator</Chip>
    <Chip href="#">What 50/50 really means</Chip>
    <Chip href="#">Pitch deck template</Chip>
  </ChipGroup>
);
