import { ServiceCard, Chip } from "@spritz/design-system";

const ChartIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="m7 15 4-4 3 3 5-6" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const DealReview = () => (
  <ServiceCard
    icon={ChartIcon}
    title="Publishing deal review"
    intro="A line-by-line read of the term sheet before you sign anything."
    bullets={[
      "Recoup structure",
      "Net vs gross definitions",
      "Territory + platform splits",
      "Milestone schedule",
      "Termination clauses",
      "IP ownership",
    ]}
    related={
      <>
        <Chip href="#">Recoup calculator</Chip>
        <Chip href="#">What 50/50 really means</Chip>
      </>
    }
  />
);

export const WithoutRelated = () => (
  <ServiceCard
    icon={ShieldIcon}
    title="Production support"
    intro="Scope, schedule and risk, reviewed by someone who has shipped on both sides."
    bullets={[
      "Milestone planning",
      "Scope triage",
      "Team structure",
      "Risk register",
    ]}
  />
);

export const Stacked = () => (
  <div>
    <ServiceCard
      icon={ChartIcon}
      title="Publishing deal review"
      intro="A line-by-line read of the term sheet before you sign anything."
      bullets={["Recoup structure", "Net definitions", "Splits", "Termination"]}
    />
    <ServiceCard
      icon={ShieldIcon}
      title="Production support"
      intro="Scope, schedule and risk, reviewed by someone who has shipped."
      bullets={["Milestone planning", "Scope triage", "Team structure", "Risk register"]}
    />
  </div>
);
