import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
        email: v.string(), 
        // gender: v.optional(v.string()), 
        imageUrl: v.optional(v.string()), 
        hasCompletedOnboarding: v.boolean(), 
        location: v.optional(
            v.object({
                city: v.string(), 
                state: v.optional(v.string()),
                country: v.string()
            })
        ),
        interests: v.optional(v.array(v.string())), 

        // for subscription, users can create one free event 
        freeEventsCreated: v.number(), 
        createdAt: v.number(), 
        updatedAt: v.number()
    }).index("by_token", ["tokenIdentifier"]),

    events: defineTable({
        title: v.string(), 
        description: v.string(), 
        slug: v.string(), 

        // organizers
        organizerId: v.id("users"),
        organizerName: v.string(), 

        // Event Details
        category: v.string(), 
        tags: v.array(v.string()), 

        // date and time 
        startDate: v.number(), 
        endDate: v.number(), 
        timeZone: v.number(), 

        // location 
        locationType: v.union(v.literal("Physical"), v.literal("Online")), 
        venue: v.optional(v.string()), 
        address: v.optional(v.string()), 
        city: v.string(), 
        state: v.optional(v.string()), 
        country: v.string(), 


        // capacity and ticketing 
        capacity: v.number(), 
        ticketType: v.union(v.literal("Free"), v.literal("Paid")), 
        ticketPrice: v.optional(v.number()), 
        registrationCount: v.number(), 


        // customization 
        coverImage: v.string(), 
        themeColor: v.string(), 


        // timestamps
        createdAt: v.number(), 
        updatedAt: v.number(), 
    })
    .index("by_organizer", ["organizerId"])
    .index("by_category", ["category"])
    .index("by_start_date", ["startDate"])
    .index("by_slug", ["slug"])
    .searchIndex("search_title", { searchField: "title"}); 



    // Registrations/Tickets
  registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),

    // Attendee info
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    // QR Code for entry
    qrCode: v.string(), // Unique ID for QR

    // Check-in
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    // Status
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),

    registeredAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_event_user", ["eventId", "userId"])
    .index("by_qr_code", ["qrCode"]),
}) 