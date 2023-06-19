import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  if (!req.cookies.has("__Secure-next-auth.session-token")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/users",
    "/users/:path*",
    "/conversations",
    "/conversations/:path*",
  ],
};
