import { Authenticated, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MessageList from "../components/message-list"
import MessageSend from "../components/message-send"
import useStoreUserEffect from "../hooks/useStoreUserEffect"

export default function AgentDashboard() {
	const userId = useStoreUserEffect()
	const ArgsUserId = userId ? { userId: userId } : "skip"
	const tasks = useQuery(api.tasks.getActive, ArgsUserId)

	return (
		<>
			<Authenticated>
				{tasks?.map(
					({
						_id,
						agent,
						itemLabel,
						type,
						state,
						description,
						_creationTime,
					}) => (
						<div key={_id} className="collapse collapse-arrow bg-base-200 mb-2">
							<input type="checkbox" className="peer" />
							<div className="flex gap-2 items-center justify-between  collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div>
									<div className="badge badge-neutral">
										{type.toUpperCase()}
									</div>
									<span className="ml-2">{itemLabel}</span>
								</div>
								<span className="font-light">
									{new Date(_creationTime).toLocaleDateString()}
								</span>
							</div>
							<div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div className="card-body">
									<h2 className="card-title">Request details</h2>
									<div>
										<span className="font-bold">State: </span>
										{state}
									</div>
									<div>
										<span className="font-bold">Blacksmith: </span>
										{agent ? (
											agent
										) : (
											<span className="text-">(not yet assigned)</span>
										)}
									</div>
									<div>
										<span className="font-bold">Description: </span>
										<p>{description}</p>
									</div>
									<hr className="my-4"/>
									<MessageList taskId={_id} />
									<MessageSend taskId={_id} />
								</div>
							</div>
						</div>
					)
				)}
			</Authenticated>
		</>
	)
}
