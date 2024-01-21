import { UserButton } from "@clerk/clerk-react"
import { Authenticated } from "convex/react"
import { Link, Outlet } from "react-router-dom"

export default function Root() {
	return (
		<>
			<header className="flex justify-between items-center">
				<Link to="/" className="font-bold">
					Smithing Services Portal
				</Link>
				<Authenticated>
					<div className="flex justify-end gap-4 items-center">
						<nav>
							<Link to="/requests">Requests</Link>
						</nav>
						<UserButton />
					</div>
				</Authenticated>
			</header>
			<main>
				<Outlet />
			</main>
			<footer></footer>
		</>
	)
}
