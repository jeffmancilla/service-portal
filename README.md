# Service Portal (working title)
Service Portal is an attempt to replicate a barebones ticketing/service management platform using a modern web framework... while also masquerading as a Souls-like blacksmith service fulfillment workspace.

- end-to-end typesafety with React TypeScript + Convex backend
- reactivity applies to all database queries (real-time messaging, task changes, etc.)
- Social SSOs (Discord, Google, TikTok)
- minimal, responsive design

Deployed production link: [service-portal-tau.vercel.app](https://service-portal-tau.vercel.app)

## Screenshots
![portal-hero-card](https://github.com/jeffmancilla/service-portal/assets/54294370/cb32d550-2d64-4753-8ecd-9930464ab2bc)
![auth-clerk-menu](https://github.com/jeffmancilla/service-portal/assets/54294370/62554eab-b27d-4b8e-a3ed-9ad5f39d33ef)
![task-detail-chat](https://github.com/jeffmancilla/service-portal/assets/54294370/9844086a-497c-492a-a5b6-8a60de762e21)
![form-modal-item](https://github.com/jeffmancilla/service-portal/assets/54294370/3e453e24-b273-4bd4-8844-0bcb0fad0e0e)

## Stack
Service Portal was built with lots of ♥ and:
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)

## Want to deploy locally?
1. clone this repo
2. npm install
3. set up a [Convex](https://www.convex.dev) account and follow their [Clerk guide](https://docs.convex.dev/auth/clerk) to set up auth
4. npm run dev + npx convex dev 

## User flow
- Customer
  1. sign in/sign up (Clerk auth)
  2. open a service request (repair)
  3. check request status and chat with agents using the My Requests page
- Agent
  1. sign in and visit the Admin Dashboard
  2. check for new tasks, assign tasks to yourself, review open tasks
  4. communicate with the customers using chat
  3. fulfill tasks and update state to complete in the task details
  3. cancel tasks as needed

## Future features
- dry up components for reusability across roles
- consumable items for agents
- ability check system for completing tasks (a la Baldur's Gate 3)
- replace Convex with a Go backend (API server + postgres)
- swap to htmx + templ as a replacement to React frontend
- service catalog
- admin dashboard
- role-based access control system
