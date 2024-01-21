import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"
import { Card } from "@/components/ui/card"
import TimeAgo from "timeago-react"
import { CalendarClock } from "lucide-react"

const MessageList = ({ taskId }: { taskId: Id<"tasks"> }) => {
	const userId = useStoreUserEffect()
	const messages = useQuery(api.messages.getFromTask, { to: taskId })

	const applyUserStyles = (id: Id<"users">) => {
		if (id === userId) {
			return "bg-primary text-primary-foreground self-end"
		} else {
			return undefined
		}
	}
	return (
		<div className="flex flex-col items-baseline gap-2">
			{messages?.map(({ _id, from, text, _creationTime }) => (
				<Card key={_id} className={`${applyUserStyles(from)}`}>
					<div className="px-4 py-2">
						<h4>{from}</h4>
						<p>{text}</p>
						<div className={`flex gap-1 mt-1 text-xs ${applyUserStyles(from)}`}>
							<CalendarClock size="1rem" />
							<TimeAgo datetime={_creationTime} opts={{ minInterval: 60 }} />
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}

export default MessageList
