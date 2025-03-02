import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/register"];

export default function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("access_token");
  const path = request.nextUrl.pathname;

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !publicPaths.includes(path)) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", path);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
