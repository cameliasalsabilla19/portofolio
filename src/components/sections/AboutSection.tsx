"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-white/65 leading-relaxed max-w-3xl text-base md:text-lg">
            A results-driven professional with strengths in web development,
            project management, client handling, and customer service. Skilled in
            delivering efficient solutions, managing multiple projects, and maintaining
            strong communication with clients and teams.
          </p>
        </motion.div>

        {/* Skill badges */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {[
            "Web Development", "Project Management", "Client Relations",
            "Customer Service", "Problem Solving", "Team Collaboration",
            "Communication", "Time Management",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-1.5 rounded-full text-sm border border-white/10 text-white/70
                bg-white/5 hover:border-[#EB8DB5]/50 hover:text-white transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
