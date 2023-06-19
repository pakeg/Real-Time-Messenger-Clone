export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/users",
    "/users/:path*",
    "/conversations",
    "/conversations/:path*",
  ],
};
