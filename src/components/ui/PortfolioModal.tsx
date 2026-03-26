"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { Portfolio } from "@/types/database";

interface Props {
  item: Portfolio | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: Props) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#141414] border border-white/10 text-white">
        {item && (
          <>
            {/* Thumbnail */}
            {item.image_url ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-4">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-xl mb-4 bg-gradient-to-br from-[#EB8DB5]/20 to-[#A8D1E7]/20 flex items-center justify-center text-6xl">
                🎨
              </div>
            )}

            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                {item.title}
              </DialogTitle>
              <DialogDescription className="text-white/60 leading-relaxed mt-2">
                {item.description}
              </DialogDescription>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
