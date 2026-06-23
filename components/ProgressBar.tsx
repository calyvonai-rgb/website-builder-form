'use client';

import { motion } from 'framer-motion';

interface Props {
  current: number;
  total: number;
  section: string;
}

export default function ProgressBar({ current, total, section }: Props) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-sm px-6 pt-4 pb-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-xs text-stone-400 uppercase tracking-widest">
            {section}
          </span>
          <span className="font-sans text-xs text-stone-400 tabular-nums">
            {current}
            <span className="opacity-40"> / {total}</span>
          </span>
        </div>
        <div className="h-[2px] bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C2956C] rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
}
