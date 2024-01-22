import { useForm } from "react-hook-form"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "../../convex/_generated/dataModel"
import useStoreUserEffect from "../hooks/useStoreUserEffect"

type UpdateTask = {
	state?: "open" | "in progress" | "completed" | "cancelled" | undefined
    agent: Id<"users">
	taskId: Id<"tasks">
}

export default function TaskAssignButton({ taskId }: { taskId: Id<"tasks"> }) {
	
    const userId = useStoreUserEffect()
	const updateTask = useMutation(api.tasks.update)
	const { handleSubmit } = useForm()

	

	const onSubmit = handleSubmit(() => {
		const data = {
			taskId: taskId,
            agent: userId,
			state: "in progress",
		}
		updateTask(data as UpdateTask)
	})  

	return (
		<form onSubmit={onSubmit}>
			<button type="submit" className="btn btn-sm btn-info self-end">
				Assign to me
			</button>
		</form>
	)
}
