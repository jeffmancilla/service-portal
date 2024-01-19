import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"
import { Card } from "@/components/ui/card"

const MessageList = ({ taskId }: { taskId: Id<"tasks"> }) => {
	const userId = useStoreUserEffect() as Id<"users">
	const messages = useQuery(api.messages.getFromTask, { task: taskId })
	console.log(userId)
	return (
		<div className="flex flex-col items-baseline gap-2">
			{messages?.map(({ _id, from, text, _creationTime }) => (
				<Card key={_id}>
					<div className="mx-4 my-2 flex-shrink">
						<h4>{from}</h4>
						<p>{text}</p>
						<span>{_creationTime}</span>
					</div>
				</Card>
			))}
		</div>
	)
}

export default MessageList
