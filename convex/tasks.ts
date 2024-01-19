import { Id } from "./_generated/dataModel"
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
		customer: v.string(),
		item: v.string(),
		state: v.string(),
		type: v.string(),
	},
	handler: async (ctx, args) => {
		const newItem = await ctx.db.insert("tasks", {
			customer: args.customer as Id<"users">,
			item: args.item as Id<"items">,
			state: args.state,
			type: args.type,
		})
		return newItem
	},
})