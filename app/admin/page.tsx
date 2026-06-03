import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { BrandMark } from "@/components/site/BrandMark";
import { SectionBadge } from "@/components/site/SectionBadge";
import { getAdminUser } from "@/lib/admin/auth";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Login | Know It Africa",
};

export default async function AdminLoginPage() {
  const user = await getAdminUser();

  if (user) redirect("/admin/dashboard");

  return (
    <main className="grid min-h-screen bg-light-bg px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_480px] lg:items-center">
          <div className="pattern-grid rounded-[2rem] bg-royal p-8 text-white shadow-luxury sm:p-12">
            <div className="mb-8 flex items-center gap-3">
              <BrandMark size="lg" />
              <div>
                <p className="text-2xl font-black">{siteConfig.name}</p>
                <p className="text-sm text-white/65">Admin Console</p>
              </div>
            </div>
            <SectionBadge label="Secure Admin Access" dark />
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Manage registrations, payments, and bootcamp operations.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">Sign in with a Supabase Auth admin account to view learner records and manage payment statuses.</p>
          </div>
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
