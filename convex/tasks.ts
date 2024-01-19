import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
	args: { user: v.optional(v.id("users")) },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("customer"), args.user))
			.collect()
	},
})

export const create = mutation({
	args: {
		customer: v.id("users"),
		item: v.id("items"),
		state: v.string(),
		type: v.string(),
		description: v.string(),
	},
	handler: async (ctx, args) => {
		const newItem = await ctx.db.insert("tasks", { ...args })

		return newItem
	},
})
