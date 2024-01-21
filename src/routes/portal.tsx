import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RepairTaskCreate from "@/components/task-repair-create"
import EnchantTaskCreate from "@/components/task-enchant-create"
import { Authenticated, Unauthenticated } from "convex/react"
import { SignInButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"

const Portal = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="text-center">
				<h2 className="text-5xl font-bold my-16 leading-tight">
					Forge weapons.
					<br />
					Make shiny.
					<br />
					More happy.
				</h2>
				<p></p>
				<div>
					<Authenticated>
						<Tabs defaultValue="repair" className="min-w-80 mx-auto">
							<TabsList className="mx-auto">
								<TabsTrigger value="repair">Repair weapon</TabsTrigger>
								<TabsTrigger value="enchant" disabled>
									Enchant item (coming soon)
								</TabsTrigger>
							</TabsList>
							<TabsContent value="repair">
								<RepairTaskCreate />
							</TabsContent>
							<TabsContent value="enchant">
								<EnchantTaskCreate />
							</TabsContent>
						</Tabs>
					</Authenticated>
					<Unauthenticated>
						<Button>
							<SignInButton mode="modal" />
						</Button>
					</Unauthenticated>
					{/* <AuthLoading>Still loading</AuthLoading> */}
				</div>
			</div>
		</div>
	)
}

export default Portal
