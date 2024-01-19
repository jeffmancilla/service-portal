import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TaskCreate from '@/components/task-create'
import RepairTaskCreate from '@/components/task-repair-create'

const Portal = () => {
	return (
		<>
			<Tabs defaultValue="repair" className="mx-auto w-fit">
				<TabsList>
					<TabsTrigger value="repair">Repair weapon</TabsTrigger>
					<TabsTrigger value="enchant" disabled>
						Enchant item (coming soon)
					</TabsTrigger>
				</TabsList>
				<TabsContent value="repair">
					<RepairTaskCreate />
				</TabsContent>
				<TabsContent value="enchant">Enchant thangs</TabsContent>
			</Tabs>
		</>
	)
}

export default Portal
