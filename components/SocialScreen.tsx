'use client';

import { useRef } from 'react';
import { Question } from '@/lib/questions';
import { SocialLinks } from './OnboardingForm';

interface Props {
  question: Question;
  value: SocialLinks;
  onChange: (social: SocialLinks) => void;
  onNext: () => void;
  onBack: () => void;
  questionNumber: number;
  totalQuestions: number;
}

const fields: {
  key: keyof SocialLinks;
  label: string;
  icon: string;
  placeholder: string;
}[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'f',
    placeholder: 'https://facebook.com/yourbusiness',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: '&#9676;',
    placeholder: 'https://instagram.com/yourbusiness',
  },
  {
    key: 'googleBusiness',
    label: 'Google Business',
    icon: 'G',
    placeholder: 'https://g.page/yourbusiness',
  },
];

export default function SocialScreen({
  question,
  value,
  onChange,
  onNext,
  onBack,
  questionNumber,
  totalQuestions,
}: Props) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
      else onNext();
    }
  };

  const hasAny = value.facebook || value.instagram || value.googleBusiness;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="font-sans text-xs text-stone-300 mb-10 tabular-nums">
          {questionNumber}
          <span className="opacity-50"> / {totalQuestions}</span>
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 leading-snug mb-3">
          {question.label}
        </h2>
        <p className="font-sans text-stone-400 text-base mb-8 leading-relaxed">
          {question.hint}
        </p>

        <span className="inline-block font-sans text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1 mb-10">
          Optional
        </span>

        <div className="space-y-7">
          {fields.map((field, i) => (
            <div key={field.key} className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center
                           font-sans font-bold text-sm text-stone-500 flex-shrink-0 mt-1"
                dangerouslySetInnerHTML={{ __html: field.icon }}
              />
              <div className="flex-1">
                <label className="font-sans text-xs text-stone-400 uppercase tracking-wider block mb-1.5">
                  {field.label}
                </label>
                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="url"
                  value={value[field.key]}
                  onChange={(e) =>
                    onChange({ ...value, [field.key]: e.target.value })
                  }
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-b-2 border-stone-200
                             focus:border-[#C2956C] outline-none text-lg font-sans
                             text-stone-800 p-0 pb-1 placeholder:text-stone-300
                             transition-colors duration-200"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-12">
          <button
            onClick={onBack}
            className="font-sans text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            &larr; Back
          </button>
          <button
            onClick={onNext}
            className="font-sans font-medium bg-[#C2956C] hover:bg-[#A87852] text-white
                       px-8 py-3 rounded-full transition-colors duration-200"
          >
            {hasAny ? 'Next' : 'Skip'}
          </button>
        </div>

        <p className="font-sans text-xs text-stone-300 mt-4">
          Press{' '}
          <kbd className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-stone-400 text-xs font-sans">
            Enter
          </kbd>{' '}
          to move between fields
        </p>
      </div>
    </div>
  );
}
