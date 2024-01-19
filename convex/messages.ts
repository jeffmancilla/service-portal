import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
	args: { from: v.optional(v.id("users")) },
	handler: async (ctx, args?) => {
		return await ctx.db
			.query("messages")
			.filter((q) => q.eq(q.field("from"), args?.from))
			.collect()
	},
})

export const createFromTask = mutation({
	args: {
		from: v.id("users"),
		task: v.id("tasks"),
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const newItem = await ctx.db.insert("messages", {
			from: args.from,
			task: args.task,
			text: args.text,
		})
		return newItem
	},
})
