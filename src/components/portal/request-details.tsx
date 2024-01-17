import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { CalendarDays } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

const RequestDetails = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Greatsword +8</CardTitle>
					<CardDescription>
						Deploy your new project in one-click.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Customer</Label>
								<Input id="name" placeholder="Name of your project" readOnly />
								<Label htmlFor="name">Weapon Name</Label>
								<Input id="name" placeholder="Name of your project" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="state">State</Label>
								<Select>
									<SelectTrigger id="state">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="next">Open</SelectItem>
										<SelectItem value="sveltekit">In progress</SelectItem>
										<SelectItem value="astro">Completed</SelectItem>
										<SelectItem value="nuxt">Cancelled</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
					<Separator className="my-4" />
					<form>
						<Label htmlFor="state">Add message</Label>

						<Textarea />
						<Button variant="outline">Send</Button>
					</form>
					<Separator className="my-4" />
					<div>
						<h3 className="text-sm font-semibold">Messages</h3>
						<Card className="w-64 border">
							<div className="flex justify-between space-x-4 p-4">
								<div className="space-y-1">
									<h4 className="text-sm font-semibold">Jeff Mancilla</h4>
									<p className="text-sm">
										I needed this done yesterday. Undead are arriving by
										sundown.
									</p>
									<div className="flex items-center pt-2">
										<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
										<span className="text-xs text-muted-foreground">
											Joined December 2021
										</span>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="flex gap-4">
						<Button>Update</Button>
						<Button variant="outline">Cancel</Button>
					</div>
					<Button variant="destructive">Cancel Request</Button>
				</CardFooter>
			</Card>
		</>
	)
}

export default RequestDetails
