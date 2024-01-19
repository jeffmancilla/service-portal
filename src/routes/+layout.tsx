import useStoreUserEffect from '../hooks/useStoreUserEffect'
import { Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'

import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'

const Layout = () => {
	const userId = useStoreUserEffect()
	const { toast } = useToast()

	return (
		<>
			<div className="main-layout flex flex-col">
				<header className="py-2">
					<nav className="flex justify-between items-center">
						<Link to="/" className="font-bold">
							<h1>Equipment Services Portal</h1>
						</Link>
						<div className="flex items-center gap-4">
							<Authenticated>
								<Link to="/requests" className="[&.active]:font-bold">
									My Requests
								</Link>
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
				<footer className="py-2 text-center">
					JeffM was here. Built using vite, react, convex, tailwind, shadcn
					<button
						onClick={() => {
							toast({
								title: 'Greetings, adventurer!',
								description: `Stored user ID: ${userId}`,
							})
						}}
					>
						toast
					</button>
				</footer>
			</div>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	)
}

export default Layout
