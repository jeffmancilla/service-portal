import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const getFromTask = query({
	args: {
		// active: v.boolean(),
		// from: v.id("users"),
		to: v.union(v.id("tasks"), v.id("users")),
		// text: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("messages")
			.filter((q) => q.eq(q.field("to"), args.to))
			.collect()
	},
})

export const create = mutation({
	args: {
		// active: v.boolean(),
		// from: v.id("users"),
		to: v.union(v.id("tasks"), v.id("users")),
		text: v.string(),
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
		const newItem = await ctx.db.insert("messages", {
			from: user._id,
			active: true,
			...args
		})
		return newItem
	},
})
