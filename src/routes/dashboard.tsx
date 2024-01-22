import { Authenticated, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MessageList from "../components/message-list"
import MessageSend from "../components/message-send"
import useStoreUserEffect from "../hooks/useStoreUserEffect"
import TaskAssignButton from "../components/task-assign-button"
import TaskCancelButton from "../components/task-cancel-button"

export default function Dashboard() {
	const userId = useStoreUserEffect()
	const ArgsUserId = userId ? { userId: userId } : "skip"
	const unassignedTasks = useQuery(api.tasks.getUnassigned, ArgsUserId)
	const assignedTasks = useQuery(api.tasks.getAssigned, ArgsUserId)
	// const allActiveTasks = useQuery(api.tasks.getActive, ArgsUserId)

	return (
		<>
				<h2>Unassigned</h2>
			<Authenticated>
				{unassignedTasks?.map(
					({
						_id,
						customerName,
						agentName,
						itemName,
						type,
						state,
						description,
						_creationTime,
						updated,
					}) => (
						<div key={_id} className="collapse collapse-arrow bg-base-200 mb-2">
							<input type="checkbox" className="peer" />
							<div className="flex gap-2 items-center justify-between  collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div>
									<span className="ml-2 font-medium">{customerName}</span>
									<span className="ml-2">{itemName}</span>
								</div>
								<div className="badge badge-neutral">{type.toUpperCase()}</div>
							</div>
							<div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div className="card-body">
									<h2 className="card-title">Request details</h2>
									<div className="flex flex-wrap justify-between gap-4">
										<div>
											<div>
												<span className="font-bold">Customer: </span>
												{customerName}
											</div>
											<div>
												<span className="font-bold">Assigned to: </span>
												{agentName ? (
													agentName
												) : (
													<span className="font-light">(not yet assigned)</span>
												)}
											</div>
											<div>
												<span className="font-bold">State: </span>
												{state}
											</div>
											<div>
												<span className="font-bold">Description: </span>
												<p>{description}</p>
											</div>
										</div>
										<div>
											<div>
												<span className="font-bold">Created: </span>
												{new Date(_creationTime).toLocaleString()}
											</div>
											<div>
												<span className="font-bold">Updated: </span>
												{updated ? (
													new Date(updated).toLocaleString()
												) : (
													<span className="font-light">(never)</span>
												)}
											</div>
											<div className="mt-4 flex gap-2">
												<TaskAssignButton taskId={_id} />
												<TaskCancelButton taskId={_id} />
											</div>
										</div>
									</div>
									<hr className="my-4" />
									<h3 className="flex-grow text-lg font-medium">Chat</h3>
									<MessageList taskId={_id} />
									<MessageSend taskId={_id} />
								</div>
							</div>
						</div>
					)
				)}
			</Authenticated>
		<h2>Assigned to Me</h2>
			<Authenticated>
				{assignedTasks?.map(
					({
						_id,
						customerName,
						agentName,
						itemName,
						type,
						state,
						description,
						_creationTime,
						updated,
					}) => (
						<div key={_id} className="collapse collapse-arrow bg-base-200 mb-2">
							<input type="checkbox" className="peer" />
							<div className="flex gap-2 items-center justify-between  collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div>
									<span className="ml-2 font-medium">{customerName}</span>
									<span className="ml-2">{itemName}</span>
								</div>
								<div className="badge badge-neutral">{type.toUpperCase()}</div>
							</div>
							<div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
								<div className="card-body">
									<h2 className="card-title">Request details</h2>
									<div className="flex flex-wrap justify-between gap-4">
										<div>
											<div>
												<span className="font-bold">Customer: </span>
												{customerName}
											</div>
											<div>
												<span className="font-bold">Assigned to: </span>
												{agentName ? (
													agentName
												) : (
													<span className="font-light">(not yet assigned)</span>
												)}
											</div>
											<div>
												<span className="font-bold">State: </span>
												{state}
											</div>
											<div>
												<span className="font-bold">Description: </span>
												<p>{description}</p>
											</div>
										</div>
										<div>
											<div>
												<span className="font-bold">Created: </span>
												{new Date(_creationTime).toLocaleString()}
											</div>
											<div>
												<span className="font-bold">Updated: </span>
												{updated ? (
													new Date(updated).toLocaleString()
												) : (
													<span className="font-light">(never)</span>
												)}
											</div>
											<div className="mt-4 flex gap-2">
												<TaskAssignButton taskId={_id} />
												<TaskCancelButton taskId={_id} />
											</div>
										</div>
									</div>
									<hr className="my-4" />
									<h3 className="flex-grow text-lg font-medium">Chat</h3>
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
