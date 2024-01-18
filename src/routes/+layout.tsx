import { Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'

const Layout = () => {
	return (
		<div className="main-layout flex flex-col">
			<header className="py-2">
				<nav className="flex justify-between items-center">
					<Link to="/" className="hover-opacity font-extrabold">
						<h1>Equipment Services Portal</h1>
					</Link>
					<div className="flex gap-4">
						<Authenticated>
							<Link to="/requests" className="hover-opacity [&.active]:font-bold">
								My requests
							</Link>
							<Link to="/agent" className="hover-opacity [&.active]:font-bold">
								Agent Workspace
							</Link>
							<UserButton afterSignOutUrl="./"/>
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
			<footer className="py-2 text-center">
				JeffM was here. Built using vite, react, convex, tailwind, shadcn
			</footer>
			<TanStackRouterDevtools />
		</div>
	)
}

export default Layout
