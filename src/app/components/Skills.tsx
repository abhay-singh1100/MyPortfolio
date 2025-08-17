"use client";
import { motion } from 'framer-motion';
import SkillChart from './SkillChart';

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="max-w-4xl mx-auto py-10 xs:py-16 sm:py-24 px-2 xs:px-4 border-b border-[#4cd7ff22]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#4cd7ff] mb-8">
        Skills
      </h2>
      <SkillChart />
    </motion.section>
  );
}
