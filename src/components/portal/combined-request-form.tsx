import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RepairForm from './repair-form'

const combinedRequestForm = () => {
	return (
		<Tabs defaultValue="repair" >
			<TabsList>
				<TabsTrigger value="repair">Repair service</TabsTrigger>
				<TabsTrigger value="enchant" disabled>Enchant weapon (coming soon)</TabsTrigger>
			</TabsList>
			<TabsContent value="repair">
				<RepairForm />
			</TabsContent>
			<TabsContent value="enchant">Change your password here.</TabsContent>
		</Tabs>
	)
}

export default combinedRequestForm
