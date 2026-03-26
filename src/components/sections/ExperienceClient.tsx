"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import type { Experience } from "@/types/database";

/** Format ISO date string (or null) to readable display */
function formatDate(iso?: string | null): string {
  if (!iso) return "Sekarang";
  try { return format(new Date(iso), "d MMM yyyy", { locale: localeId }); }
  catch { return iso; }
}

const sampleExperiences: Experience[] = [
  {
    id: "1",
    start_date: "2024-04-01",
    end_date: null,
    title: "Amaseba UX Research Internship",
    description:
      "Project based internship di Amaseba sebagai UI/UX Designer. Melakukan research design melalui comprehensive practices dalam design thinking, user research, dan product analysis.",
    display_order: 0,
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "2",
    start_date: "2023-11-01",
    end_date: "2024-03-31",
    title: "Niagahoster UI/UX Designer Internship",
    description:
      "Magang di Niagahoster bersama freelancer ekonomi. Berkontribusi dalam design system, design thinking, Design Process, Prototyping, Visual Design.",
    display_order: 1,
    created_at: "2023-11-01T00:00:00Z",
  },
  {
    id: "3",
    start_date: "2022-08-01",
    end_date: "2023-01-31",
    title: "Nufi UI/UX Designer Internship",
    description:
      "Magang di Nufi Design Studio bersama sebuah academy. Mempelajari UI Design, thinking, Searching, dan Testing, UI Research, Prototyping, Visual Design.",
    display_order: 2,
    created_at: "2022-08-01T00:00:00Z",
  },
  {
    id: "4",
    start_date: "2023-02-01",
    end_date: "2023-07-31",
    title: "Junior Graphic Designer – VSGA",
    description:
      "Belajar di Dicoding bersama sebuah academy. Sebagai Junior Graphic Designer, mempelajari Basic principles of Design & Communication, implemented design.",
    display_order: 3,
    created_at: "2023-02-01T00:00:00Z",
  },
];

interface Props {
  experiences: Experience[];
}

export default function ExperienceClient({ experiences }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const data = experiences.length > 0 ? experiences : sampleExperiences;

  return (
    <section id="experience" className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03]
                  hover:border-[#EB8DB5]/40 hover:bg-[#EB8DB5]/5 transition-all duration-300"
              >
                {/* Date range badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={13} className="text-[#A8D1E7]" />
                  <span className="text-xs font-medium text-[#A8D1E7] bg-[#A8D1E7]/10 px-2.5 py-0.5 rounded-full">
                    {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-start gap-2 mb-3">
                  <Briefcase size={15} className="text-[#EB8DB5] mt-0.5 shrink-0" />
                  <h3 className="font-semibold text-white/90 text-sm leading-snug">
                    {exp.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
