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

export const getActive = query({
	args: { userId: v.optional(v.id("users")) },

	handler: async (ctx, args) => {
		console.log('args',args)
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("active"), true))
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
