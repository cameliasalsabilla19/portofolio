"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, ImageIcon, LogOut, Home, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navItems = [
  { href: "/admin/experiences", label: "Experience", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.info("Berhasil keluar.");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0a0a0a] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="gradient-text text-xl font-bold">Camelia CMS</div>
        <div className="text-white/30 text-xs mt-1">Admin Dashboard</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <Home size={16} />
          Lihat Portfolio
        </Link>

        <div className="my-3 border-t border-white/5" />

        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
              pathname.startsWith(href)
                ? "bg-gradient-to-r from-[#EB8DB5]/20 to-[#D4A3C4]/10 text-[#EB8DB5] border border-[#EB8DB5]/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-6">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40
            hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
