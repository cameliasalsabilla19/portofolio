"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadCV(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("cv") as File;

  if (!file || file.size === 0) throw new Error("No file provided");
  if (file.type !== "application/pdf") throw new Error("Only PDF files are allowed");

  const { error } = await supabase.storage
    .from("cv")
    .upload("cv.pdf", file, {
      upsert: true,          // overwrite if already exists
      contentType: "application/pdf",
    });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  return { success: true };
}

export async function getCVUrl(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = supabase.storage.from("cv").getPublicUrl("cv.pdf");
  return data?.publicUrl ?? null;
}
