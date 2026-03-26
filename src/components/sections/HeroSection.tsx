"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#EB8DB5]/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#A8D1E7]/8 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center w-full">

        {/* ── LEFT: Oval Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex justify-center order-1"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-[420px]">
            {/* Oval frame */}
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden">
              <Image
                src="/profile.jpeg"
                alt="Camelia – UI/UX Designer"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-5 order-2"
        >
          {/* Hello Welcome */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/70 text-sm font-medium tracking-wide"
          >
            Hello Welcome
          </motion.p>

          {/* Name + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-2">
              I&apos;m <span className="gradient-text">Camelia</span>
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              UI/UX Designer
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/60 text-base leading-relaxed max-w-md"
          >
            As a UI/UX Designer, I derive immense joy from aiding individuals in
            developing their businesses. I am thrilled to share my creativity and
            expertise in shaping outstanding user experiences by harmonizing
            captivating design aesthetics with a deep comprehension of user needs.
          </motion.p>

          {/* CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm
                bg-gradient-to-r from-[#EB8DB5] to-[#D4A3C4] text-white
                hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-[#EB8DB5]/20"
            >
              <Download size={16} />
              Curriculum Vitae
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
