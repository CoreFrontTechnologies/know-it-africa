import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, LogOut, Settings, Users } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";
import { siteConfig } from "@/lib/constants";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children, email }: { children: ReactNode; email?: string | null }) {
  return (
    <div className="min-h-screen bg-light-bg">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-royal/10 bg-royal p-6 text-white lg:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-sm font-black text-royal">KI</div>
          <div>
            <p className="text-lg font-black">{siteConfig.name}</p>
            <p className="text-xs text-white/60">Admin Console</p>
          </div>
        </Link>
        <nav className="mt-10 space-y-2">
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/74 transition hover:bg-white/10 hover:text-white">
              <Icon className="h-4 w-4 text-gold" /> {label}
            </Link>
          ))}
        </nav>
        <form action={signOutAdmin} className="absolute inset-x-6 bottom-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-bold text-white/75 transition hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-royal/10 bg-white/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Know It Africa Admin</p>
              <p className="mt-1 text-sm font-semibold text-muted-text">Signed in as {email ?? "admin"}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:hidden">
              {adminLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="rounded-full bg-soft-blue px-4 py-2 text-xs font-black text-primary-blue">
                  {label}
                </Link>
              ))}
              <form action={signOutAdmin}>
                <button className="rounded-full bg-royal px-4 py-2 text-xs font-black text-white">Sign out</button>
              </form>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
