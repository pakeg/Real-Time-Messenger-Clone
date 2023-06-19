import { default as NextAuthMiddleware } from "next-auth/middleware";

const middleware = NextAuthMiddleware;

export default middleware;

export const config = {
  matcher: [
    "/users",
    "/users/:path*",
    "/conversations",
    "/conversations/:path*",
  ],
};
