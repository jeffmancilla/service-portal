import { useForm } from "react-hook-form"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Id, Doc } from "../../convex/_generated/dataModel"

export default function MessageSend({ taskId }: { taskId: Id<"tasks"> }) {
	const createMessage = useMutation(api.messages.create)
	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit((data) => {
		data.to = taskId
		createMessage(data as Doc<"messages">)
	})

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2 w-full">
			<textarea
				{...register("text")}
				className="textarea textarea-bordered w-full"
				placeholder="Message"
			/>
			<button type="submit" className="btn btn-sm btn-primary self-end">
				Send
			</button>
		</form>
	)
}
