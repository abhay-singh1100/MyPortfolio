"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  date: string;
  description: string[];
  technologies: string[];
  githubLink: string;
  demoLink: string;
  imagePath: string;
}

export default function ProjectCard({
  title,
  date,
  description,
  technologies,
  githubLink,
  demoLink,
  imagePath
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-[#18243a] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        whileHover={{ y: -5 }}
      >
        <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <Image
            src={imagePath}
            alt={title}
            width={600}
            height={300}
            className="w-full h-48 object-cover transition-all duration-300 group-hover:opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#4cd7ff] text-white px-4 py-2 rounded-full font-medium"
            >
              View Details
            </motion.button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#4cd7ff] mb-2">{title}</h3>
          <p className="text-sm text-white/60 mb-3">{date}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22304a] text-[#4cd7ff] px-3 py-1 rounded hover:bg-[#4cd7ff] hover:text-white font-semibold transition flex items-center gap-2"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4cd7ff] text-[#0a1833] px-3 py-1 rounded hover:bg-[#ff4c60] hover:text-white font-semibold transition flex items-center gap-2"
            >
              <FaExternalLinkAlt /> Demo
            </a>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#18243a] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#4cd7ff]">{title}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/60 hover:text-white p-2"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <Image
                src={imagePath}
                alt={title}
                width={800}
                height={400}
                className="w-full rounded-lg mb-6 object-cover"
              />
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-white/90">
                  {description.map((desc, idx) => (
                    <p key={idx} className="mb-2">{desc}</p>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#22304a] text-[#4cd7ff] px-4 py-2 rounded-full hover:bg-[#4cd7ff] hover:text-white font-semibold transition flex items-center gap-2"
                  >
                    <FaGithub /> View Source
                  </a>
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4cd7ff] text-[#0a1833] px-4 py-2 rounded-full hover:bg-[#ff4c60] hover:text-white font-semibold transition flex items-center gap-2"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
