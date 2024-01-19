import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useForm, SubmitHandler } from "react-hook-form"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { useToast } from "./ui/use-toast"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Id } from "../../convex/_generated/dataModel"

type FormValues = {
	name: string
	level: string
	type: "slashing" | "striking" | "piercing"
	owner: Id<"users">
}

const MessageCreate = () => {
	const userId = useStoreUserEffect()
	const { toast } = useToast()
	const createItem = useMutation(api.message.create)

	const { register, handleSubmit } = useForm<FormValues>()
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		data.owner = userId!
		console.log("submit data", data)
		toast({
			title: "Submission details",
			description: JSON.stringify(data),
		})
		createItem({
			name: data.name,
			level: data.level,
			owner: data.owner,
			type: data.type,
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4">
					<div className="flex justify-between gap-2">
						<div className="flex-grow">
							<Label>Name</Label>
							<Input placeholder="longsword" {...register("name")} />
						</div>
						<div>
							<Label>Level</Label>
							<Input type="number" min="1" max="8" {...register("level")} />
						</div>
					</div>
					<div>
						<Label>Type</Label>
						<RadioGroup className="flex flex-col" {...register("type")}>
							<div className="mt-1 flex gap-2 items-center">
								<RadioGroupItem value="slashing" />
								<Label className="font-normal">Slashing</Label>
							</div>
							<div className="flex gap-2 items-center">
								<RadioGroupItem value="striking" />
								<Label className="font-normal">Striking</Label>
							</div>
							<div className="flex gap-2 items-center">
								<RadioGroupItem value="piercing" />
								<Label className="font-normal">Piercing</Label>
							</div>
						</RadioGroup>
					</div>
					<div>
						<Button type="submit">Submit</Button>
					</div>
				</div>
			</form>
		</>
	)
}
export default MessageCreate
