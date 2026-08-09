import { FaqItem, FaqList } from "@spritz/design-system";

export const Open = () => (
  <FaqList>
    <FaqItem question="What does a production consultant actually do?" defaultOpen>
      <p>
        I sit on your side of the table. That means reading the deal, sanity-checking the
        schedule, and telling you which risks are real and which ones you can live with.
      </p>
    </FaqItem>
  </FaqList>
);

export const Closed = () => (
  <FaqList>
    <FaqItem question="How much does it cost?">
      <p>Day rate or fixed scope, depending on the engagement.</p>
    </FaqItem>
  </FaqList>
);

export const List = () => (
  <FaqList>
    <FaqItem question="What does a production consultant actually do?" defaultOpen>
      <p>
        I sit on your side of the table — reading the deal, sanity-checking the schedule,
        and telling you which risks are real.
      </p>
    </FaqItem>
    <FaqItem question="How much does it cost?">
      <p>Day rate or fixed scope, depending on the engagement.</p>
    </FaqItem>
    <FaqItem question="What if my publisher goes quiet?">
      <p>It happens more than anyone admits. There is usually a reason, and a next move.</p>
    </FaqItem>
  </FaqList>
);
