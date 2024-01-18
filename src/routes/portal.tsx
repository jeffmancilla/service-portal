import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ItemCreate from '@/components/item-create'

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
					<ItemCreate />
				</TabsContent>
				<TabsContent value="enchant">Change your password here.</TabsContent>
			</Tabs>
		</>
	)
}

export default Portal
