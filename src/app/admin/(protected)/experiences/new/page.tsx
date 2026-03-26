"use client";

import { createExperience } from "@/actions/experiences";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Tambah Experience</h1>
      <p className="text-white/50 text-sm mb-8">Isi form untuk menambahkan pengalaman baru.</p>
      <ExperienceForm action={createExperience} />
    </div>
  );
}
