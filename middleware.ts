import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId } = await auth()
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/login'

  if (!userId || userId === null) {
    return NextResponse.rewrite(redirectUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};