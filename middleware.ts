import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/how_to", "/policy/legal", "/events/:id", "/learn"],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe-checkouts",
    "/api/webhook/stripe-accounts",
    "/api/uploadthing",
    "/api/mailgun",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
