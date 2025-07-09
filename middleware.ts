// middleware.ts - Updated to allow public access to resume builder
import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/builder/:path((?!new$).*)", // Exclude /builder/new from authentication
    "/profile/:path*",
    "/subscription/:path*"
  ]
}