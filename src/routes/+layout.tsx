import { Outlet, Link } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { UserButton } from "@clerk/clerk-react"
import useStoreUserEffect from "../hooks/useStoreUserEffect"
import { Authenticated } from "convex/react"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Toaster } from "@/components/ui/toaster"

const Layout = () => {
	useStoreUserEffect()

	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<div className="main-layout flex flex-col">
				<header className="py-4 flex flex-wrap justify-between items-center">
					<Link to="/">
						<h1 className="font-bold text-xl">Smithing Service Portal</h1>
					</Link>
					<nav className="flex items-center gap-4">
						<div className="flex items-center gap-4">
							<Authenticated>
								<Link to="/requests" className="[&.active]:font-bold">
									My Requests
								</Link>
								<ModeToggle />
								<UserButton afterSignOutUrl="/index.html" />
							</Authenticated>
							{/* <Unauthenticated>
								<SignInButton mode="modal" />
							</Unauthenticated> */}
							{/* <AuthLoading>Still loading</AuthLoading> */}
						</div>
					</nav>
				</header>
				<main className="flex-grow">
					<Outlet />
				</main>
				<footer className="py-4 text-center ">
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
