import { useForm } from "react-hook-form"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Doc } from "../../convex/_generated/dataModel"
import { useState } from "react"

export default function ItemCreate() {
	const [convexError, setConvexError] = useState("")
	const createItem = useMutation(api.items.create)
	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit((data) => {
		data.level = !data.level ? 0 : parseInt(data.level)
		const item = data as Doc<"items">
		try {
			createItem(item)
		} catch (error) {
			setConvexError(error as string)
		}
	})

	return (
		<>
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
					<label className="flex-shrink form-control w-full ">
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
							className="block select select-bordered w-full "
							required
						>
							<option value="" disabled selected>
								Select one
							</option>
							<option value="slashing">Slashing</option>
							<option value="striking">Striking</option>
							<option value="piercing">Piercing</option>
						</select>
					</label>
				</div>

				<button className="place-self-end btn btn-outline">Add weapon</button>
				<p className="text-error">{convexError}</p>
			</form>
		</>
	)
}
