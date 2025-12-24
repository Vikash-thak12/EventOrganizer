import { v } from "convex/values";
import { query } from "./_generated/server";

// query to get upcoming events based on max number of participants 
export const getFeaturedEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const events = await ctx.db.query("events")
            .withIndex("by_start_date")
            .filter((q) => q.gte(q.field("startDate"), now))
            .order("desc")
            .collect();

        // sorting on the basis of most number of registered
        const featured = events.sort((a, b) => b.registrationCount - a.registrationCount).slice(0, args.limit ?? 3);
        return featured;

    }
})



// get events by location like state and city 
export const getEventsByLocation = query({
    args: {
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        limit: v.optional(v.number())
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        let events = await ctx.db.query("events")
            .withIndex("by_start_date")
            .filter((q) => q.gte(q.field("startDate"), now))
            .collect();


        if (args.city) {
            events = events.filter((c) => c.city.toLowerCase() === args.city.toLowerCase());
        } else {
            events = events.filter((s) => s.state.toLowerCase() === args.state.toLowerCase())
        }

        return events.slice(0, args.limit ?? 4);

    }
})


export const getPopularEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const events = await ctx.db.query("events")
            .withIndex("by_start_date")
            .filter((q) => q.gte(q.field("startDate"), now))
            .collect();

        const popular = events.sort((a, b) => b.registrationCount - a.registrationCount).slice(0, args.limit ?? 4);
        return popular;
    }
})

export const getEventsByCategory = query({
    args: {
        category: v.string(),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const events = await ctx.db.query("events")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((f) => f.gte(f.field("startDate"), now))
            .collect();

        return events.slice(0, args.limit ?? 4);
    }
})


export const getCategoryCounts = query({
    handler: async (ctx) => {
        const now = Date.now();
        const events = await ctx.db.query("events")
            .withIndex("by_start_date")
            .filter((q) => q.gte(q.field("startDate"), now))
            .collect();

        const counts = {};
        events.forEach((event) => {
            counts[event.category] = (counts[event.category] || 0) + 1; 
        })

        return counts; 
    }
})  