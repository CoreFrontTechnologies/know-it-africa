"use client";

import { LockKeyhole, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message || "Invalid admin credentials.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (loginError) {
      console.error("Admin login failed", loginError);
      setError("Admin login is not configured yet. Check your Supabase environment variables.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-luxury sm:p-8">
      <div>
        <label className="mb-2 block text-sm font-black text-royal" htmlFor="email">Email</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <input id="email" name="email" type="email" required placeholder="admin@example.com" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-black text-royal" htmlFor="password">Password</label>
        <div className="relative">
          <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <input id="password" name="password" type="password" required placeholder="Enter admin password" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </div>
      </div>
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div> : null}
      <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-royal shadow-gold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {loading ? "Signing in..." : "Login to Admin"}
      </button>
    </form>
  );
}
