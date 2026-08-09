import { ResourceRow } from "@spritz/design-system";

const DocIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const ToolIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m7 15 4-4 3 3 5-6" />
  </svg>
);

export const Article = () => (
  <ResourceRow
    icon={DocIcon}
    title="What a publisher actually reads in your pitch deck"
    description="A publisher isn't evaluating only your game. They're building a risk model."
    href="#"
  />
);

export const Tool = () => (
  <ResourceRow
    icon={ToolIcon}
    title="Publishing recoup calculator"
    description="Model when you actually start earning under a given recoup structure."
    cta="Open tool →"
    href="#"
  />
);

export const Locked = () => (
  <ResourceRow
    icon={DocIcon}
    title="Console physical release planner"
    description="Coming soon — lead times, MOQs and the cash-flow shape of a physical run."
    cta="Soon"
    unlocked={false}
    href="#"
  />
);

export const IndexList = () => (
  <div>
    <ResourceRow
      icon={DocIcon}
      title="What a publisher actually reads in your pitch deck"
      description="A publisher isn't evaluating only your game. They're building a risk model."
      href="#"
    />
    <ResourceRow
      icon={ToolIcon}
      title="Publishing recoup calculator"
      description="Model when you actually start earning under a given recoup structure."
      cta="Open tool →"
      href="#"
    />
    <ResourceRow
      icon={DocIcon}
      title="Three things to settle before signing"
      description="The clauses that decide who earns first, in plain language."
      href="#"
    />
  </div>
);
