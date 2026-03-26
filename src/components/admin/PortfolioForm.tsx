"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { Upload, X } from "lucide-react";
import type { Portfolio } from "@/types/database";

interface Props {
  action: (formData: FormData) => Promise<unknown>;
  defaultValues?: Partial<Portfolio>;
  portfolioId?: string;
}

function toDate(str?: string | null): Date | undefined {
  if (!str) return undefined;
  try { return new Date(str); } catch { return undefined; }
}

export default function PortfolioForm({ action, defaultValues, portfolioId }: Props) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(defaultValues?.image_url ?? null);
  const [startDate, setStartDate] = useState<Date | undefined>(toDate(defaultValues?.start_date));
  const [endDate, setEndDate] = useState<Date | undefined>(toDate(defaultValues?.end_date));
  const [isPresent, setIsPresent] = useState(!defaultValues?.end_date);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (startDate) formData.set("start_date", format(startDate, "yyyy-MM-dd"));
    formData.set("end_date", isPresent ? "" : endDate ? format(endDate, "yyyy-MM-dd") : "");
    try {
      await action(formData);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col gap-5"
      encType="multipart/form-data"
    >
      <input type="hidden" name="existing_image_url" value={defaultValues?.image_url ?? ""} />

      {/* ── Judul ── */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" className="text-white/70 text-sm">
          Judul <span className="text-[#EB8DB5]">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Nama proyek"
          defaultValue={defaultValues?.title ?? ""}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
        />
      </div>

      {/* ── Tanggal Mulai ── */}
      <div className="flex flex-col gap-2">
        <Label className="text-white/70 text-sm">
          Tanggal Mulai Project <span className="text-[#EB8DB5]">*</span>
        </Label>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="Pilih tanggal mulai"
          toDate={new Date()}
        />
      </div>

      {/* ── Tanggal Selesai ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 text-sm">Tanggal Selesai Project</Label>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-white/50">Masih berlangsung</span>
            <input
              type="checkbox"
              checked={isPresent}
              onChange={(e) => setIsPresent(e.target.checked)}
              className="w-4 h-4 accent-[#EB8DB5] cursor-pointer"
            />
          </label>
        </div>
        {!isPresent ? (
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Pilih tanggal selesai"
            fromDate={startDate}
            toDate={new Date()}
          />
        ) : (
          <div className="px-3 py-2.5 rounded-xl bg-[#EB8DB5]/10 border border-[#EB8DB5]/20 text-[#EB8DB5] text-sm">
            Sekarang / Present
          </div>
        )}
      </div>

      {/* ── Deskripsi ── */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-white/70 text-sm">
          Deskripsi <span className="text-[#EB8DB5]">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Deskripsi singkat proyek..."
          defaultValue={defaultValues?.description ?? ""}
          required
          rows={4}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
        />
      </div>

      {/* ── Foto ── */}
      <div className="flex flex-col gap-2">
        <Label className="text-white/70 text-sm">Foto</Label>
        <div
          onClick={() => fileRef.current?.click()}
          className="relative cursor-pointer border border-dashed border-white/20 rounded-xl overflow-hidden hover:border-[#EB8DB5]/50 transition-colors"
        >
          {preview ? (
            <div className="relative aspect-video">
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setPreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <div className="aspect-video flex flex-col items-center justify-center gap-2 text-white/30">
              <Upload size={24} />
              <span className="text-sm">Klik untuk upload foto</span>
              <span className="text-xs">PNG, JPG, WebP (maks 5MB)</span>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" name="image" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* ── Urutan ── */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="display_order" className="text-white/70 text-sm">Urutan tampil</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          defaultValue={defaultValues?.display_order ?? 0}
          className="bg-white/5 border-white/10 text-white w-28"
        />
      </div>

      {/* ── Buttons ── */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white rounded-xl">
          {portfolioId ? "Simpan Perubahan" : "Tambahkan"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolio")}
          className="border-white/10 text-white/60 hover:text-white rounded-xl">
          Batal
        </Button>
      </div>
    </form>
  );
}
