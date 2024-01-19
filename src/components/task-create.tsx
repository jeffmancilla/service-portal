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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { useForm, SubmitHandler } from "react-hook-form"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { useQuery } from "convex/react"
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

type FormValues = {
	owner: string
	name: string
	level: number | null
	type: "slashing" | "striking" | "piercing"
}

const TaskCreate = () => {
	const [open, setOpen] = useState(false)

	const userId = useStoreUserEffect()

	const items = useQuery(api.items.get, {
		owner: "jh7cwxfyaymk84j8qt0hvqmfk16hryss",
	})

	const { handleSubmit } = useForm<FormValues>()
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log("submit data", data)
		data.owner = "jh7cwxfyaymk84j8qt0hvqmfk16hryss"
	}

	const handleWeaponChange = (select: HTMLFormElement) => {
		if (select.value === "add") {
			select.reset()
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							<div>
								<Dialog open={open} onOpenChange={setOpen}>
									<Label>Weapon to repair</Label>
									<select onChange={(e) => handleWeaponChange(e.target)}>
										<option value="">-select one-</option>
										{items?.map(({ _id, name, level }) => (
											<option value={_id}>
												{name} {level ? `+${level}` : null}
											</option>
										))}
										<option className="text-muted-foreground" value="add">
											add weapon
										</option>
									</select>
									{/* <Select onValueChange={(e) => handleOpen(e)}>
										<SelectTrigger>
											<SelectValue placeholder="Select weapon" />
										</SelectTrigger>
										<SelectContent>
											{items?.map(({ _id, name, level }) => (
												<SelectItem value={_id}>
													{name} {level ? `+${level}` : null}
												</SelectItem>
											))}
											<SelectItem value="add" className="text-muted-foreground">
												Add weapon
											</SelectItem>
										</SelectContent>
									</Select> */}
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
								<Label>Additional Comments</Label>
								<Textarea placeholder="pet drake chewed out the hilt" />
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
export default TaskCreate
