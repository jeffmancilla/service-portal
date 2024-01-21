import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MessageCreate from "../components/message-create"
import MessageList from "@/components/message-list"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const Requests = () => {
	const tasks = useQuery(api.tasks.getList)

	return (
		<Accordion type="single" collapsible>
			{tasks?.map(
				({
					_id,
					itemLabel,
					agent,
					type,
					state,
					description,
					_creationTime,
				}) => (
					<AccordionItem key={_id} value={_id}>
						<AccordionTrigger className="">
							<div className="flex gap-4">
								<span className="font-light">
									{new Date(_creationTime).toLocaleDateString()}
								</span>
								<span>{itemLabel}</span>
								<Badge variant="secondary">{type}</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="flex flex-wrap gap-8">
							<Card className="rounded-lg bg-secondary self-start flex-auto">
								<CardHeader>
									<CardTitle>Request details</CardTitle>
									<Separator />
								</CardHeader>
								<CardContent>
									<div className="mb-4">
										<div>
											<Label className="font-bold">State: </Label>
											{state}
										</div>
										<div>
											<Label className="font-bold">Assigned to: </Label>
											{agent ? (
												agent
											) : (
												<span className="text-muted-foreground">none</span>
											)}
										</div>
									</div>
									<div>
										<Label className="font-bold">Description: </Label>
										<p>{description}</p>
									</div>
									<div></div>
								</CardContent>
							</Card>
							<Card className="rounded-lg bg-background flex-auto">
								<CardHeader>
									<CardTitle>Chat</CardTitle>
									<Separator />
								</CardHeader>

								<CardContent className="min-w-72">
									<MessageList taskId={_id} />
									<Separator className="my-2" />
									<MessageCreate taskId={_id} />
								</CardContent>
							</Card>
						</AccordionContent>
					</AccordionItem>
				)
			)}
		</Accordion>
	)
}
export default Requests
