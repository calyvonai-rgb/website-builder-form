'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-xl"
      >
        <p className="font-sans text-xs text-stone-400 uppercase tracking-[0.22em] mb-8">
          Website Project Onboarding
        </p>

        <h1 className="font-serif text-5xl md:text-6xl text-stone-800 leading-tight mb-6">
          Let&rsquo;s bring your vision to life.
        </h1>

        <p className="font-sans text-stone-400 text-lg leading-relaxed mb-12 max-w-md mx-auto">
          This takes about 5 minutes and helps us build exactly what your business deserves.
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-[#C2956C] hover:bg-[#A87852] text-white
                     font-sans font-medium text-lg px-10 py-4 rounded-full
                     transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Let&rsquo;s build something great
          <span aria-hidden="true">&rarr;</span>
        </motion.button>
      </motion.div>

      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C2956C]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C2956C]/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
