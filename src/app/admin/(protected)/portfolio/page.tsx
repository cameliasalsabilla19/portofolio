import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import PortfolioListActions from "@/components/admin/PortfolioListActions";

export default async function PortfolioAdminPage() {
  const supabase = await createClient();
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-white/50 text-sm mt-1">Kelola proyek portfolio Anda</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Tambah Baru
        </Link>
      </div>

      {!portfolios || portfolios.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl text-white/30">
          Belum ada portfolio. Tambah yang pertama!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolios.map((item) => (
            <div key={item.id} className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative aspect-video">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EB8DB5]/20 to-[#A8D1E7]/20 flex items-center justify-center text-4xl">
                    🎨
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white text-sm font-medium line-clamp-1">{item.title}</h3>
                <p className="text-white/40 text-xs mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/30">Order: {item.display_order}</span>
                  <PortfolioListActions id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
