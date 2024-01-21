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
		// active: v.boolean(),
		name: v.string(),
		level: v.optional(v.number()),
		// owner: v.id("users"),
		type: v.union(
			v.literal("slashing"),
			v.literal("striking"),
			v.literal("piercing")
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
		const newItem = await ctx.db.insert("items", {
			owner: user._id,
			active: true,
			...args,
		})
		return newItem
	},
})
