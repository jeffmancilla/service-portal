import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const getFromTask = query({
	args: {
		task: v.optional(v.id("tasks")),
	},
	handler: async (ctx, args?) => {
		return await ctx.db
			.query("messages")
			.filter((q) => q.eq(q.field("task"), args?.task))
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
