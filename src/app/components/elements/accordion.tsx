import {
    Accordion as RelumeAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@relume_io/relume-ui";

type AccordionItemData = {
    title: string;
    content: string;
    value: string;
};

const Accordion = ({ data }: { data: AccordionItemData[] }) => {
    return (
        <RelumeAccordion type='single' collapsible>
            {data.map((item: AccordionItemData) => (
                <AccordionItem value={item.value}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </RelumeAccordion>
    );
}

export default Accordion;