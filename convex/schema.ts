import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	users: defineTable({
		active: v.boolean(),
		name: v.string(),
		tokenIdentifier: v.string(),
		email: v.string(),
		role: v.object({
			customer: v.optional(v.boolean()),
			agent: v.optional(v.boolean()),
			admin: v.optional(v.boolean()),
		}),
	}).index("by_token", ["tokenIdentifier"]),

	items: defineTable({
		active: v.boolean(),
		name: v.string(),
		level: v.optional(v.number()),
		owner: v.id("users"),
		type: v.union(
			v.literal("slashing"),
			v.literal("striking"),
			v.literal("piercing")
		),
	}),
	tasks: defineTable({
		active: v.boolean(),
		type: v.union(v.literal("repair"), v.literal("enchant")),
		item: v.id("items"),
		description: v.string(),
		customer: v.id("users"),
		agent: v.optional(v.id("users")),
		state: v.union(
			v.literal("open"),
			v.literal("in progress"),
			v.literal("completed"),
			v.literal("cancelled")
		),	
		updated: v.optional(v.number()),
		updated_by: v.optional(v.id("users")),
	}),
	messages: defineTable({
		active: v.boolean(),
		from: v.id("users"),
		to: v.union(v.id("tasks"), v.id("users")),
		text: v.string(),
	}),
})
