import { UserButton } from "@clerk/clerk-react"
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import { Link, Outlet } from "react-router-dom"
import ThemeToggle from "../components/theme-toggle"
import DashboardLink from "../components/dashboard-link"

export default function Root() {
	return (
		<>
			<header className="flex flex-wrap justify-between gap-4 items-center">
				<Link to="/" className="flex-grow text-xl font-bold">
					Smithing Service
				</Link>

				<div className="justify-self-stretch flex justify-end gap-4 items-center">
					<Authenticated>
						<nav>
							<Link to="/requests">My Requests</Link>
						</nav>
						<ThemeToggle />
						<UserButton afterSignOutUrl="/" />
					</Authenticated>
					<Unauthenticated>
						<ThemeToggle />
					</Unauthenticated>
					<AuthLoading>
						<span className="loading loading-dots loading-xs"></span>
					</AuthLoading>
				</div>
			</header>
			<main className="flex-grow">
				<Outlet />
			</main>
			<footer className="text-center text-base-300">
				<DashboardLink />
				<p>
					JeffM was here. Built with Vite + React + TailwindCSS + Convex + Clerk
				</p>
			</footer>
		</>
	)
}
