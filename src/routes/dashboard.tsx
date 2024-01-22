import { Authenticated, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MessageList from "../components/message-list"
import MessageSend from "../components/message-send"
import useStoreUserEffect from "../hooks/useStoreUserEffect"
import TaskAssignButton from "../components/task-assign-button"
import TaskCancelButton from "../components/task-cancel-button"
import TaskCompleteButton from "../components/task-complete-button"

export default function Dashboard() {
	const userId = useStoreUserEffect()
	const ArgsUserId = userId ? { userId: userId } : "skip"
	const unassignedTasks = useQuery(api.tasks.getUnassigned, ArgsUserId)
	const assignedTasks = useQuery(api.tasks.getAssigned, ArgsUserId)
	const inactiveTasks = useQuery(api.tasks.getInactive, ArgsUserId)

	return (
		<div className="flex flex-col gap-4">
			<Authenticated>
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title leading">
							Unassigned
							<div className="badge badge-info">{unassignedTasks?.length}</div>
						</h2>
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
								<div
									key={_id}
									className="collapse collapse-arrow bg-base-200 mb-2"
								>
									<input type="checkbox" className="peer" />
									<div className="flex gap-2 items-center justify-between  collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
										<div>
											<span className="ml-2 font-medium">{customerName}</span>
											<span className="ml-2">{itemName}</span>
										</div>
										<div className="badge badge-neutral">
											{type.toUpperCase()}
										</div>
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
															<span className="font-light">
																(not yet assigned)
															</span>
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
											<h3 className="mt-6 flex-grow text-lg font-medium">
												Chat
											</h3>
											<MessageList taskId={_id} />
											<MessageSend taskId={_id} />
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title leading">
							Assigned to Me
							<div className="badge badge-success">{assignedTasks?.length}</div>
						</h2>
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
								<div
									key={_id}
									className="collapse collapse-arrow bg-base-200 mb-2"
								>
									<input type="checkbox" className="peer" />
									<div className="flex gap-2 items-center justify-between  collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
										<div>
											<span className="ml-2 font-medium">{customerName}</span>
											<span className="ml-2">{itemName}</span>
										</div>
										<div className="badge badge-neutral">
											{type.toUpperCase()}
										</div>
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
															<span className="font-light">
																(not yet assigned)
															</span>
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
														<TaskCompleteButton taskId={_id} />
														<TaskCancelButton taskId={_id} />
													</div>
												</div>
											</div>
											<h3 className="mt-6 flex-grow text-lg font-medium">
												Chat
											</h3>
											<MessageList taskId={_id} />
											<MessageSend taskId={_id} />
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title leading">
							Closed
							<div className="badge badge-ghost">{inactiveTasks?.length}</div>
						</h2>
						{inactiveTasks?.map(
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
								<div
									key={_id}
									className="collapse border border-base-300 collapse-arrow bg-base-100 mb-2"
								>
									<input type="checkbox" className="peer" />
									<div className="flex gap-2 items-center justify-between  collapse-title bg-base-100 text-base-content peer-checked:bg-base-100 peer-checked:text-base-content">
										<div>
											<span className="ml-2 font-medium">{customerName}</span>
											<span className="ml-2">{itemName}</span>
										</div>
										<div className="badge badge-ghost">
											{type.toUpperCase()}
										</div>
									</div>
									<div className="collapse-content bg-base-100 text-base-content peer-checked:bg-base-100 peer-checked:text-base-content">
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
															<span className="font-light">
																(not yet assigned)
															</span>
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
													<div className="mt-4 flex gap-2"></div>
												</div>
											</div>
											<h3 className="mt-6 flex-grow text-lg font-medium">
												Chat
											</h3>
											<MessageList taskId={_id} />
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</Authenticated>
		</div>
	)
}
