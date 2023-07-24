import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {redirect} from "next/navigation";
// export default withAuth(
//     // `withAuth` augments your `Request` with the user's token.
//     function middleware(req) {
//         console.log("MIDDLEWARE !")
//         const secret = process.env.AUTH_SECRET
//         const token = getToken({ req, secret })
//         token.then(()=>{console.log("JSON Web Token", token)})
//
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => token?.role === "admin",
//         },
//     }
// )
export default async function middleware(req:NextRequest){
        console.log("MIDDLEWARE !")
        const secret = process.env.AUTH_SECRET
        const token = await getToken({ req, secret })
        console.log("TOKEN: ",token)
        console.log("token admin: ", token?.admin)
        if(!token?.admin){
                return NextResponse.redirect(new URL('/', req.url))
        }



}
export const config = { matcher: ["/pricing"] }