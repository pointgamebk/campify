import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/how_to", "/policy/legal", "/events/:id"],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe-checkouts",
    "/api/webhook/stripe-accounts",
    "/api/uploadthing",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
