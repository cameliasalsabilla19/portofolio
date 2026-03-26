"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MessageCircle, Lightbulb, Wand2 } from "lucide-react";

const commitments = [
  {
    number: "1",
    icon: Clock,
    title: "On Time Revision",
    description:
      "I ensure that every revision is completed on time while maintaining high quality. I will carefully review every piece of feedback to ensure the final result is professional, meets your needs, and is delivered according to the agreed-upon schedule.",
    color: "#A8D1E7",
  },
  {
    number: "2",
    icon: MessageCircle,
    title: "Good Communication",
    description:
      "I am an open, friendly person who is always willing to discuss matters throughout the work process. I always strive to maintain clear, responsive, and professional communication so that I can fully understand your needs. You can also contact me via various platforms during business hours to discuss matters, provide feedback, or inquire about the project's progress.",
    color: "#FFBFC5",
  },
  {
    number: "3",
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "I strive to understand every need and challenge in your project. With a creative and focused approach, I seek out the right design solutions so that the results are not only visually appealing but also truly help achieve your desired goals.",
    color: "#EB8DB5",
  },
  {
    number: "4",
    icon: Wand2,
    title: "Imaginative Creativity",
    description:
      "I enjoy exploring new ideas and bringing a creative approach to every project. With imagination and an open mind, I strive to create something engaging, innovative, and memorable.",
    color: "#D4A3C4",
  },
];

export default function CommitmentsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6 bg-[#0f0f0f]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Four Commitments{" "}
            <span className="gradient-text">| Consistently Uphold</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03]
                    hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl font-bold"
                      style={{ backgroundColor: `${c.color}20`, color: c.color }}
                    >
                      {c.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={16} style={{ color: c.color }} />
                        <h3 className="font-semibold text-white/90">{c.title}</h3>
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
