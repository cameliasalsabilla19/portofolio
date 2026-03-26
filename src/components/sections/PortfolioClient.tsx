"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Portfolio } from "@/types/database";
import PortfolioModal from "@/components/ui/PortfolioModal";

const samplePortfolios: Portfolio[] = [
  {
    id: "1",
    title: "UI/UX Design: Wisata Bahan Makassar",
    image_url: null,
    start_date: "2024-01-01",
    end_date: null,
    description:
      "Platform digital wisata kuliner dan bahan makanan khas Makassar dengan UX yang intuitif dan visual yang menarik.",
    display_order: 0,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "UI/UX Design: Build E-Commerce App",
    image_url: null,
    start_date: "2023-09-01",
    end_date: "2023-12-31",
    description:
      "Aplikasi e-commerce modern dengan alur belanja yang seamless, desain yang responsif, dan pengalaman pengguna terbaik.",
    display_order: 1,
    created_at: "2023-09-01T00:00:00Z",
  },
  {
    id: "3",
    title: "UI/UX Design: Adcom Landing Page",
    image_url: null,
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    description:
      "Landing page untuk perusahaan advertising dengan konversi tinggi, animasi yang halus, dan desain yang profesional.",
    display_order: 2,
    created_at: "2023-06-01T00:00:00Z",
  },
  {
    id: "4",
    title: "UI/UX Design: Build Smart City App",
    image_url: null,
    start_date: "2023-03-01",
    end_date: "2023-05-31",
    description:
      "Aplikasi smart city yang menghubungkan warga dengan layanan pemerintah secara digital dan efisien.",
    display_order: 3,
    created_at: "2023-03-01T00:00:00Z",
  },
  {
    id: "5",
    title: "UI/UX Design: Redesign Website Niagahoster",
    image_url: null,
    start_date: "2022-10-01",
    end_date: "2023-01-31",
    description:
      "Redesign website hosting terkemuka dengan fokus pada keterbacaan, navigasi yang lebih baik, dan konversi penjualan.",
    display_order: 4,
    created_at: "2022-10-01T00:00:00Z",
  },
  {
    id: "6",
    title: "UI/UX Design: Design System Laracomp",
    image_url: null,
    start_date: "2022-06-01",
    end_date: "2022-09-30",
    description:
      "Sistem desain komprehensif dengan komponen yang konsisten, aksesibel, dan mudah dikembangkan oleh tim engineering.",
    display_order: 5,
    created_at: "2022-06-01T00:00:00Z",
  },
];

// Color gradients for portfolio cards without images
const cardGradients = [
  "from-[#EB8DB5]/30 to-[#D4A3C4]/20",
  "from-[#A8D1E7]/30 to-[#D4A3C4]/20",
  "from-[#FFBFC5]/30 to-[#EB8DB5]/20",
  "from-[#D4A3C4]/30 to-[#A8D1E7]/20",
  "from-[#A8D1E7]/30 to-[#FFBFC5]/20",
  "from-[#EB8DB5]/20 to-[#A8D1E7]/30",
];

interface Props {
  portfolios: Portfolio[];
}

export default function PortfolioClient({ portfolios }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);

  const data = portfolios.length > 0 ? portfolios : samplePortfolios;

  return (
    <>
      <section id="portfolio" className="py-24 px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              My <span className="gradient-text">Portfolio</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/55 mb-12 max-w-2xl"
          >
            Beberapa karya desain saya. Sebagian ada yang live, menampilkan
            fleksibilitas dalam berbagai gaya desain.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer"
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/10
                    bg-white/[0.03] hover:border-[#EB8DB5]/40 transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EB8DB5]/10"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${
                          cardGradients[i % cardGradients.length]
                        } flex items-center justify-center`}
                      >
                        <span className="text-5xl opacity-60">🎨</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                        Lihat Detail
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <h3 className="font-medium text-white/90 text-sm leading-snug group-hover:text-[#EB8DB5] transition-colors duration-200">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
