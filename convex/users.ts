import { mutation } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        // below is what i'm getting as identity 
        {
            //   tokenIdentifier: 'https://legal-caiman-24.clerk.accounts.dev|user_37C9bm5PyAQ1991Rt5kvHJ5Avfm',
            //   issuer: 'https://legal-caiman-24.clerk.accounts.dev',
            //   subject: 'user_37C9bm5PyAQ1991Rt5kvHJ5Avfm',
            //   name: 'Vikash Thakur',
            //   givenName: 'Vikash',
            //   familyName: 'Thakur',
            //   pictureUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zN0M5Ym1wWjdIY2F1cTZGbmt6SVplNWQ5cVoifQ',
            //   email: 'vikashthak8@gmail.com',
            //   emailVerified: true,
            //   phoneNumberVerified: false,
            //   updatedAt: '2025-12-23T07:43:57+00:00'
        }
        // console.log("Identity", identity) 
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        // Note: If you don't want to define an index right away, you can use
        // ctx.db.query("users")
        //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
        //  .unique();
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name, updatedAt: Date.now() });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("users", {
            name: identity.name ?? "Anonymous",
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email,
            // gender: identity.gender,  // i'm not getting from the clerk 
            imageUrl: identity.pictureUrl,
            hasCompletedOnboarding: false,
            freeEventsCreated: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    },
});