import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { api } from "@convex/_generated/api"
import { useMutation } from "convex/react"
import useStoreUserEffect from "@/hooks/useStoreUserEffect"
import { Id } from "@convex/_generated/dataModel"

type Item = {
	name: string
	type: string
	level: string
	owner?: Id<"users">
}

const ItemCreate = () => {
	const userId = useStoreUserEffect()
	
	const createItem = useMutation(api.items.create)
	const { register, handleSubmit } = useForm()
	
	const onSubmit = handleSubmit((data: any) => {
		data.owner = userId!
		console.log(data)
		createItem(data)
	})

	return (
		<>
			<form onSubmit={onSubmit}>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="name">Name</Label>
					<Input
						{...register("name")}
						type="name"
						id="email"
						placeholder="Rapier"
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="level">Level</Label>
					<Input
						{...register("level")}
						type="number"
						id="level"
						placeholder="0"
						min="0"
						max="8"
					/>
				</div>
				<div>
					<Label htmlFor="type">Weapon type</Label>
					<select className="block mb-4" id="pet-select" {...register("type")}>
						<option value="slashing">Slashing</option>
						<option value="striking">Striking</option>
						<option value="piercing">Piercing</option>
					</select>
				</div>
				<Button type="submit">Add weapon</Button>
			</form>
		</>
	)
}

export default ItemCreate
