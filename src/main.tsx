import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
	Outlet,
	RouterProvider,
	Link,
	Router,
	Route,
	RootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Agent from './routes/agent'
import Portal from './routes/portal'

const rootRoute = new RootRoute({
	component: () => (
		<>
			<header>
			<header className="flex justify-between items-center">
			<h1>Equipment Services Portal</h1>
			<div className="flex gap-4 items-center">
				<a>My requests</a>

			</div>
		</header>
				<nav className="p-2 flex gap-2">
					<Link to="/" className="[&.active]:font-bold">
						Portal
					</Link>
					<Link to="/agent" className="[&.active]:font-bold">
						Agent
					</Link>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				jeffm was here. built using vite, react, convex, tailwind, shadcn
			</footer>
			<TanStackRouterDevtools />
		</>
	),
})

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Portal,
})

const aboutRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/agent',
	component: Agent,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	)
}

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
