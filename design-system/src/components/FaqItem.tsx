import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../utils";

export interface FaqItemProps {
  question: ReactNode;
  /** Answer body. Revealed with a short fade when the item opens. */
  children: ReactNode;
  /** Open on first render. The component manages its own state after that. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Single accordion row. The round mustard toggle is the affordance — the whole
 * header is clickable, and the question turns clay on hover.
 */
export function FaqItem({ question, children, defaultOpen = false, className }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const panelId = `${id}-panel`;

  return (
    <div className={cx("spz-faq-item", className)}>
      <button
        className="spz-faq-header"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <h3 className="spz-faq-question">{question}</h3>
        <span className="spz-toggle" aria-hidden="true">
          <span className="spz-toggle-icon">{open ? "−" : "+"}</span>
        </span>
      </button>
      {open && (
        <div className="spz-faq-answer" id={panelId}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Wrapper that draws the top rule and caps the list at a 720px reading width. */
export function FaqList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("spz-faq-list", className)}>{children}</div>;
}
