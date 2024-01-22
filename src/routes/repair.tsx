import { useMutation, useQuery } from "convex/react"
import ItemCreate from "../components/item-create"
import { api } from "../../convex/_generated/api"
import { useForm } from "react-hook-form"
import { Doc } from "../../convex/_generated/dataModel"

export default function Repair() {
	const handleDialog = (elementId: string) => {
		const dialog = document.getElementById(elementId) as HTMLDialogElement
		dialog.showModal()
	}

	const items = useQuery(api.items.get)

	const createTask = useMutation(api.tasks.create)
	const { register, handleSubmit } = useForm()
	const onSubmit = handleSubmit((data) => {
		data.type = "repair"
		const task = data as Doc<"tasks">
		console.log(task)

		try {
			createTask(task)
		} catch (err) {
			console.error(err)
		}
	})

	return (
		<>
			<dialog id="create-item" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="text-center btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✗
						</button>
					</form>
					<h3 className="font-bold text-lg">Add weapon</h3>
					<p className="py-4">
						<ItemCreate />
					</p>
				</div>
			</dialog>

			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">Request repair service</h2>

					<form onSubmit={onSubmit} className="flex flex-col gap-4">
						<div className="flex flex-wrap gap-2 items-end">
							<label className="flex-grow form-control">
								<div className="label">
									<span className="label-text">My weapons</span>
								</div>
								<select
									{...register("item")}
									className="select select-bordered"
									required
								>
									<option value="" disabled selected>
										Select weapon
									</option>
									{items?.map(({ _id, name, level }) => (
										<option key={_id} value={_id}>
											{name} {level ? `+${level}` : null}
										</option>
									))}
								</select>
							</label>
							<button
								className="btn btn-outline"
								onClick={() => handleDialog("create-item")}
							>
								Add weapon
							</button>
						</div>
						<label className="form-control">
							<div className="label">
								<span className="label-text">How did you break it?</span>
							</div>
							<textarea
								{...register("description")}
								className="textarea textarea-bordered"
								placeholder="I missed my foe and hit the wall instead :/"
								required
							></textarea>
						</label>

						<div className="card-actions justify-end">
							<button className="btn btn-primary">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
