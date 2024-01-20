import useStoreUserEffect from "../hooks/useStoreUserEffect"
import { Outlet, Link } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { SignInButton, UserButton } from "@clerk/clerk-react"
import {
	Authenticated,
	Unauthenticated,
	AuthLoading,
	useQuery,
} from "convex/react"
import { api } from "@convex/_generated/api"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

const Layout = () => {
	const userId = useStoreUserEffect()
	const userArgs = userId ? { userId: userId } : "skip"
	const user = useQuery(api.users.getOne, userArgs)
	console.log(user)

	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<div className="main-layout flex flex-col">
				<header className="h-12 flex flex-wrap justify-between items-center">
					<Link to="/" className="font-bold">
						<h1>Equipment Services Portal</h1>
					</Link>
					<nav className="flex items-center gap-4">
						<div className="flex items-center gap-4">
							<Authenticated>
								<Link to="/requests" className="[&.active]:font-bold">
									My Requests
								</Link>
								<ModeToggle />
								<UserButton afterSignOutUrl="./" />
							</Authenticated>
							<Unauthenticated>
								<SignInButton mode="modal" />
							</Unauthenticated>
							<AuthLoading>Still loading</AuthLoading>
						</div>
					</nav>
				</header>
				<main className="flex-grow">
					<Outlet />
				</main>
				<footer className="py-4 text-center">
					JeffM was here. Built using vite, react, clerk, convex, tailwind,
					shadcn
				</footer>
			</div>
			<Toaster />
			<TanStackRouterDevtools />
		</ThemeProvider>
	)
}

export default Layout
