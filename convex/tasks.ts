import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("tasks").collect()
	},
})

export const create = mutation({
	args: {
		customer: v.id("users"),
		item: v.id("items"),
		type: v.string(),
	},
	handler: async (ctx, args) => {
		const newItem = await ctx.db.insert("tasks", {
			customer: args.customer,
			item: args.item,
			type: args.type,
		})
		return newItem
	},
})
