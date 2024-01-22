import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ConvexReactClient } from "convex/react"
import { ClerkProvider, useAuth } from "@clerk/clerk-react"
import { ConvexProviderWithClerk } from "convex/react-clerk"


import "./index.css"

import Root from "./routes/+root"
import Error from "./routes/+error"
import Requests from "./routes/requests"
import Portal from "./routes/portal"
import Repair from "./routes/repair"
import Dashboard from "./routes/dashboard"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Portal />,
			},
			{
				path: "requests/",
				element: <Requests />,
			},
			{
				path: "repair/",
				element: <Repair />,
			},
			{
				path: "agent/",
				element: <Dashboard />,
			},
		],
	},
])

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
			<ClerkProvider
				publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
			>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<RouterProvider router={router} />
				</ConvexProviderWithClerk>
			</ClerkProvider>
	</React.StrictMode>
)
