import { UserButton } from "@clerk/clerk-react"
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import { Link, Outlet } from "react-router-dom"
import ThemeToggle from "../components/theme-toggle"

export default function Root() {
	return (
		<>
			<header className="flex justify-between gap-4 items-center">
				<Link to="/" className="text-xl font-bold">
					Smithing Services Portal
				</Link>

				<div className="flex justify-end gap-2 items-center">
					<Authenticated>
						<nav>
							<Link to="/requests">Requests</Link>
						</nav>
						<ThemeToggle />
						<UserButton afterSignOutUrl="/" />
					</Authenticated>
					<Unauthenticated>
						<ThemeToggle />
					</Unauthenticated>
					<AuthLoading>loading</AuthLoading>
				</div>
			</header>
			<main className="flex-grow">
				<Outlet />
			</main>
			<footer className="text-center text-base-300">
				JeffM was here. Built with Vite + React + TailwindCSS + Convex + Clerk
			</footer>
		</>
	)
}
