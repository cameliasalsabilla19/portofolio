"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").insert({
    start_date: formData.get("start_date") as string,
    end_date: (formData.get("end_date") as string) || null,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    display_order: Number(formData.get("display_order") ?? 0),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update({
      start_date: formData.get("start_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      display_order: Number(formData.get("display_order") ?? 0),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/experiences");
}
