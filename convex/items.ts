import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
	args: { user: v.optional(v.id("users")) },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("owner"), args.user))
			.collect()
	},
})

export const create = mutation({
	args: {
		name: v.string(),
		level: v.string(),
		type: v.string(),
		owner: v.id("users"),
	},
	handler: async (ctx, args) => {
		const newItem = await ctx.db.insert("items", {
			name: args.name,
			level: parseInt(args.level),
			type: args.type,
			owner: args.owner,
		})
		return newItem
	},
})
