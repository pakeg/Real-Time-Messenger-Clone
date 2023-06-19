import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export default async function middleware(req: NextRequest) {
  const { status } = useSession();
  if (status !== "authenticated") {
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
