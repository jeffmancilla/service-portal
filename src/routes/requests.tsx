import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

import { useUser } from "@clerk/clerk-react"

const Requests = () => {
	const tasks = useQuery(api.tasks.get)
	const users = useQuery(api.users.get)
	const user = useUser()
	console.log(user)

	return (
		<Accordion type="single" defaultValue="item-1" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it accessible?</AccordionTrigger>
				<AccordionContent>
					{tasks?.map(({ _id, item, agent, type, _creationTime }) => (
						<div key={_id}>
							<h4>
								{type}: {item}
							</h4>
							{agent ? <div>Assigned {agent}</div> : null}
							<div>{_creationTime}</div>
						</div>
					))}
					{users?.map(({ _id, name, role }) => (
						<div key={_id}>
							<div>
								{name}, {role}
							</div>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default Requests
