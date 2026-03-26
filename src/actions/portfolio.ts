"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function uploadImage(file: File): Promise<string | null> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(filename, file);
  if (error) throw new Error(error.message);
  const { data } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(filename);
  return data.publicUrl;
}

export async function createPortfolio(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("image") as File | null;
  let imageUrl: string | null = null;
  if (file && file.size > 0) {
    imageUrl = await uploadImage(file);
  }
  const { error } = await supabase.from("portfolios").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: imageUrl,
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    display_order: Number(formData.get("display_order") ?? 0),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function updatePortfolio(id: string, formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  let imageUrl: string | null = existingImageUrl;
  if (file && file.size > 0) {
    imageUrl = await uploadImage(file);
  }

  const { error } = await supabase
    .from("portfolios")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image_url: imageUrl,
      start_date: (formData.get("start_date") as string) || null,
      end_date: (formData.get("end_date") as string) || null,
      display_order: Number(formData.get("display_order") ?? 0),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolio(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolios").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
