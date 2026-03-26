"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { deletePortfolio } from "@/actions/portfolio";
import { toast } from "sonner";

export default function PortfolioListActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus portfolio ini?")) return;
    setLoading(true);
    try {
      await deletePortfolio(id);
      toast.success("Portfolio dihapus.");
      router.refresh();
    } catch {
      toast.error("Gagal menghapus.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/portfolio/${id}/edit`}
        className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10
          text-white/50 hover:text-[#A8D1E7] hover:border-[#A8D1E7]/40 transition-all"
      >
        <Pencil size={13} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10
          text-white/50 hover:text-red-400 hover:border-red-400/40 transition-all disabled:opacity-50"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
