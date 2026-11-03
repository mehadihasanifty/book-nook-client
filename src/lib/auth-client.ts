import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** The base URL of the Better Auth Next.js route handlers. */
    baseURL: process.env.BETTER_AUTH_URL,
    
})
