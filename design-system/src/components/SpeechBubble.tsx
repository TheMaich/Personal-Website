import type { ReactNode } from "react";
import { cx } from "../utils";

export interface SpeechBubbleProps {
  /** Main line. Kept on one line by design — keep it short. */
  children: ReactNode;
  /** Clay italic word that opens the bubble, e.g. "Hola". */
  lead?: string;
  /** Smaller italic line under the main one. */
  sub?: ReactNode;
  className?: string;
}

/**
 * Comic-style speech bubble with a hard clay drop-shadow and an idle bob.
 * Used as an overlay on the portrait; position it with the wrapper.
 */
export function SpeechBubble({ children, lead, sub, className }: SpeechBubbleProps) {
  return (
    <div className={cx("spz-bubble", className)}>
      <svg className="spz-bubble-tail" viewBox="0 0 30 22" aria-hidden="true">
        <path d="M4 20 C 6 10, 12 4, 26 2 C 18 8, 14 14, 12 21" />
      </svg>
      <div className="spz-bubble-body">
        <span className="spz-bubble-title">
          {lead && <span className="spz-bubble-lead">{lead}</span>}
          {children}
        </span>
        {sub && <span className="spz-bubble-sub">{sub}</span>}
      </div>
    </div>
  );
}
