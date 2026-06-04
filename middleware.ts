import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const isAdminLoginPath = (pathname: string) => pathname === "/admin";
const isProtectedAdminPath = (pathname: string) => pathname.startsWith("/admin/");

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowedAdminEmail(email?: string | null) {
  const allowedEmails = getAllowedAdminEmails();
  if (!email || allowedEmails.length === 0) return false;
  return allowedEmails.includes(email.toLowerCase());
}

function unauthorizedUrl(request: NextRequest) {
  const url = new URL("/admin", request.url);
  url.searchParams.set("error", "unauthorized");
  return url;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isProtectedAdminPath(pathname)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowedAdmin = isAllowedAdminEmail(user?.email);

  if (isProtectedAdminPath(pathname) && !user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isProtectedAdminPath(pathname) && user && !allowedAdmin) {
    return NextResponse.redirect(unauthorizedUrl(request));
  }

  if (isAdminLoginPath(pathname) && user && allowedAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
