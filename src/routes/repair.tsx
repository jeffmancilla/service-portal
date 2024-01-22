import {
	Authenticated,
	Unauthenticated,
	useMutation,
	useQuery,
} from "convex/react"
import ItemCreate from "../components/item-create"
import { api } from "../../convex/_generated/api"
import { useForm } from "react-hook-form"
import { Doc } from "../../convex/_generated/dataModel"
import useStoreUserEffect from "../hooks/useStoreUserEffect"
import { SignIn } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

export default function Repair() {
	const userId = useStoreUserEffect()
	const queryArgsUser = userId ? { userId: userId } : "skip"
	const items = useQuery(api.items.get, queryArgsUser)
	const navigate = useNavigate()

	const createTask = useMutation(api.tasks.create)
	const { register, handleSubmit } = useForm()
	const onSubmit = handleSubmit((data) => {
		data.type = "repair"
		const task = data as Doc<"tasks">
		createTask(task)
		return navigate("/requests")
	})

	const handleDialog = (elementId: string) => {
		const dialog = document.getElementById(elementId) as HTMLDialogElement
		if (!dialog.hasAttribute("open")) {
			dialog.showModal()
		} else {
			dialog.close()
		}
	}

	return (
		<>
			<Authenticated>
				<ItemCreate />
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Request repair service</h2>
						<form onSubmit={onSubmit} className="flex flex-col gap-4">
							<div className="flex flex-wrap gap-2 items-end">
								<label className="flex-grow form-control">
									<div className="label">
										<span className="label-text">Registered weapons</span>
									</div>
									<select
										{...register("item")}
										className="select select-bordered"
										required
										defaultValue=""
									>
										<option value="" className="base-300" disabled>
											Select one
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
									placeholder="Be honest"
									required
								></textarea>
							</label>

							<div className="card-actions justify-end">
								<button className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</Authenticated>
			<Unauthenticated>
				<dialog className="bg-transparent" open>
					<SignIn />
				</dialog>
			</Unauthenticated>
		</>
	)
}
