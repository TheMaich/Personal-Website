'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

// src/utils.ts
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function SpritzRoot({
  children,
  theme = "dark",
  grain = false,
  aurora = false,
  className,
  style
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-root", className), "data-theme": theme, style, children: [
    aurora && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-aurora", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-aurora-blob spz-aurora-blob--1" }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-aurora-blob spz-aurora-blob--2" })
    ] }),
    grain && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-grain", "aria-hidden": "true" }),
    children
  ] });
}
function Wrap({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cx("spz-wrap", className), children });
}
var base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
};
function ArrowRight({ size = 14, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...base, width: size, height: size, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m13 6 6 6-6 6" })
  ] });
}
function ArrowUpRight({ size = 14, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { ...base, width: size, height: size, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M7 17 17 7" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 7h9v9" })
  ] });
}
function ChevronLeft({ size = 18, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { ...base, width: size, height: size, ...props, children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" }) });
}
function ChevronRight({ size = 18, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { ...base, width: size, height: size, ...props, children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" }) });
}
function Button({ children, variant = "primary", arrow, className, ...rest }) {
  const showArrow = arrow ?? variant === "primary";
  const cls = cx("spz-btn", `spz-btn--${variant}`, className);
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    children,
    showArrow && /* @__PURE__ */ jsxRuntime.jsx(ArrowRight, { className: "spz-arrow" })
  ] });
  if ("href" in rest && rest.href !== void 0) {
    const anchorProps = rest;
    return /* @__PURE__ */ jsxRuntime.jsx("a", { className: cls, ...anchorProps, children: content });
  }
  const buttonProps = rest;
  return /* @__PURE__ */ jsxRuntime.jsx("button", { className: cls, type: buttonProps.type ?? "button", ...buttonProps, children: content });
}
function Kicker({ children, num, bar = true, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: cx("spz-kicker", className), children: [
    bar && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-kicker-bar", "aria-hidden": "true" }),
    num && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-kicker-num", children: num }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children })
  ] });
}
function Chip({
  children,
  variant = "default",
  active = false,
  className,
  ...rest
}) {
  const cls = cx("spz-chip", `spz-chip--${variant}`, active && "is-active", className);
  if ("href" in rest && rest.href !== void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx("a", { className: cls, ...rest, children });
  }
  const buttonProps = rest;
  return /* @__PURE__ */ jsxRuntime.jsx("button", { className: cls, type: buttonProps.type ?? "button", ...buttonProps, children });
}
function ChipGroup({ children, layout = "loose", tablist, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cx("spz-chip-group", layout === "segmented" && "spz-chip-group--segmented", className),
      role: tablist ? "tablist" : void 0,
      children
    }
  );
}
function LogoTile({ src, alt, variant = "tile", href, className }) {
  const cls = cx("spz-logo-tile", variant === "bare" && "spz-logo-tile--bare", className);
  const img = /* @__PURE__ */ jsxRuntime.jsx("img", { src, alt, loading: "lazy", decoding: "async" });
  if (href) {
    return /* @__PURE__ */ jsxRuntime.jsx("a", { className: cls, href, children: img });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cls, children: img });
}
function MetaList({ items, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("dl", { className: cx("spz-meta-list", className), children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-meta-row", children: [
    /* @__PURE__ */ jsxRuntime.jsx("dt", { children: item.term }),
    /* @__PURE__ */ jsxRuntime.jsx("dd", { children: item.description })
  ] }, i)) });
}
function Field({
  label,
  required,
  error,
  multiline,
  wide,
  className,
  inputProps
}) {
  const id = react.useId();
  const errId = `${id}-err`;
  const shared = {
    id,
    required,
    "aria-invalid": error ? true : void 0,
    "aria-describedby": error ? errId : void 0,
    ...inputProps
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cx("spz-field", wide && "spz-field--wide", className),
      "data-error": error ? "true" : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "spz-field-label", htmlFor: id, children: [
          label,
          required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-field-req", children: "*" })
        ] }),
        multiline ? /* @__PURE__ */ jsxRuntime.jsx("textarea", { ...shared }) : /* @__PURE__ */ jsxRuntime.jsx("input", { ...shared }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-field-err", id: errId, children: error })
      ]
    }
  );
}
function Form({ children, className, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx("form", { className: cx("spz-form", className), ...rest, children });
}
function FormGrid({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cx("spz-form-grid", className), children });
}
function FormFoot({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cx("spz-form-foot", className), children });
}
function CalculatorInput({
  label,
  hint,
  prefix,
  suffix,
  className,
  inputProps
}) {
  const id = react.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-calc-group", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("label", { className: "spz-calc-label", htmlFor: id, children: label }),
    hint && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-calc-hint", children: hint }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-calc-input-wrap", children: [
      prefix && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-calc-affix spz-calc-affix--prefix", children: prefix }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          id,
          className: "spz-calc-input",
          type: "number",
          inputMode: "decimal",
          ...inputProps
        }
      ),
      suffix && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-calc-affix spz-calc-affix--suffix", children: suffix })
    ] })
  ] });
}
function Panel({ children, variant = "raised", wash, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cx(
        "spz-panel",
        variant === "flat" && "spz-panel--flat",
        wash && "spz-panel--wash",
        className
      ),
      children
    }
  );
}
function ResultPanel({ label, value, breakdown, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-result", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-result-label", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-result-value", children: value }),
    breakdown && breakdown.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-result-breakdown", children: breakdown.map((row, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-result-row", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: row.label }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: row.value })
    ] }, i)) })
  ] });
}
function TldrCard({ items, label = "TL;DR", className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("aside", { className: cx("spz-tldr", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-tldr-label", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx("ul", { children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: item }, i)) })
  ] });
}
function CtaCard({ headline, sub, action = "Get in touch", href, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("a", { className: cx("spz-cta-card", className), href, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-cta-card-text", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-cta-card-headline", children: headline }),
      sub && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-cta-card-sub", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-cta-card-action", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "spz-cta-card-btn", children: [
      action,
      /* @__PURE__ */ jsxRuntime.jsx(ArrowUpRight, { size: 16 })
    ] }) })
  ] });
}
function ResourceRow({
  title,
  description,
  icon,
  href,
  cta = "Read \u2192",
  unlocked = true,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("a", { className: cx("spz-res-row", unlocked && "is-unlocked", className), href, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-res-icon", children: icon }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-res-body", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-res-text", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "spz-res-title", children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-res-desc", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-res-cta", children: cta })
    ] })
  ] });
}
function Stat({ value, title, body, tag, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-stat", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-stat-n", children: value }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "spz-stat-title", children: title }),
      body && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-stat-body", children: body })
    ] }),
    tag && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-stat-tag", children: tag })
  ] });
}
function StatRail({ children, variant = "full", columns, className }) {
  const style = columns ? { "--spz-stat-cols": columns } : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cx("spz-stat-rail", variant === "compact" && "spz-stat-rail--compact", className),
      style,
      children
    }
  );
}
function Section({
  children,
  kicker,
  num,
  title,
  lede,
  layout = "stacked",
  tight,
  id,
  className
}) {
  const hasHead = Boolean(kicker || title || lede);
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { className: cx("spz-section", tight && "spz-section--tight", className), id, children: [
    hasHead && /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: cx(
          "spz-section-head",
          layout === "split" && "spz-section-head--split",
          layout === "center" && "spz-section-head--center"
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            kicker && /* @__PURE__ */ jsxRuntime.jsx(Kicker, { num, children: kicker }),
            title && /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "spz-section-title", children: title }),
            lede && layout !== "split" && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-section-lede", children: lede })
          ] }),
          lede && layout === "split" && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-section-lede", children: lede })
        ]
      }
    ),
    children
  ] });
}
function Display({ children, as: Tag = "h1", className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(Tag, { className: cx("spz-display", className), children });
}
function ServiceCard({
  title,
  intro,
  bullets,
  icon,
  related,
  relatedLabel = "Related",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("article", { className: cx("spz-service", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-service-icon", children: icon }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "spz-service-title", children: title }),
      intro && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-service-intro", children: intro })
    ] }),
    bullets && bullets.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "spz-service-bullets", children: bullets.map((b, i) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: b }, i)) }),
    related && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-service-related", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-service-related-label", children: relatedLabel }),
      related
    ] })
  ] });
}
function FaqItem({ question, children, defaultOpen = false, className }) {
  const [open, setOpen] = react.useState(defaultOpen);
  const id = react.useId();
  const panelId = `${id}-panel`;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-faq-item", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        className: "spz-faq-header",
        type: "button",
        "aria-expanded": open,
        "aria-controls": panelId,
        onClick: () => setOpen((v) => !v),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "spz-faq-question", children: question }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-toggle", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-toggle-icon", children: open ? "\u2212" : "+" }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-faq-answer", id: panelId, children })
  ] });
}
function FaqList({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cx("spz-faq-list", className), children });
}
var TILTS = ["-6deg", "4deg", "-3deg", "7deg", "-5deg", "6deg"];
function Testimonial({ entries, defaultIndex = 0, className }) {
  const [index, setIndex] = react.useState(defaultIndex);
  const count = entries.length;
  const active = entries[index];
  const go = (delta) => setIndex((i) => (i + delta + count) % count);
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-testi", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "spz-testi-stage", children: entries.map((entry, i) => {
      const raw = Math.abs(i - index);
      const dist = Math.min(raw, count - raw);
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: cx("spz-testi-card", i === index && "is-active"),
          style: {
            "--spz-testi-tilt": TILTS[i % TILTS.length],
            zIndex: count - dist
          },
          "aria-hidden": i !== index,
          children: entry.logo && /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              className: cx("spz-testi-logo", entry.logoWide && "spz-testi-logo--wide"),
              src: entry.logo,
              alt: ""
            }
          )
        },
        i
      );
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("figure", { style: { margin: 0 }, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("figcaption", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-testi-name", children: active.name }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "spz-testi-role", children: active.role })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("blockquote", { className: "spz-testi-quote", children: active.quote })
      ] }),
      count > 1 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-testi-controls", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            className: "spz-icon-btn",
            type: "button",
            onClick: () => go(-1),
            "aria-label": "Previous testimonial",
            children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            className: "spz-icon-btn",
            type: "button",
            onClick: () => go(1),
            "aria-label": "Next testimonial",
            children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {})
          }
        )
      ] })
    ] })
  ] });
}
function Marquee({
  children,
  label,
  labelRight,
  direction = "forward",
  duration = 58,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cx("spz-marquee", className),
      style: { "--spz-marquee-dur": `${duration}s` },
      children: [
        (label || labelRight) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-wrap spz-marquee-kicker", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: labelRight })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: cx(
              "spz-marquee-track",
              direction === "reverse" && "spz-marquee-track--reverse"
            ),
            children: [
              children,
              /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", style: { display: "contents" }, children })
            ]
          }
        )
      ]
    }
  );
}
function SpeechBubble({ children, lead, sub, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cx("spz-bubble", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "spz-bubble-tail", viewBox: "0 0 30 22", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M4 20 C 6 10, 12 4, 26 2 C 18 8, 14 14, 12 21" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-bubble-body", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "spz-bubble-title", children: [
        lead && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-bubble-lead", children: lead }),
        children
      ] }),
      sub && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-bubble-sub", children: sub })
    ] })
  ] });
}
function SiteHeader({
  brand = { before: "spritz", after: "consulting" },
  role,
  items = [],
  actions,
  href = "/",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("header", { className: cx("spz-header", className), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "spz-wrap spz-header-bar", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("a", { className: "spz-wordmark", href, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
        brand.before,
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-wordmark-dot", "aria-hidden": "true" }),
        brand.after
      ] }),
      role && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-wordmark-role", children: role })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: 14 }, children: [
      items.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "spz-nav", "aria-label": "Primary", children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(
        "a",
        {
          href: item.href,
          className: cx(item.active && "is-active", item.accent && "spz-nav-accent"),
          "aria-current": item.active ? "page" : void 0,
          children: [
            item.num && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "spz-nav-num", children: item.num }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: item.label })
          ]
        },
        item.href
      )) }),
      actions
    ] })
  ] }) });
}

exports.ArrowRight = ArrowRight;
exports.ArrowUpRight = ArrowUpRight;
exports.Button = Button;
exports.CalculatorInput = CalculatorInput;
exports.ChevronLeft = ChevronLeft;
exports.ChevronRight = ChevronRight;
exports.Chip = Chip;
exports.ChipGroup = ChipGroup;
exports.CtaCard = CtaCard;
exports.Display = Display;
exports.FaqItem = FaqItem;
exports.FaqList = FaqList;
exports.Field = Field;
exports.Form = Form;
exports.FormFoot = FormFoot;
exports.FormGrid = FormGrid;
exports.Kicker = Kicker;
exports.LogoTile = LogoTile;
exports.Marquee = Marquee;
exports.MetaList = MetaList;
exports.Panel = Panel;
exports.ResourceRow = ResourceRow;
exports.ResultPanel = ResultPanel;
exports.Section = Section;
exports.ServiceCard = ServiceCard;
exports.SiteHeader = SiteHeader;
exports.SpeechBubble = SpeechBubble;
exports.SpritzRoot = SpritzRoot;
exports.Stat = Stat;
exports.StatRail = StatRail;
exports.Testimonial = Testimonial;
exports.TldrCard = TldrCard;
exports.Wrap = Wrap;
