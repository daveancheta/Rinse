import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "..";
import { nextCookies } from "better-auth/next-js";
import * as schema from '../db/schema'; // Add this

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema, 
    }),
    emailAndPassword: {    
        enabled: true
    },
    plugins: [nextCookies()]
});