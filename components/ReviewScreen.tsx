'use client';

import { questions, Question } from '@/lib/questions';
import { FormData, UploadedFile, SocialLinks } from './OnboardingForm';

interface Props {
  formData: FormData;
  onSubmit: () => void;
  onEdit: (index: number) => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string | null;
}

const SECTION_GROUPS = [
  { name: 'Contact Information', sectionNumber: 1 },
  { name: 'Business Details', sectionNumber: 2 },
  { name: 'Design Preferences', sectionNumber: 3 },
  { name: 'Logo', sectionNumber: 4 },
  { name: 'Brand Assets', sectionNumber: 5 },
  { name: 'Photos & Images', sectionNumber: 6 },
  { name: 'Final Notes', sectionNumber: 7 },
];

function FileTags({ files }: { files: UploadedFile[] }) {
  if (!files.length)
    return <p className="font-sans text-stone-300 italic text-sm">No files uploaded</p>;
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {files.map((f, i) => (
        <span
          key={i}
          className="font-sans text-xs bg-stone-100 text-stone-600 rounded-full px-3 py-1"
        >
          {f.name}
        </span>
      ))}
    </div>
  );
}

function SocialDisplay({ social }: { social: SocialLinks | undefined }) {
  if (!social) return <p className="font-sans text-stone-300 italic text-sm">Not provided</p>;
  const links = [
    { label: 'Facebook', url: social.facebook },
    { label: 'Instagram', url: social.instagram },
    { label: 'Google Business', url: social.googleBusiness },
  ].filter((l) => l.url);

  if (!links.length)
    return <p className="font-sans text-stone-300 italic text-sm">Not provided</p>;

  return (
    <div className="space-y-0.5 mt-1">
      {links.map((l) => (
        <p key={l.label} className="font-sans text-sm text-stone-700">
          <span className="text-stone-400">{l.label}: </span>
          {l.url}
        </p>
      ))}
    </div>
  );
}

function AnswerValue({ question, formData }: { question: Question; formData: FormData }) {
  const value = formData[question.id];

  if (question.type === 'file')
    return <FileTags files={(value as UploadedFile[]) ?? []} />;

  if (question.type === 'social')
    return <SocialDisplay social={value as SocialLinks | undefined} />;

  const str = (value as string) ?? '';
  if (!str.trim())
    return <p className="font-sans text-stone-300 italic text-sm">Not provided</p>;

  return (
    <p className="font-sans text-stone-800 text-base whitespace-pre-wrap leading-relaxed">
      {str}
    </p>
  );
}

export default function ReviewScreen({
  formData,
  onSubmit,
  onEdit,
  onBack,
  isSubmitting,
  error,
}: Props) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-xl mx-auto">
        <p className="font-sans text-xs text-stone-400 uppercase tracking-widest mb-3">
          Almost there
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight mb-3">
          Review your answers
        </h1>
        <p className="font-sans text-stone-400 text-base mb-14 leading-relaxed">
          Take a look and make sure everything looks right before we send it over.
        </p>

        {SECTION_GROUPS.map((section) => {
          const sectionQs = questions.filter(
            (q) => q.sectionNumber === section.sectionNumber
          );
          const firstIndex = questions.findIndex(
            (q) => q.sectionNumber === section.sectionNumber
          );

          return (
            <div key={section.name} className="mb-10">
              {/* Section header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-sans font-semibold text-xs uppercase tracking-widest text-stone-500">
                  {section.name}
                </h2>
                <button
                  onClick={() => onEdit(firstIndex)}
                  className="font-sans text-xs text-[#C2956C] hover:text-[#A87852] transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden divide-y divide-stone-100">
                {sectionQs.map((q) => (
                  <div key={q.id} className="px-5 py-4">
                    <p className="font-sans text-xs text-stone-400 mb-1 leading-none">
                      {q.label}
                    </p>
                    <AnswerValue question={q} formData={formData} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {error && (
          <p className="font-sans text-red-400 text-sm mb-4">{error}</p>
        )}

        <div className="flex items-center gap-5 mt-8 pb-16">
          <button
            onClick={onBack}
            className="font-sans text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            &larr; Back
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="font-sans font-medium bg-[#C2956C] hover:bg-[#A87852] disabled:opacity-50
                       text-white px-10 py-4 rounded-full transition-colors duration-200 text-base"
          >
            {isSubmitting ? 'Sending…' : 'Submit \u2192'}
          </button>
        </div>
      </div>
    </div>
  );
}
