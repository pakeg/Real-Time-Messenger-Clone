import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/actions/getSession";

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.email) {
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
