import { createClient } from "@/lib/supabase/server";
import ExperienceClient from "./ExperienceClient";

export default async function ExperienceSection() {
  const supabase = await createClient();
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  return <ExperienceClient experiences={experiences ?? []} />;
}
