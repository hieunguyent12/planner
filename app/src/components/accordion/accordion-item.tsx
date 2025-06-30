import { cn } from "@/utilts/cn";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { useState } from "react";

function AccordionItem({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
}) {
  const [toggled, setToggle] = useState(false);

  return (
    <BaseAccordion.Item>
      <BaseAccordion.Header>
        <BaseAccordion.Trigger
          onClick={() => setToggle((prev) => !prev)}
          className={cn(
            "group border rounded-md accordion-trigger",
            toggled && "rounded-b-none border-b-0"
          )}
        >
          {trigger}
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="accordion-panel">
        {content}
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}

export { AccordionItem };
