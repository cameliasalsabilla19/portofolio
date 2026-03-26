"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { deleteExperience } from "@/actions/experiences";
import { toast } from "sonner";

export default function ExperienceListActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus experience ini?")) return;
    setLoading(true);
    try {
      await deleteExperience(id);
      toast.success("Experience dihapus.");
      router.refresh();
    } catch {
      toast.error("Gagal menghapus.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href={`/admin/experiences/${id}/edit`}
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10
          text-white/50 hover:text-[#A8D1E7] hover:border-[#A8D1E7]/40 transition-all"
      >
        <Pencil size={14} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10
          text-white/50 hover:text-red-400 hover:border-red-400/40 transition-all disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
