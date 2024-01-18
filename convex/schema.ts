import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		name: v.string(),
		role: v.array(v.string()),
	}),
	items: defineTable({
		level: v.float64(),
		name: v.string(),
		owner: v.id('users'),
		type: v.string(),
	}),
	tasks: defineTable({
		agent: v.string(),
		customer: v.id('users'),
		item: v.id('items'),
		type: v.string(),
	}).index("customer", ["customer"]),
})
