import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import ExperienceListActions from "@/components/admin/ExperienceListActions";

export default async function ExperiencesPage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="text-white/50 text-sm mt-1">Kelola riwayat pengalaman kerja</p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Tambah Baru
        </Link>
      </div>

      {!experiences || experiences.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl text-white/30">
          Belum ada data experience. Tambah yang pertama!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#A8D1E7] bg-[#A8D1E7]/10 px-2 py-0.5 rounded-full">
                    {exp.start_date} – {exp.end_date ?? "Sekarang"}
                  </span>
                  <span className="text-xs text-white/30">Order: {exp.display_order}</span>
                </div>
                <h3 className="text-white font-semibold text-sm">{exp.title}</h3>
                <p className="text-white/50 text-xs mt-1 line-clamp-2">{exp.description}</p>
              </div>
              <ExperienceListActions id={exp.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
