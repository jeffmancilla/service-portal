import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import TimeAgo from "timeago-react"
import useStoreUserEffect from "../hooks/useStoreUserEffect"

export default function MessageList({ taskId }: { taskId: Id<"tasks"> }) {
	const userId = useStoreUserEffect()
	const messages = useQuery(api.messages.getFromTask, { to: taskId })
	console.log(messages)

	const applyUserStyles = (div: string, id: Id<"users">) => {
		if (id === userId) {
			if (div === "chat") {
				return "chat-end"
			} else if (div === "chat-bubble") {
				return "chat-bubble-primary"
			}
		} else {
			if (div === "chat") {
				return "chat-start"
			}
		}
	}

	return (
		<div className="flex flex-col gap-2">
			{messages?.map(({ _id, from, fromName, text, _creationTime }) => (
				<div key={_id} className={`chat ${applyUserStyles("chat", from)}`}>
					<div className="chat-header">
						{fromName}
						<time className="ml-2 text-xs opacity-50">
							<TimeAgo datetime={_creationTime} opts={{ minInterval: 60 }} />
						</time>
					</div>
					<div
						className={`chat-bubble ${applyUserStyles("chat-bubble", from)}`}
					>
						{text}
					</div>
				</div>
			))}
		</div>
	)
}
