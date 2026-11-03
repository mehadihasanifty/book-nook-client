
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is not configured");
}

const client = new MongoClient(mongoUrl);

const db = client.db("book-nook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

 emailAndPassword: {
  enabled: true,
  minPasswordLength: 6,
  maxPasswordLength: 128,
  autoSignIn: false,
},

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
 