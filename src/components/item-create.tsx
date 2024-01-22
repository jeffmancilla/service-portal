import { useForm } from "react-hook-form"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Doc } from "../../convex/_generated/dataModel"

export default function ItemCreate() {
	const createItem = useMutation(api.items.create)
	const { register, handleSubmit } = useForm()

	const handleDialog = (elementId: string) => {
		const dialog = document.getElementById(elementId) as HTMLDialogElement
		if (!dialog.hasAttribute("open")) {
			dialog.showModal()
		} else {
			dialog.close()
		}
	}

	const onSubmit = handleSubmit((data) => {
		data.level = !data.level ? 0 : parseInt(data.level)
		const item = data as Doc<"items">
		createItem(item)
		handleDialog("create-item")
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
					<form onSubmit={onSubmit} className="flex flex-col gap-4">
						<label className="form-control w-full ">
							<div className="label">
								<span className="label-text">Name</span>
							</div>
							<input
								{...register("name")}
								type="text"
								placeholder="Claymore"
								className="input input-bordered w-full"
								required
							/>
						</label>
						<div className="flex gap-4">
							<label className="flex-shrink form-control w-full">
								<div className="label">
									<span className="label-text">Level</span>
								</div>
								<input
									{...register("level")}
									type="number"
									id="level"
									placeholder="0"
									min="1"
									max="8"
									className="input input-bordered w-full"
								/>
							</label>
							<label className="flex-grow form-control w-full ">
								<div className="label">
									<span className="label-text">Type</span>
								</div>
								<select
									{...register("type")}
									className="block select select-bordered w-full"
									defaultValue=""
									required
								>
									<option value="" disabled>
										Select one
									</option>
									<option value="slashing">Slashing</option>
									<option value="striking">Striking</option>
									<option value="piercing">Piercing</option>
								</select>
							</label>
						</div>

						<button className="place-self-end btn btn-outline">
							Add weapon
						</button>
					</form>
				</div>
			</dialog>
		</>
	)
}
