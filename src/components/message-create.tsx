import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { api } from "@convex/_generated/api"
import { useMutation } from "convex/react"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"

type Message = {
	from: Id<"users">
	task: Id<"tasks">
	text: string
}

const MessageCreate = ({ taskId }: { taskId: Id<"tasks"> }) => {
	const userId = useStoreUserEffect()

	const createMessage = useMutation(api.messages.createFromTask)
	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit((data) => {
		data.from = userId
		createMessage(data as Message)
	})

	return (
		<form onSubmit={onSubmit}>
			<input {...register("task")} name="task" value={taskId} hidden />
			<div className="flex flex-col gap-2">
				<div>
					<Label htmlFor="type">Add message</Label>
					<Textarea {...register("text")} />
				</div>
				<Button type="submit" className="self-end">
					Send
				</Button>
			</div>
		</form>
	)
}

export default MessageCreate
