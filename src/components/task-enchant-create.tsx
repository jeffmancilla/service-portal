import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { useForm } from "react-hook-form"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { useMutation, useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

import ItemCreate from "./item-create"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Doc } from "@convex/_generated/dataModel"

const EnchantTaskCreate = () => {
const [open, setOpen] = useState(false)

	const userId = useStoreUserEffect()
	const userIdObj = userId ? { user: userId } : {}
	const items = useQuery(api.items.get, userIdObj)

	const createTask = useMutation(api.tasks.create)
	const { register, handleSubmit } = useForm()
	const onSubmit = handleSubmit((data) => {
		// data.customer = userId
		data.type = "repair"
		const task = data as Doc<"tasks">
		console.log(task)

		try {
			createTask(task)
		} catch (err) {
			console.error(err)
		}
	})

	const handleWeaponChange = (select: HTMLSelectElement) => {
		if (select.value === "add") {
			setOpen(!open)
			select.value = ""
		}
	}

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Repair Request</CardTitle>
					<CardDescription>
						enter in and select your item add comment
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className="flex flex-col gap-4">
							<div>
								<Dialog open={open} onOpenChange={setOpen}>
									<Label>Weapon to repair</Label>
									<select
										{...register("item")}
										onChange={(e) => handleWeaponChange(e.target)}
									>
										<option value="">-select one-</option>
										{items?.map(({ _id, name, level }) => (
											<option key={_id} value={_id}>
												{name} {level ? `+${level}` : null}
											</option>
										))}
										<option className="text-muted-foreground" value="add">
											add weapon
										</option>
									</select>
									<DialogContent className="w-[320px]">
										<DialogHeader>
											<DialogTitle>New Weapon</DialogTitle>
											<DialogDescription>
												Register your weapon with us
											</DialogDescription>
											<ItemCreate />
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</div>
							<div>
								<Label>Describe the state of your weapon</Label>
								<Textarea
									{...register("description")}
									placeholder="pet drake chewed out the hilt"
								/>
							</div>

							<div>
								<Button type="submit">Submit</Button>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</>
	)
}
export default EnchantTaskCreate
