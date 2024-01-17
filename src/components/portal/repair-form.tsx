type repairform = {
	name: string,
	
}


import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
	username: z.string().min(2).max(50),
})

const RepairForm = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<div>
								<FormLabel>Weapon name</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
							</div>
							<div>
								<FormLabel>Weapon type</FormLabel>
								<RadioGroup defaultValue="option-one">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="slashing" id="slashing" />
										<Label htmlFor="slashing">Slashing</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="striking" id="striking" />
										<Label htmlFor="striking">Striking</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="piercing" id="piercing" />
										<Label htmlFor="piercing">Piercing</Label>
									</div>
								</RadioGroup>
							</div>
							<div>
								<FormLabel>Additional comments</FormLabel>
								<Textarea />
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

export default RepairForm
