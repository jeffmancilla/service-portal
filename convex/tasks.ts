import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const get = query({
	args: { user: v.optional(v.id("users")) },
	handler: async (ctx, args) => {
		const tasks = await ctx.db
			.query("tasks")
			.filter((q) => q.eq(q.field("customer"), args.user))
			.collect()
		const items = await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("owner"), args.user))
			.collect()
		const tasksWithItems = tasks.map((task) => {
			const item = items.find((item) => item._id === task.item)
      const itemLabel = item?.level ? `${item?.name} +${item?.level}` : item?.name 
			return { ...task, itemLabel: itemLabel }
			// const taskWithItems = {
			//   ...task,
			//   item: { displayName: `${item?.name} +${item?.level}`, ...item }
			// }
			// return taskWithItems
		})
		console.log(tasksWithItems)

		return tasksWithItems
	},
})

export const create = mutation({
	args: {
		customer: v.id("users"),
		item: v.id("items"),
		state: v.string(),
		type: v.string(),
		description: v.string(),
	},
	handler: async (ctx, args) => {
		const newTask = await ctx.db.insert("tasks", { ...args })
		return newTask
	},
})
