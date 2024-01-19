import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"

const Requests = () => {
	const userId = useStoreUserEffect() as Id<"users">
	const userIdObj = userId ? { user: userId } : {}
	const tasks = useQuery(api.tasks.get, userIdObj)

	return (
		<Accordion type="single" collapsible>
			{tasks?.map(({ _id, item, agent, type, state, _creationTime }) => (
				<AccordionItem key={_id} value="{_id}">
					<AccordionTrigger>
						{item} ({type})
					</AccordionTrigger>

					<AccordionContent>
						<div>
							<span className="font-medium">Created: </span>
							{_creationTime}
						</div>
						<div>
							<span className="font-medium">State: </span>
							{state}
						</div>
						<div>
							<span className="font-medium">Assigned: </span>
							{agent ? agent : "unassigned"}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
export default Requests
