'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/lib/questions';

interface Props {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  questionNumber: number;
  totalQuestions: number;
}

function validate(question: Question, value: string): string | null {
  if (question.required && !value.trim()) return 'This field is required.';
  if (question.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Please enter a valid email address.';
  if (
    question.type === 'url' &&
    value.trim() &&
    !/^https?:\/\/.+/.test(value.trim())
  )
    return 'Please start with https:// (e.g. https://yoursite.com)';
  return null;
}

export default function QuestionScreen({
  question,
  value,
  onChange,
  onNext,
  onBack,
  questionNumber,
  totalQuestions,
}: Props) {
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-focus on mount / question change
  useEffect(() => {
    setErrorMsg(null);
    const timer = setTimeout(() => {
      if (question.type === 'textarea') textareaRef.current?.focus();
      else inputRef.current?.focus();
    }, 120);
    return () => clearTimeout(timer);
  }, [question.id, question.type]);

  const handleNext = () => {
    const err = validate(question, value);
    if (err) {
      setErrorMsg(err);
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    setErrorMsg(null);
    onNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (question.type === 'textarea') return; // textarea: Enter = newline
      e.preventDefault();
      handleNext();
    }
  };

  const isEmpty = !value.trim();
  const isOptional = question.optional;

  const baseInput =
    'w-full bg-transparent outline-none p-0 transition-colors duration-200 placeholder:text-stone-300 font-sans';

  const borderColor = errorMsg
    ? 'border-red-400 text-red-800 placeholder:text-red-200'
    : 'border-stone-200 text-stone-800 focus:border-[#C2956C]';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        {/* Step counter */}
        <p className="font-sans text-xs text-stone-300 mb-10 tabular-nums">
          {questionNumber}
          <span className="opacity-50"> / {totalQuestions}</span>
        </p>

        {/* Question label */}
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 leading-snug mb-3">
          {question.label}
          {question.required && (
            <span className="text-[#C2956C] ml-1 text-2xl">*</span>
          )}
        </h2>

        {/* Hint */}
        <p className="font-sans text-stone-400 text-base mb-8 leading-relaxed">
          {question.hint}
        </p>

        {/* Optional badge */}
        {isOptional && (
          <span className="inline-block font-sans text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1 mb-6">
            Optional
          </span>
        )}

        {/* Input */}
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {question.type === 'textarea' ? (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              rows={2}
              className={`${baseInput} border-b-2 text-xl pb-1 resize-none leading-relaxed ${borderColor}`}
            />
          ) : (
            <input
              ref={inputRef}
              type={question.type}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              className={`${baseInput} border-b-2 text-2xl pb-1 ${borderColor}`}
            />
          )}
        </motion.div>

        {/* Error */}
        {errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-red-400 text-sm mt-2"
          >
            {errorMsg}
          </motion.p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-5 mt-10">
          {onBack && (
            <button
              onClick={onBack}
              className="font-sans text-sm text-stone-400 hover:text-stone-600 transition-colors"
            >
              &larr; Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="font-sans font-medium bg-[#C2956C] hover:bg-[#A87852] text-white
                       px-8 py-3 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            {isOptional && isEmpty ? 'Skip' : 'Next'}
            <span className="opacity-60 text-sm">&crarr;</span>
          </button>
        </div>

        {/* Keyboard hint — not shown on textarea */}
        {question.type !== 'textarea' && (
          <p className="font-sans text-xs text-stone-300 mt-4">
            Press{' '}
            <kbd className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-400 text-xs font-sans">
              Enter
            </kbd>{' '}
            to continue
          </p>
        )}
      </div>
    </div>
  );
}
