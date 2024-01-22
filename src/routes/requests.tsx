import { Authenticated, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MessageList from "../components/message-list"
import MessageSend from "../components/message-send"
import useStoreUserEffect from "../hooks/useStoreUserEffect"

export default function Requests() {
	const userId = useStoreUserEffect()
	const argsUserId = userId ? { userId: userId } : "skip"
	const openRequests = useQuery(api.tasks.getOpen, argsUserId)
	const closedRequests = useQuery(api.tasks.getClosed, argsUserId)

	return (
		<div className="flex flex-col gap-4">
			<Authenticated>
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title leading">
							Open
							<div className="badge badge-info">{openRequests?.length}</div>
						</h2>
						{openRequests?.map(
							({
								_id,
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
											<div className="badge badge-neutral">
												{type.toUpperCase()}
											</div>
											<span className="ml-2">{itemName}</span>
										</div>
										<div>{new Date(_creationTime).toLocaleDateString()}</div>
									</div>
									<div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
										<div className="card-body">
											<h2 className="card-title">Request details</h2>
											<div className="flex flex-wrap justify-between gap-4">
												<div>
													<div>
														<span className="font-bold">Updated: </span>
														{updated ? (
															new Date(updated).toLocaleString()
														) : (
															<span className="font-light">(never)</span>
														)}
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
							<div className="badge badge-ghost">{closedRequests?.length}</div>
						</h2>
						{closedRequests?.map(
							({
								_id,
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
									<div className="flex gap-2 items-center justify-between  collapse-title bg-base-200 text-base-content peer-checked:bg-base-200 peer-checked:text-base-content">
										<div>
											<div className="badge badge-ghost">
												{type.toUpperCase()}
											</div>
											<span className="ml-2">{itemName}</span>
										</div>
										<div>{new Date(_creationTime).toLocaleDateString()}</div>
									</div>
									<div className="collapse-content bg-base-200 text-base-content peer-checked:bg-base-200 peer-checked:text-base-content">
										<div className="card-body">
											<h2 className="card-title">Request details</h2>
											<div className="flex flex-wrap justify-between gap-4">
												<div>
													<div>
														<span className="font-bold">Updated: </span>
														{updated ? (
															new Date(updated).toLocaleString()
														) : (
															<span className="font-light">(never)</span>
														)}
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
