import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const RequestsByState = () => {
	return (
		<Accordion type="multiple">
			<AccordionItem value="open">
				<AccordionTrigger>Open</AccordionTrigger>
				<AccordionContent>
					Yes. It adheres to the WAI-ARIA design pattern.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="closed">
				<AccordionTrigger>Closed</AccordionTrigger>
				<AccordionContent>
					Yes. It adheres to the WAI-ARIA design pattern.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default RequestsByState
