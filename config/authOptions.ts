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
import { queryBuilder, insertUser, getUserRoleByEmail } from '@/lib/planetscale';

import Google from "next-auth/providers/google"

// @ts-ignore
export const authOptions  = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_SECRET ,
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
        const { email, name } = user;

        // Determine the role based on the user's email
        const isAdmin = await getUserRoleByEmail(email);

        if(isAdmin){token.role = "admin"}
        else{
          //ToDo: should this be done asychronously in another function?
          const newUser = await insertUser(name, name, email, false, false);
          console.log("NEW USER FROM AUTH API", newUser);
          token.role = "user"

        }

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





