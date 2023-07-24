import NextAuth from 'next-auth'
// import type { NextAuthOptions } from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import { FirestoreAdapter } from "@auth/firebase-adapter";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
// import { Adapter } from 'next-auth/adapters'
import { queryBuilder } from '@/lib/planetscale';

import Google from "next-auth/providers/google"

export const authOptions  = {
  secret: process.env.AUTH_SECRET,
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

  ],
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        // Assuming the user object from Google contains the email
        const { email } = user;

        // Determine the role based on the user's email
        const isAdmin = await getUserRoleByEmail(email);

        if(isAdmin){token.role = "admin"}
        else{token.role = "user"}

      }

      return token;
    },
    //@ts-ignore
    async session({token, session }){
      if (token && session){
        // session.user.id = token.id
        console.log(token)
        if (!session.user) {
          session.user = {};
        }
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role || "user";

        // session.user.image = token.image
        // session.user.username = token.username
      }
      return session
    },

  },


}

async function getUserRoleByEmail(email:string) {
  const users = await queryBuilder
      .selectFrom('users')
      .select(["id","email","admin","event_creator"])
      .where("email","=",email)
      .execute();

  console.log("\n\n USERS FROM AUTH API", users);
  if(users.length > 0){
    console.log("EXISTING USER: ", users[0])
    console.log(users[0].admin)
    return users[0].admin
  }
  return 0

}