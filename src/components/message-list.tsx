import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"
import { Card } from "@/components/ui/card"
import TimeAgo from "timeago-react" // var TimeAgo = require('timeago-react');
import { CalendarClock } from "lucide-react"

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
						<div className="flex gap-1 items-center text-xs text-muted-foreground">
							<CalendarClock size="1rem"/>
							<TimeAgo datetime={_creationTime} />
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}

export default MessageList
