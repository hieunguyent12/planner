import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { AccordionItem } from "./accordion-item";
import "./styles.css";

function Accordion({
  children,
  items,
}: {
  children?: React.ReactNode;
  items: { trigger: React.ReactNode; content: React.ReactNode }[];
}) {
  return (
    <BaseAccordion.Root className="flex flex-col justify-center text-gray-900">
      {children
        ? children
        : items.map((item) => (
            <AccordionItem trigger={item.trigger} content={item.content} />
          ))}
    </BaseAccordion.Root>
  );
}

export { Accordion };
