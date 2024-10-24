import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./routes";

export async function middleware(req: NextRequest, res: NextResponse) {
  // Access cookies
  const token = req.cookies.get("token")?.value;
  const lang = req.cookies.get("NEXT_LOCALE")?.value;
  console.log("token", token);
  const path = req.nextUrl;
  const url = req.nextUrl.pathname.replace(`/${lang}`, "");
  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(url);
  });
  const isAuthRoute = authRoutes.includes(url);

  if ((!token || token === "undefined") && isProtectedRoute) {
    path.pathname = `/login`;

    return NextResponse.redirect(path);
  }
  if (token && isAuthRoute) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect");
    if (redirectUrl) {
      req.nextUrl.pathname = redirectUrl;
      req.nextUrl.searchParams.delete("redirect"); // Prevent repeated redirects
      return NextResponse.redirect(req.nextUrl);
    }

    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
