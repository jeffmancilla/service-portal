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
import MessageCreate from "../components/message-create"
import MessageList from "@/components/message-list"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
 

const Requests = () => {
	const userId = useStoreUserEffect() as Id<"users">
	const userIdObj = userId ? { user: userId } : {}
	const tasks = useQuery(api.tasks.get, userIdObj)

	return (
		<Accordion type="single" collapsible>
			{tasks?.map(
				({ _id, item, agent, type, state, description, _creationTime }) => (
					<AccordionItem key={_id} value={_id}>
						<AccordionTrigger className="flex-wrap">
							<span>{new Date(_creationTime).toLocaleDateString()}</span>
							<span>{item}</span>
							<Badge>{type}</Badge>
						</AccordionTrigger>

						<AccordionContent className="m-4">
							<div>
								<Label>State: </Label>
								{state}
							</div>
							<div>
								<Label>Assigned to: </Label>
								{agent ? (
									agent
								) : (
									<span className="text-muted-foreground">none</span>
								)}
							</div>
							<div>
								<Label>Description: </Label>
								{description}
							</div>
							<MessageList taskId={_id} />
							<MessageCreate taskId={_id} />
						</AccordionContent>
					</AccordionItem>
				)
			)}
		</Accordion>
	)
}
export default Requests
