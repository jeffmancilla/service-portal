import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
		role: v.optional(v.array(v.string())),
		tokenIdentifier: v.string(),
	}).index("by_token", ["tokenIdentifier"]),

	items: defineTable({
		level: v.number(),
		name: v.string(),
		owner: v.id("users"),
		type: v.string(),
	}),
	tasks: defineTable({
		agent: v.string(),
		customer: v.id("users"),
		item: v.id("items"),
		type: v.string(),
	}).index("customer", ["customer"]),

	messages: defineTable({
		from: v.id("users"),
		task: v.optional(v.id("tasks")),
		text: v.string(),
		to: v.optional(v.id("users")),
	}),
})