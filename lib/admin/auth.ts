import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email?: string | null) {
  const allowedEmails = getAllowedAdminEmails();
  if (!email || allowedEmails.length === 0) return false;
  return allowedEmails.includes(email.toLowerCase());
}

export async function getAdminUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !isAllowedAdminEmail(user.email)) return null;

    return user;
  } catch (error) {
    console.error("Admin auth check failed", error);
    return null;
  }
}

export async function requireAdminUser() {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin?error=unauthorized");
  }

  return user;
}
