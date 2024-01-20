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
import { Id } from "@convex/_generated/dataModel"

type Task = {
	customer: Id<"users">
	item: Id<"items">
	state: string
	type: string
	description: string
}

const EnchantTaskCreate = () => {
	const [open, setOpen] = useState(false)

	const userId = useStoreUserEffect()
	const userIdObj = userId ? { user: userId } : {}
	const items = useQuery(api.items.get, userIdObj)

	const createTask = useMutation(api.tasks.create)
	const { register, handleSubmit } = useForm()
	const onSubmit = handleSubmit((data) => {
		data.customer = userId
		data.type = "Enchant"
		data.state = "New"
		const task = data as Task

		try {
			createTask(task)
		} catch (err) {
			console.log(err)
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
					<CardTitle>Enchant Weapon</CardTitle>
					<CardDescription>
						enter in and select your item add comment
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className="flex flex-col gap-4">

							<div>
								<Label>Describe the state of your weapon</Label>
								<Textarea
									{...register("item")}
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
