import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|sw.js|manifest.json|images|icons|workbox-).*)",
  ],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define paths that are public (accessible without a token) and private
  const noAuth = ['/login' ]
  const auth =["/students"]
  
  // Get the token from the cookies
  const token = !!request.cookies.has('miva-token')

  // Redirect logic based on the path and token presence
  if (token && noAuth.includes(path)) {
    return NextResponse.redirect(new URL("/students", request.url));
  } 
  if (!token && auth.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } 
  if(path ==="/"){
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
// export const config = {
//   matcher: ['/', '/login', '/overview'],
// }