import { useForm } from "react-hook-form"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "../../convex/_generated/dataModel"

type UpdateTask = {
	state?: "open" | "in progress" | "completed" | "cancelled" | undefined
	taskId: Id<"tasks">
}

export default function TaskCancelButton({ taskId }: { taskId: Id<"tasks"> }) {
	const updateTask = useMutation(api.tasks.update)
	const { handleSubmit } = useForm()

	const onSubmit = handleSubmit(() => {
		const data = {
			taskId: taskId,
			state: "cancelled",
		}
		updateTask(data as UpdateTask)
	})

	return (
		<form onSubmit={onSubmit}>
			<button
				type="submit"
				className="btn btn-sm btn-outline btn-error self-end"
			>
				Cancel task
			</button>
		</form>
	)
}
