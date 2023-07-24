import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import { FirestoreAdapter } from "@auth/firebase-adapter";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "../../../../lib/mongodb"
// import app from "config/firebase"
import { authOptions } from '@/config/authOptions'
// import { Firestore } from 'firebase/firestore';

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
