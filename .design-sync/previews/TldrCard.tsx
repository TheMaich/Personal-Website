import { TldrCard } from "@spritz/design-system";

export const Default = () => (
  <TldrCard
    items={[
      "The headline split number is not the deal.",
      "Recoup terms decide who actually earns first.",
      "Net definitions hide most of the value.",
    ]}
  />
);

export const CustomLabel = () => (
  <TldrCard
    label="In short"
    items={[
      "Publishers build a risk model, not a wishlist.",
      "Your deck answers risk questions or it doesn't.",
    ]}
  />
);

export const SingleItem = () => (
  <TldrCard items={["Read the recoup clause before the split clause."]} />
);
