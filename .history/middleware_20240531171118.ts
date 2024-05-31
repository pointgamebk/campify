import { authMiddleware } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

// export default authMiddleware({
//   publicRoutes: [
//     "/",
//     "/how_to",
//     "/policy/legal",
//     "/api/webhook/clerk",
//     "/events/:id",
//     "/api/webhook/stripe",
//     "/api/uploadthing",
//   ],
//   ignoredRoutes: [
//     "/api/webhook/clerk",
//     "/api/webhook/stripe",
//     "/api/uploadthing",
//   ],
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export default authMiddleware({
  publicRoutes: ["/", "/how_to", "/policy/legal", "/events/:id"],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Add this to log incoming requests
export function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): void {
  console.log(`Incoming request to: ${req.url}`);
  next();
}
