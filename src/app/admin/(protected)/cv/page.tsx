"use client";

import { useRef, useState } from "react";
import { uploadCV } from "@/actions/cv";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CVPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }
    setFile(f);
    setStatus("idle");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    try {
      const fd = new FormData();
      fd.append("cv", file);
      await uploadCV(fd);
      setStatus("success");
      toast.success("CV berhasil diupload!");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const cvPublicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Upload Curriculum Vitae</h1>
        <p className="text-white/50 text-sm mt-1">
          Upload file PDF CV terbaru. File lama akan otomatis tergantikan.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200
          ${dragOver
            ? "border-[#EB8DB5] bg-[#EB8DB5]/10"
            : "border-white/15 hover:border-[#EB8DB5]/50 hover:bg-white/[0.02]"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#EB8DB5]/15 flex items-center justify-center">
              <FileText size={28} className="text-[#EB8DB5]" />
            </div>
            <p className="text-white font-medium">{file.name}</p>
            <p className="text-white/40 text-sm">{(file.size / 1024).toFixed(1)} KB · PDF</p>
            <p className="text-white/30 text-xs">Klik untuk ganti file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
              <Upload size={28} className="text-white/30" />
            </div>
            <p className="text-white/70 font-medium">Drag & drop file PDF di sini</p>
            <p className="text-white/30 text-sm">atau klik untuk memilih file</p>
          </div>
        )}
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm bg-green-400/10 px-4 py-3 rounded-xl">
          <CheckCircle size={16} />
          CV berhasil diupload dan sudah live di website!
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-xl">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || status === "uploading"}
        className="mt-6 w-full py-3.5 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white
          hover:opacity-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
      >
        {status === "uploading" ? (
          <><Loader2 size={16} className="animate-spin" /> Mengupload...</>
        ) : (
          <><Upload size={16} /> Upload CV</>
        )}
      </button>

      {/* Current CV link */}
      <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p className="text-white/50 text-xs mb-2 uppercase tracking-wider font-medium">CV Saat Ini</p>
        <a
          href={cvPublicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#EB8DB5] hover:text-[#D4A3C4] text-sm transition-colors break-all"
        >
          <FileText size={14} />
          {cvPublicUrl}
        </a>
      </div>
    </div>
  );
}
