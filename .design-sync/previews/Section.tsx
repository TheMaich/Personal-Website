import { Section, Display, Button } from "@spritz/design-system";

export const Stacked = () => (
  <Section
    tight
    kicker="Services"
    num="02"
    title={
      <>
        What I actually <em>do</em>
      </>
    }
    lede="Production and publishing support for teams that have to ship something real, on a budget that already exists."
  />
);

export const Split = () => (
  <Section
    tight
    layout="split"
    kicker="FAQ"
    num="03"
    title={
      <>
        The questions <em>everyone</em> asks
      </>
    }
    lede="Rates, scope, how engagements start, and what happens when a publisher goes quiet."
  />
);

export const Centered = () => (
  <Section
    tight
    layout="center"
    kicker="Testimonials"
    title={
      <>
        People I've <em>shipped</em> with
      </>
    }
  />
);

export const WithDisplay = () => (
  <Section tight kicker="Home" num="01">
    <Display>
      Ship the game, <em>not the excuses</em>.
    </Display>
    <div style={{ marginTop: 28 }}>
      <Button href="#">Book a call</Button>
    </div>
  </Section>
);
