import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TaskCreate from '@/components/task-create'

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
					<TaskCreate />
				</TabsContent>
				<TabsContent value="enchant">Change your password here.</TabsContent>
			</Tabs>
		</>
	)
}

export default Portal
