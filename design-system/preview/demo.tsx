import { createRoot } from "react-dom/client";
import {
  SpritzRoot,
  Wrap,
  SiteHeader,
  Section,
  Display,
  Button,
  Kicker,
  Chip,
  ChipGroup,
  LogoTile,
  Marquee,
  MetaList,
  Panel,
  Field,
  Form,
  FormGrid,
  FormFoot,
  CalculatorInput,
  ResultPanel,
  TldrCard,
  CtaCard,
  ResourceRow,
  Stat,
  StatRail,
  ServiceCard,
  FaqItem,
  FaqList,
  Testimonial,
  SpeechBubble,
} from "../src/index";

const logos = [
  "logo-rawfury.png",
  "logo-rebellion.png",
  "logo-untoldgames.png",
  "logo-milestone.png",
  "logo-34bigthings.png",
  "logo-bippinbits.png",
].map((f) => `/assets/${f}`);

const DocIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const ChartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m7 15 4-4 3 3 5-6" />
  </svg>
);

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "40px 0", borderTop: "1px solid var(--spz-rule)" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker num="—">{title}</Kicker>
      </div>
      {children}
    </div>
  );
}

function Demo({ theme }: { theme: "dark" | "light" }) {
  return (
    <SpritzRoot theme={theme} aurora grain>
      <SiteHeader
        role="Production & Publishing"
        items={[
          { label: "Experience", href: "#1", num: "01" },
          { label: "Services", href: "#2", num: "02" },
          { label: "FAQ", href: "#3", num: "03" },
          { label: "Contact", href: "#4", num: "04", active: true },
          { label: "Resources ↗", href: "#5", accent: true },
        ]}
      />

      <Wrap>
        <Section tight kicker="Preview" num="00" title={<>Component <em>gallery</em></>} lede="Every exported component, rendered from the built library.">
          <Row title="Display + Buttons">
            <Display>Ship the game, <em>not the excuses</em>.</Display>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Button href="#">Book a call</Button>
              <Button variant="ghost" href="#">Read the FAQ</Button>
              <Button variant="primary" arrow={false}>No arrow</Button>
            </div>
          </Row>

          <Row title="Chips">
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
              <ChipGroup layout="segmented" tablist>
                <Chip variant="filter" active>All</Chip>
                <Chip variant="filter">Articles</Chip>
                <Chip variant="filter">Tools</Chip>
              </ChipGroup>
              <ChipGroup>
                <Chip variant="preset">250K</Chip>
                <Chip variant="preset" active>500K</Chip>
                <Chip variant="preset">1M</Chip>
              </ChipGroup>
              <ChipGroup>
                <Chip href="#">Recoup calculator</Chip>
                <Chip href="#">Pitch deck template</Chip>
              </ChipGroup>
            </div>
          </Row>

          <Row title="Panel + MetaList + SpeechBubble">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
              <Panel wash>
                <MetaList
                  items={[
                    { term: "Based in", description: "Turin, Italy" },
                    { term: "Focus", description: <>Production &amp; <em>publishing</em></> },
                    { term: "Availability", description: "Q3 2026" },
                  ]}
                />
              </Panel>
              <div style={{ paddingTop: 24 }}>
                <SpeechBubble lead="Hola" sub="let's talk about your deal">— I'm Michele</SpeechBubble>
              </div>
            </div>
          </Row>

          <Row title="StatRail">
            <StatRail>
              <Stat value="10" title="Years in games" body="Production and publishing, both sides of the table." tag="Since 2016" />
              <Stat value="40+" title="Titles shipped" body="From two-person teams to 60-strong studios." tag="Console + PC" />
              <Stat value="12" title="Deals reviewed" body="Term sheets read line by line before signing." tag="2025" />
              <Stat value="3x" title="Median uplift" body="On renegotiated recoup terms." tag="Measured" />
            </StatRail>
            <div style={{ marginTop: 24 }}>
              <StatRail variant="compact">
                <Stat value="10" title="Years" />
                <Stat value="40+" title="Titles" />
              </StatRail>
            </div>
          </Row>

          <Row title="ServiceCard">
            <ServiceCard
              icon={ChartIcon}
              title="Publishing deal review"
              intro="Line-by-line read of the term sheet before you sign anything."
              bullets={["Recoup structure", "Net vs gross definitions", "Territory + platform splits", "Milestone schedule", "Termination clauses", "IP ownership"]}
              related={<><Chip href="#">Recoup calculator</Chip><Chip href="#">What 50/50 means</Chip></>}
            />
          </Row>

          <Row title="FAQ">
            <FaqList>
              <FaqItem question="What does a production consultant actually do?" defaultOpen>
                <p>I sit on your side of the table. That means reading the deal, sanity-checking the schedule, and telling you which risks are real.</p>
              </FaqItem>
              <FaqItem question="How much does it cost?">
                <p>Day rate or fixed scope, depending on the engagement.</p>
              </FaqItem>
            </FaqList>
          </Row>

          <Row title="Testimonial">
            <Testimonial
              entries={[
                { name: "Michele B.", role: "Studio Director, Untold Games", quote: "He asked the two questions our publisher hoped we wouldn't.", logo: "/assets/logo-untoldgames.png", logoWide: true },
                { name: "Andrea R.", role: "Producer, 34BigThings", quote: "Turned a vague milestone plan into something we could actually hit.", logo: "/assets/logo-34bigthings.png" },
                { name: "Sam T.", role: "Founder, BippinBits", quote: "Saved us a full quarter of runway on the recoup terms alone.", logo: "/assets/logo-bippinbits.png" },
              ]}
            />
          </Row>

          <Row title="Calculator: input + presets + result">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
              <div style={{ display: "grid", gap: 16 }}>
                <CalculatorInput
                  label="Development Budget"
                  hint="Total spend to ship — staff + outsourcing + tools + audio + QA."
                  prefix="USD $"
                  suffix=".00"
                  inputProps={{ placeholder: "500,000", defaultValue: 500000 }}
                />
                <ChipGroup>
                  <Chip variant="preset">250K</Chip>
                  <Chip variant="preset" active>500K</Chip>
                  <Chip variant="preset">1M</Chip>
                  <Chip variant="preset">2M</Chip>
                </ChipGroup>
              </div>
              <ResultPanel
                label="Marketing budget"
                value="$125,000"
                breakdown={[
                  { label: "Rate", value: "25% of budget" },
                  { label: "Recoup units @ $20", value: "6,250" },
                ]}
              />
            </div>
          </Row>

          <Row title="TldrCard + CtaCard">
            <TldrCard
              items={[
                "The headline split number is not the deal.",
                "Recoup terms set who actually earns first.",
                "Net definitions hide most of the value.",
              ]}
            />
            <div style={{ marginTop: 32 }}>
              <CtaCard headline="Sharper read on your deal? Book a call." sub="Thirty minutes, no pitch." href="#" />
            </div>
          </Row>

          <Row title="ResourceRow">
            <div>
              <ResourceRow
                icon={DocIcon}
                title="What a publisher actually reads in your pitch deck"
                description="A publisher isn't evaluating only your game. They're building a risk model."
                href="#"
              />
              <ResourceRow
                icon={ChartIcon}
                title="Publishing recoup calculator"
                description="Model when you actually start earning under a given recoup structure."
                href="#"
                cta="Open tool →"
              />
            </div>
          </Row>

          <Row title="Form">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGrid>
                <Field label="Name" required inputProps={{ placeholder: "Jane Doe" }} />
                <Field label="Studio" inputProps={{ placeholder: "Untold Games" }} />
                <Field label="Email" required error="Enter a valid email" inputProps={{ placeholder: "jane@studio.com" }} />
                <Field label="Budget" inputProps={{ placeholder: "€250k" }} />
                <Field label="What's going on?" multiline wide inputProps={{ placeholder: "Tell me about the deal…" }} />
              </FormGrid>
              <FormFoot>
                <small>Replies within 2 working days</small>
                <Button>Send it</Button>
              </FormFoot>
            </Form>
          </Row>
        </Section>
      </Wrap>

      <Marquee label="Trusted by" labelRight="2016 — 2026">
        {logos.map((src) => (
          <LogoTile key={src} src={src} alt="" />
        ))}
      </Marquee>
    </SpritzRoot>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <Demo theme="dark" />
    <Demo theme="light" />
  </>
);
