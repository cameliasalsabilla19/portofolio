"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative blur */}
        <div className="absolute left-1/2 -translate-x-1/2 w-96 h-32 bg-[#EB8DB5]/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <p className="text-[#A8D1E7] text-sm font-medium mb-4">
            Let&apos;s collaborate!
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-white/55 mb-10 max-w-xl mx-auto leading-relaxed">
            Have a project or opportunity in mind? Feel free to reach out.
            I&apos;m ready to help you achieve your goals with efficient solutions
            and great collaboration.
          </p>

          <motion.a
            href="mailto:cameliasalsabilla19@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base
              bg-gradient-to-r from-[#EB8DB5] via-[#D4A3C4] to-[#A8D1E7] text-white
              shadow-lg shadow-[#EB8DB5]/30 hover:shadow-[#EB8DB5]/50 transition-shadow duration-300"
          >
            <Send size={18} />
            Hire Me!
          </motion.a>

          {/* OR */}
          <div className="flex items-center gap-4 mt-10 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">atau hubungi via</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { label: "WhatsApp", href: "https://wa.me/6281327425528", icon: FaWhatsapp },
              { label: "Email", href: "mailto:cameliasalsabilla19@gmail.com", icon: MdEmail },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/camelia-salsabilla-842a69219", icon: FaLinkedinIn },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/10 text-white/60
                  hover:border-[#EB8DB5]/60 hover:text-white transition-all duration-200"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
