"use client";
import { motion } from 'framer-motion';

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-[#4cd7ff] text-[#0a1833]'
              : 'bg-[#22304a] text-[#4cd7ff] hover:bg-[#4cd7ff22]'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
