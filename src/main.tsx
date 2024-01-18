import React from 'react'
import ReactDOM from 'react-dom/client'

import { ClerkProvider, useAuth } from '@clerk/clerk-react'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'

import {
	RouterProvider,
	Router,
	Route,
	RootRoute,
} from '@tanstack/react-router'

import Agent from './routes/agent'
import Portal from './routes/portal'
import Requests from './routes/requests'
import Layout from './routes/+layout'

// router
const rootRoute = new RootRoute({
	component: Layout,
})

const portalRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Portal,
})

const requestsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/requests',
	component: Requests,
})

const agentRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/agent',
	component: Agent,
})

const routeTree = rootRoute.addChildren([
	portalRoute,
	agentRoute,
	requestsRoute,
])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// db provider
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<React.StrictMode>
			<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<RouterProvider router={router} />
				</ConvexProviderWithClerk>
			</ClerkProvider>
		</React.StrictMode>
	)
}