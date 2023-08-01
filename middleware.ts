import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {redirect} from "next/navigation";






export default async function middleware(req:NextRequest){
        console.log("MIDDLEWARE !")
        const secret = process.env.AUTH_SECRET
        const token = await getToken({ req, secret })

        if(!token?.role){
                console.log('NOT ADMIN: ', token?.role)
                return NextResponse.redirect(new URL('/', req.url))
        }

}
export const config = { matcher: ["/pricing"] }