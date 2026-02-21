import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Auth callback not used with local auth migration
  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/auth/login`)
}
