import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { updateExperience } from "@/actions/experiences";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) notFound();

  const updateAction = updateExperience.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Edit Experience</h1>
      <p className="text-white/50 text-sm mb-8">Perbarui data experience yang ada.</p>
      <ExperienceForm action={updateAction} defaultValues={experience} experienceId={id} />
    </div>
  );
}
