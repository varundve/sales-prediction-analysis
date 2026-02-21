import { NextResponse, type NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  // Protect dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  // Prevent logged-in users from auth pages
  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/sign-up")) &&
    token
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
