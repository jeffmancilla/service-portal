import { api } from "../../convex/_generated/api"
import { useQuery } from "convex/react"
import useStoreUserEffect from "../hooks/useStoreUserEffect"
import { Link } from "react-router-dom"

export default function DashboardLink() {
	const userId = useStoreUserEffect()
	const argsUserId = userId ? { userId: userId } : "skip"
	const getUser = useQuery(api.users.getOne, argsUserId)

	const renderDashboardLink = getUser?.role.agent ? (
		<Link to="/agent">
			Dashboard
		</Link>
	) : undefined

	return renderDashboardLink
}
