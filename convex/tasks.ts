import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
	args: {
		// agent: v.optional(v.id("users")),
		item: v.id("items"),
		type: v.union(v.literal("repair"), v.literal("enchant")),
		// state: v.union(
		// 	v.literal("open"),
		// 	v.literal("in progress"),
		// 	v.literal("completed"),
		// 	v.literal("cancelled")
		// ),
		description: v.string(),
		// active: v.boolean(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (identity === null) {
			throw new Error("Unauthenticated call")
		}
		const user = await ctx.db
			.query("users")
			.withIndex("by_token", (q) =>
				q.eq("tokenIdentifier", identity.tokenIdentifier)
			)
			.unique()
		if (!user) {
			throw new Error("user not found")
		}
		const newTask = await ctx.db.insert("tasks", {
			active: true,
			customer: user._id,
			state: "open",
			...args,
		})
		return newTask
	},
})

export const get = query({
	args: { task: v.id("tasks") },
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.task)
		if (!task) {
			throw new Error("await ctx.db.get(args.task) = null")
		}
		const customer = await ctx.db.get(task!.customer)
		const item = await ctx.db.get(task!.item)
		const agent = task.agent ? await ctx.db.get(task.agent) : null
		return { ...task, customer: customer, item: item, agent: agent }
	},
})

export const update = mutation({
	args: {
		taskId: v.id("tasks"),
		active: v.optional(v.boolean()),
		type: v.optional(v.union(v.literal("repair"), v.literal("enchant"))),
		item: v.optional(v.id("items")),
		customer: v.optional(v.id("users")),
		description: v.optional(v.string()),
		agent: v.optional(v.id("users")),
		state: v.optional(
			v.union(
				v.literal("open"),
				v.literal("in progress"),
				v.literal("completed"),
				v.literal("cancelled")
			)
		),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (identity === null) {
			throw new Error("Unauthenticated call")
		}
		const user = await ctx.db
			.query("users")
			.withIndex("by_token", (q) =>
				q.eq("tokenIdentifier", identity.tokenIdentifier)
			)
			.unique()
		if (!user) {
			throw new Error("user not found")
		}
		if (!user.role.agent) {
			throw new Error("user does not have sufficient privileges")
		}

		const task = await ctx.db.get(args.taskId)
		if (!task) {
			throw new Error("task not found")
		}
		const argsWithoutTaskId = Object.fromEntries(
			Object.entries(args).filter((e) => e[0] != "taskId")
		)
		return await ctx.db.patch(task._id, {
			...argsWithoutTaskId,
			updated: Number(new Date()),
		})
	},
})

export const getList = query({
	args: { userId: v.optional(v.id("users")) },

	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("customer"), args.userId))
			.collect()
		const items = await ctx.db.query("items").collect()
		const tasksWithItems = tasks.map((task) => {
			const item = items.find((item) => item._id === task.item)
			const itemLabel = !item?.level
				? item?.name
				: `${item?.name} +${item?.level}`
			return { ...task, itemLabel: itemLabel }
		})
		return tasksWithItems
	},
})

export const getUnassigned = query({
	args: { userId: v.optional(v.id("users")) },

	handler: async (ctx, args) => {
		console.log("args", args)
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("agent"), undefined))
			.filter((q) => q.eq(q.field("active"), true))
			.collect()
		const items = await ctx.db.query("items").collect()
		const users = await ctx.db.query("users").collect()

		const populatedTasks = tasks.map((task) => {
			const item = items.find((item) => item._id === task.item)
			const customer = users.find((user) => user._id === task.customer)
			const agent = users.find((user) => user._id === task.agent)

			return {
				...task,
				itemName: item?.level ? `${item?.name} +${item?.level}` : item?.name,
				customerName: customer?.name,
				agentName: agent?.name,
			}
		})
		return populatedTasks
	},
})

export const getAssigned = query({
	args: { userId: v.optional(v.id("users")) },

	handler: async (ctx, args) => {
		console.log("args", args)
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("agent"), args.userId))
			.filter((q) => q.eq(q.field("active"), true))
			.collect()
		const items = await ctx.db.query("items").collect()
		const users = await ctx.db.query("users").collect()

		const populatedTasks = tasks.map((task) => {
			const item = items.find((item) => item._id === task.item)
			const customer = users.find((user) => user._id === task.customer)
			const agent = users.find((user) => user._id === task.agent)

			return {
				...task,
				itemName: item?.level ? `${item?.name} +${item?.level}` : item?.name,
				customerName: customer?.name,
				agentName: agent?.name,
			}
		})
		return populatedTasks
	},
})

export const getInactive = query({
	args: { userId: v.optional(v.id("users")) },

	handler: async (ctx, args) => {
		console.log("args", args)
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("active"), false))
			.collect()
		const items = await ctx.db.query("items").collect()
		const users = await ctx.db.query("users").collect()

		const populatedTasks = tasks.map((task) => {
			const item = items.find((item) => item._id === task.item)
			const customer = users.find((user) => user._id === task.customer)
			const agent = users.find((user) => user._id === task.agent)

			return {
				...task,
				itemName: item?.level ? `${item?.name} +${item?.level}` : item?.name,
				customerName: customer?.name,
				agentName: agent?.name,
			}
		})
		return populatedTasks
	},
})
