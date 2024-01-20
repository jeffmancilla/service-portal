import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RepairTaskCreate from "@/components/task-repair-create"
import EnchantTaskCreate from "@/components/task-enchant-create"

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
			</div>
			<Tabs defaultValue="repair" className="min-w-80 mx-auto">
				<TabsList>
					<TabsTrigger value="repair">Repair weapon</TabsTrigger>
					<TabsTrigger value="enchant">Enchant item</TabsTrigger>
				</TabsList>
				<TabsContent value="repair">
					<RepairTaskCreate />
				</TabsContent>
				<TabsContent value="enchant">
					<EnchantTaskCreate />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default Portal
