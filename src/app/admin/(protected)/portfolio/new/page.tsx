"use client";

import { createPortfolio } from "@/actions/portfolio";
import PortfolioForm from "@/components/admin/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Tambah Portfolio</h1>
      <p className="text-white/50 text-sm mb-8">Isi form untuk menambahkan proyek baru.</p>
      <PortfolioForm action={createPortfolio} />
    </div>
  );
}
