"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import type { Experience } from "@/types/database";

/** Parse stored ISO date string → Date object */
function toDate(str?: string | null): Date | undefined {
  if (!str) return undefined;
  try { return new Date(str); } catch { return undefined; }
}

/** Format Date → ISO string "yyyy-MM-dd" for DB storage */
function toISO(d?: Date): string {
  if (!d) return "";
  return format(d, "yyyy-MM-dd");
}

interface Props {
  action: (formData: FormData) => Promise<unknown>;
  defaultValues?: Partial<Experience>;
  experienceId?: string;
}

export default function ExperienceForm({ action, defaultValues, experienceId }: Props) {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>(toDate(defaultValues?.start_date));
  const [endDate, setEndDate] = useState<Date | undefined>(toDate(defaultValues?.end_date));
  const [isPresent, setIsPresent] = useState(!defaultValues?.end_date);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate) { toast.error("Pilih tanggal mulai."); return; }
    const formData = new FormData(e.currentTarget);
    formData.set("start_date", toISO(startDate));
    formData.set("end_date", isPresent ? "" : toISO(endDate));
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
    >
      {/* ── Tanggal Mulai ── */}
      <div className="flex flex-col gap-2">
        <Label className="text-white/70 text-sm">
          Tanggal Mulai <span className="text-[#EB8DB5]">*</span>
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
          <Label className="text-white/70 text-sm">Tanggal Selesai</Label>
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
        {!isPresent && (
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Pilih tanggal selesai"
            fromDate={startDate}
            toDate={new Date()}
          />
        )}
        {isPresent && (
          <div className="px-3 py-2.5 rounded-xl bg-[#EB8DB5]/10 border border-[#EB8DB5]/20 text-[#EB8DB5] text-sm">
            Sekarang / Present
          </div>
        )}
      </div>

      {/* ── Judul ── */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" className="text-white/70 text-sm">
          Judul <span className="text-[#EB8DB5]">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Nama posisi / internship"
          defaultValue={defaultValues?.title ?? ""}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
        />
      </div>

      {/* ── Deskripsi ── */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-white/70 text-sm">
          Deskripsi <span className="text-[#EB8DB5]">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Deskripsi singkat kegiatan dan pencapaian..."
          defaultValue={defaultValues?.description ?? ""}
          required
          rows={4}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
        />
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
          {experienceId ? "Simpan Perubahan" : "Tambahkan"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/experiences")}
          className="border-white/10 text-white/60 hover:text-white rounded-xl">
          Batal
        </Button>
      </div>
    </form>
  );
}
