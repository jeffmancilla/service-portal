import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { api } from "@convex/_generated/api"
import { useMutation } from "convex/react"
import { Id, Doc } from "@convex/_generated/dataModel"

const MessageCreate = ({ taskId }: { taskId: Id<"tasks"> }) => {
	const createMessage = useMutation(api.messages.create)
	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit((data) => {
		data.to = taskId
		createMessage(data as Doc<"messages">)
	})

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col justify-stretch gap-2">
				<div className="w-full justify-self-stretch">
					<Textarea placeholder="enter message here" {...register("text")} />
				</div>
				<Button type="submit" className="self-end">
					Send
				</Button>
			</div>
		</form>
	)
}

export default MessageCreate
