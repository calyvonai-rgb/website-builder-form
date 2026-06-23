'use client';

import { motion } from 'framer-motion';

interface Props {
  name: string;
}

export default function SuccessScreen({ name }: Props) {
  const firstName = name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Animated check circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.45 }}
        className="w-20 h-20 bg-[#C2956C]/12 rounded-full flex items-center justify-center mb-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
          className="text-[#C2956C] text-4xl font-serif"
        >
          &#10003;
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-lg"
      >
        <h1 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight mb-5">
          You&rsquo;re all set, {firstName}.
        </h1>

        <p className="font-sans text-stone-500 text-xl leading-relaxed mb-4">
          We&rsquo;ve got everything we need &mdash; we&rsquo;ll be in touch within 24 hours to
          get things moving.
        </p>

        <p className="font-sans text-stone-400 text-base leading-relaxed">
          Keep an eye on your inbox. We can&rsquo;t wait to build something great with you.
        </p>
      </motion.div>

      {/* Subtle background decoration */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C2956C]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C2956C]/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
