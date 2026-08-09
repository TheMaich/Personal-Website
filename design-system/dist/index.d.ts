import * as react from 'react';
import { ReactNode, CSSProperties, AnchorHTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, FormHTMLAttributes, SVGProps } from 'react';

interface SpritzRootProps {
    /** Page content. Every other Spritz component must render inside this. */
    children: ReactNode;
    /** Colour theme. `dark` is the brand default (mustard on near-black). */
    theme?: "dark" | "light";
    /** Render the animated film-grain overlay. */
    grain?: boolean;
    /** Render the drifting clay aurora washes behind content. */
    aurora?: boolean;
    className?: string;
    style?: CSSProperties;
}
/**
 * Root wrapper for the Spritz design system.
 *
 * This is where the design tokens live — every component reads `var(--spz-*)`
 * from this element, so anything rendered outside it is unstyled. Wrap the
 * whole page (or the whole preview) in exactly one SpritzRoot.
 */
declare function SpritzRoot({ children, theme, grain, aurora, className, style, }: SpritzRootProps): react.JSX.Element;
interface WrapProps {
    children: ReactNode;
    className?: string;
}
/** Centred 1280px content column with the system's fluid side gutters. */
declare function Wrap({ children, className }: WrapProps): react.JSX.Element;

type Common = {
    children: ReactNode;
    /** `primary` is the clay-filled CTA; `ghost` is the outlined secondary. */
    variant?: "primary" | "ghost";
    /** Append the sliding right-arrow. On by default for primary. */
    arrow?: boolean;
    className?: string;
};
type ButtonProps = Common & (({
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">) | ({
    href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">));
/**
 * Pill CTA. Renders an `<a>` when `href` is passed, otherwise a `<button>`.
 *
 * The arrow micro-slides 3px right on hover and the whole pill drops 1px on
 * press — both are part of the brand feel, not decoration.
 */
declare function Button({ children, variant, arrow, className, ...rest }: ButtonProps): react.JSX.Element;

interface KickerProps {
    /** Label text, rendered uppercase in the condensed display face. */
    children: ReactNode;
    /** Optional section number, e.g. "02" — shown in clay before the label. */
    num?: string;
    /** Show the 28px clay rule before the number. Defaults to true. */
    bar?: boolean;
    className?: string;
}
/**
 * Small uppercase section label — the clay rule + numeral that opens every
 * section on the site. Pair it with `Section`'s title.
 */
declare function Kicker({ children, num, bar, className }: KickerProps): react.JSX.Element;

type ChipCommon = {
    children: ReactNode;
    /**
     * `default` — paper-3 pill, clay on hover (related-resource chips)
     * `preset`  — condensed numerals, clay fill when active (calculator presets)
     * `filter`  — bold sans, ink fill when active (resource filter tabs)
     */
    variant?: "default" | "preset" | "filter";
    active?: boolean;
    className?: string;
};
type ChipProps = ChipCommon & (({
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">) | ({
    href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">));
/** Pill chip. Renders an `<a>` when `href` is given, otherwise a `<button>`. */
declare function Chip({ children, variant, active, className, ...rest }: ChipProps): react.JSX.Element;
interface ChipGroupProps {
    children: ReactNode;
    /**
     * `segmented` draws the enclosing pill-in-a-pill bar used for filter tabs.
     * `loose` (default) is a plain wrapping row, used for presets and chip rows.
     */
    layout?: "loose" | "segmented";
    /** Sets role="tablist" — use when the chips switch panels. */
    tablist?: boolean;
    className?: string;
}
/** Row of chips. Use `layout="segmented"` for the bordered filter bar. */
declare function ChipGroup({ children, layout, tablist, className }: ChipGroupProps): react.JSX.Element;

interface LogoTileProps {
    /** Logo image URL. */
    src: string;
    /** Company name — used as the image alt text. */
    alt: string;
    /**
     * `tile` (default) frames the logo in a bordered paper-3 card.
     * `bare` drops the frame and lets a full-bleed logo strip stand alone.
     */
    variant?: "tile" | "bare";
    href?: string;
    className?: string;
}
/** Client logo tile — the unit the `Marquee` scrolls. */
declare function LogoTile({ src, alt, variant, href, className }: LogoTileProps): react.JSX.Element;

interface MetaItem {
    /** Left column label, rendered uppercase in the condensed face. */
    term: string;
    /** Right column value. Wrap emphasis in `<em>` to tint it clay. */
    description: ReactNode;
}
interface MetaListProps {
    items: MetaItem[];
    className?: string;
}
/**
 * Definition rows with a fixed 110px label column — the "based in / focus /
 * availability" block in the hero capsule.
 */
declare function MetaList({ items, className }: MetaListProps): react.JSX.Element;

interface FieldProps {
    /** Uppercase label above the control. */
    label: string;
    /** Render a clay asterisk after the label and set `required` on the control. */
    required?: boolean;
    /** Error message. Any non-empty value flips the control into its error skin. */
    error?: string;
    /** Render a textarea instead of a single-line input. */
    multiline?: boolean;
    /** Span both columns inside `Form`'s two-up grid. */
    wide?: boolean;
    className?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;
}
/**
 * Labelled form control with the system's error state. Reads as a stacked
 * label / control / message triple; the message reserves its line so the
 * layout does not jump when validation fires.
 */
declare function Field({ label, required, error, multiline, wide, className, inputProps, }: FieldProps): react.JSX.Element;

interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "className"> {
    children: ReactNode;
    className?: string;
}
/**
 * Contact-form shell — paper-3 panel that warms to a slow clay glow on hover.
 * Put `Field`s inside a `FormGrid` and actions inside a `FormFoot`.
 */
declare function Form({ children, className, ...rest }: FormProps): react.JSX.Element;
/** Two-column field grid; collapses to one column under 640px. */
declare function FormGrid({ children, className }: {
    children: ReactNode;
    className?: string;
}): react.JSX.Element;
/** Footer row for the submit button plus a small uppercase note. */
declare function FormFoot({ children, className }: {
    children: ReactNode;
    className?: string;
}): react.JSX.Element;

interface CalculatorInputProps {
    /** Large serif label above the control. */
    label: string;
    /** Optional explanatory line under the label. */
    hint?: ReactNode;
    /** Leading affix chip, e.g. "USD $". */
    prefix?: string;
    /** Trailing affix chip, e.g. ".00" or "%". */
    suffix?: string;
    className?: string;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
}
/**
 * The calculator field used across the Spritz tools: a serif label, a hint
 * line, and a composite input where paper-3 affix chips bracket a transparent
 * control. The whole wrap turns clay on focus-within.
 */
declare function CalculatorInput({ label, hint, prefix, suffix, className, inputProps, }: CalculatorInputProps): react.JSX.Element;

interface PanelProps {
    children: ReactNode;
    /**
     * `raised` (default) — paper-3 surface with the system's soft drop shadow.
     * `flat` — paper-2 surface, no shadow; for blocks that sit inside prose.
     */
    variant?: "raised" | "flat";
    /** Add the top-right radial clay wash used on the hero and testimonial cards. */
    wash?: boolean;
    className?: string;
}
/** Generic bordered surface — the base every card in the system is built on. */
declare function Panel({ children, variant, wash, className }: PanelProps): react.JSX.Element;

interface ResultRow {
    label: string;
    value: ReactNode;
}
interface ResultPanelProps {
    /** Output name. Rendered with a clay Σ prefix and a rule that runs to the edge. */
    label: string;
    /** The headline figure — oversized, tabular, letter-spaced tight. */
    value: ReactNode;
    /** Optional supporting rows under a clay-tinted divider. */
    breakdown?: ResultRow[];
    className?: string;
}
/**
 * Calculator output panel — clay-tinted surface with an oversized tabular
 * figure. This is the payoff element on every Spritz tool page, so it should
 * be the largest thing on screen when present.
 */
declare function ResultPanel({ label, value, breakdown, className }: ResultPanelProps): react.JSX.Element;

interface TldrCardProps {
    /** Bullet points. Keep them to one line each — this is a scan aid. */
    items: ReactNode[];
    /** Pill label. Defaults to "TL;DR". */
    label?: string;
    className?: string;
}
/** Article summary block — clay pill label over clay-marked bullets. */
declare function TldrCard({ items, label, className }: TldrCardProps): react.JSX.Element;

interface CtaCardProps {
    /** The ask, phrased as a sentence. This is the card's whole job. */
    headline: ReactNode;
    /** Optional supporting line under the headline. */
    sub?: ReactNode;
    /** Button label. Defaults to "Get in touch". */
    action?: string;
    href: string;
    className?: string;
}
/**
 * Full-width end-of-article CTA. The entire card is the link: it scales 1.025
 * on hover and fades in a clay gradient frame.
 */
declare function CtaCard({ headline, sub, action, href, className }: CtaCardProps): react.JSX.Element;

interface ResourceRowProps {
    title: ReactNode;
    /** One-line summary. Kept to 70ch so it stays scannable. */
    description?: ReactNode;
    /** 22px stroke icon. Renders inside a 48px bordered box. */
    icon?: ReactNode;
    href: string;
    /** CTA pill text. Defaults to "Read →". */
    cta?: string;
    /**
     * Unlocked rows tint their icon clay and darken the CTA on hover. Locked
     * rows stay neutral — use it for gated or upcoming resources.
     */
    unlocked?: boolean;
    className?: string;
}
/**
 * Resource index row. Deliberately a divided list row rather than a tile —
 * the resources page reads as a list, not a card grid.
 */
declare function ResourceRow({ title, description, icon, href, cta, unlocked, className, }: ResourceRowProps): react.JSX.Element;

interface StatProps {
    /** The figure — oversized clay numerals. Keep it short ("10", "40+", "3x"). */
    value: ReactNode;
    /** What the figure counts. */
    title: ReactNode;
    /** Optional supporting sentence. Omitted in the compact rail. */
    body?: ReactNode;
    /** Small uppercase tag pinned to the bottom of the tile. */
    tag?: string;
    className?: string;
}
/** One tile in a `StatRail`. */
declare function Stat({ value, title, body, tag, className }: StatProps): react.JSX.Element;
interface StatRailProps {
    children: ReactNode;
    /**
     * `full` (default) — tall 4-up tiles with body copy.
     * `compact` — square 2-up tiles, number and title only, capped at 320px.
     */
    variant?: "full" | "compact";
    /** Column count override. Defaults to 4 for `full`, 2 for `compact`. */
    columns?: number;
    className?: string;
}
/**
 * Hairline-divided rail of stat tiles. The 2px gap over a rule-coloured
 * background is what draws the dividers — there are no per-tile borders.
 */
declare function StatRail({ children, variant, columns, className }: StatRailProps): react.JSX.Element;

interface SectionProps {
    children?: ReactNode;
    /** Kicker label above the title, e.g. "Services". */
    kicker?: string;
    /** Section number shown in the kicker, e.g. "02". */
    num?: string;
    /**
     * Section heading. Wrap a phrase in `<em>` to tint it clay and italicise it —
     * that clay emphasis is the site's main typographic signature.
     */
    title?: ReactNode;
    /** Supporting paragraph. In `split` layout it sits in the right column. */
    lede?: ReactNode;
    /**
     * `stacked` (default) — heading block above content.
     * `split` — heading left, lede right, aligned to their baselines.
     * `center` — centred heading block.
     */
    layout?: "stacked" | "split" | "center";
    /** Halve the vertical padding. Use for sections that sit close together. */
    tight?: boolean;
    id?: string;
    className?: string;
}
/**
 * Section wrapper with the system's heading block and vertical rhythm.
 *
 * The padding is fluid (clamp) rather than fixed, so sections breathe on wide
 * screens and tighten on mobile without a breakpoint.
 */
declare function Section({ children, kicker, num, title, lede, layout, tight, id, className, }: SectionProps): react.JSX.Element;
interface DisplayProps {
    children: ReactNode;
    /** Renders an `<h1>` by default; pass `as="h2"` for a secondary display line. */
    as?: "h1" | "h2" | "p";
    className?: string;
}
/**
 * Hero-scale display type — the 112px-max serif line. Use `<em>` inside for
 * the clay italic accent.
 */
declare function Display({ children, as: Tag, className }: DisplayProps): react.JSX.Element;

interface ServiceCardProps {
    title: ReactNode;
    /** Short positioning line under the title, capped at 36ch. */
    intro?: ReactNode;
    /** Deliverables. Rendered in two clay-ticked columns on desktop. */
    bullets?: ReactNode[];
    /** 32px stroke icon, framed in a 64px rounded box. */
    icon?: ReactNode;
    /** Chips linking to related articles or tools. Pass `Chip` elements. */
    related?: ReactNode;
    /** Label before the related chips. Defaults to "Related". */
    relatedLabel?: string;
    className?: string;
}
/**
 * A single service entry: icon rail, title + intro column, and a two-column
 * deliverables list. Rows are separated by a top rule, so stacking several
 * `ServiceCard`s produces the divided list used on the services section.
 */
declare function ServiceCard({ title, intro, bullets, icon, related, relatedLabel, className, }: ServiceCardProps): react.JSX.Element;

interface FaqItemProps {
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
declare function FaqItem({ question, children, defaultOpen, className }: FaqItemProps): react.JSX.Element;
/** Wrapper that draws the top rule and caps the list at a 720px reading width. */
declare function FaqList({ children, className }: {
    children: ReactNode;
    className?: string;
}): react.JSX.Element;

interface TestimonialEntry {
    name: string;
    /** Role and company, e.g. "Producer, Untold Games". */
    role: string;
    quote: string;
    /** Company logo shown on the card stack. */
    logo?: string;
    /** Wide wordmark strips get more of the card than square marks. */
    logoWide?: boolean;
}
interface TestimonialProps {
    entries: TestimonialEntry[];
    /** Index shown first. */
    defaultIndex?: number;
    className?: string;
}
/**
 * Testimonial carousel: a tilted stack of logo cards on the left, the active
 * quote on the right. Inactive cards sit back at 50% opacity with a fixed
 * rotation; the active one rotates flat and scales up.
 */
declare function Testimonial({ entries, defaultIndex, className }: TestimonialProps): react.JSX.Element | null;

interface MarqueeProps {
    /** Tiles to scroll — normally `LogoTile` elements. */
    children: ReactNode;
    /** Optional uppercase label row above the track. */
    label?: ReactNode;
    /** Optional right-aligned counterpart to `label`. */
    labelRight?: ReactNode;
    /** Scroll direction. */
    direction?: "forward" | "reverse";
    /** One full loop in seconds. Slower reads calmer; the site uses 58s. */
    duration?: number;
    className?: string;
}
/**
 * Infinite logo rail with edge fades. Children are rendered twice so the loop
 * is seamless — pass one set and the component handles the duplicate.
 * Hovering the rail pauses it.
 */
declare function Marquee({ children, label, labelRight, direction, duration, className, }: MarqueeProps): react.JSX.Element;

interface SpeechBubbleProps {
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
declare function SpeechBubble({ children, lead, sub, className }: SpeechBubbleProps): react.JSX.Element;

interface NavItem {
    label: string;
    href: string;
    /** Clay numeral before the label, e.g. "01". */
    num?: string;
    active?: boolean;
    /** Render the link in clay — used to pull the Resources link out of the row. */
    accent?: boolean;
}
interface SiteHeaderProps {
    /** Brand text. The dot between the two halves pulses in clay. */
    brand?: {
        before: string;
        after: string;
    };
    /** Small uppercase descriptor after the wordmark, e.g. "Production & Publishing". */
    role?: string;
    items?: NavItem[];
    /** Extra controls on the right of the bar (theme toggle, CTA, …). */
    actions?: ReactNode;
    href?: string;
    className?: string;
}
/**
 * Sticky site header — blurred translucent bar, pulsing-dot wordmark, and
 * numbered uppercase nav where the active item takes a clay pill.
 */
declare function SiteHeader({ brand, role, items, actions, href, className, }: SiteHeaderProps): react.JSX.Element;

/** Right arrow — the CTA arrow that micro-slides on button hover. */
declare function ArrowRight({ size, ...props }: {
    size?: number;
} & SVGProps<SVGSVGElement>): react.JSX.Element;
/** Diagonal out-arrow — used for external / resource links. */
declare function ArrowUpRight({ size, ...props }: {
    size?: number;
} & SVGProps<SVGSVGElement>): react.JSX.Element;
declare function ChevronLeft({ size, ...props }: {
    size?: number;
} & SVGProps<SVGSVGElement>): react.JSX.Element;
declare function ChevronRight({ size, ...props }: {
    size?: number;
} & SVGProps<SVGSVGElement>): react.JSX.Element;

export { ArrowRight, ArrowUpRight, Button, type ButtonProps, CalculatorInput, type CalculatorInputProps, ChevronLeft, ChevronRight, Chip, ChipGroup, type ChipGroupProps, type ChipProps, CtaCard, type CtaCardProps, Display, type DisplayProps, FaqItem, type FaqItemProps, FaqList, Field, type FieldProps, Form, FormFoot, FormGrid, type FormProps, Kicker, type KickerProps, LogoTile, type LogoTileProps, Marquee, type MarqueeProps, type MetaItem, MetaList, type MetaListProps, type NavItem, Panel, type PanelProps, ResourceRow, type ResourceRowProps, ResultPanel, type ResultPanelProps, type ResultRow, Section, type SectionProps, ServiceCard, type ServiceCardProps, SiteHeader, type SiteHeaderProps, SpeechBubble, type SpeechBubbleProps, SpritzRoot, type SpritzRootProps, Stat, type StatProps, StatRail, type StatRailProps, Testimonial, type TestimonialEntry, type TestimonialProps, TldrCard, type TldrCardProps, Wrap, type WrapProps };
