'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from '@/lib/questions';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import FileUploadScreen from './FileUploadScreen';
import SocialScreen from './SocialScreen';
import ReviewScreen from './ReviewScreen';
import SuccessScreen from './SuccessScreen';
import ProgressBar from './ProgressBar';

export interface UploadedFile {
  name: string;
  url: string;
  publicId: string;
  size: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  googleBusiness: string;
}

export type FormData = Record<string, string | UploadedFile[] | SocialLinks>;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const transition = {
  type: 'tween' as const,
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.42,
};

const REVIEW_INDEX = questions.length;
const SUCCESS_INDEX = questions.length + 1;

export default function OnboardingForm() {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = welcome
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToQuestion = useCallback(
    (index: number) => {
      setDirection(index < currentIndex ? -1 : 1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const updateFormData = useCallback(
    (id: string, value: string | UploadedFile[] | SocialLinks) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setDirection(1);
      setCurrentIndex(SUCCESS_INDEX);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showProgress = currentIndex >= 0 && currentIndex < REVIEW_INDEX;
  const q = questions[currentIndex];

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] overflow-hidden">
      {showProgress && (
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          section={q?.section ?? ''}
        />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {/* Welcome */}
        {currentIndex === -1 && (
          <motion.div
            key="welcome"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <WelcomeScreen onStart={goNext} />
          </motion.div>
        )}

        {/* Questions */}
        {currentIndex >= 0 && currentIndex < REVIEW_INDEX && (
          <motion.div
            key={`q-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            {q.type === 'file' ? (
              <FileUploadScreen
                question={q}
                value={(formData[q.id] as UploadedFile[]) ?? []}
                onChange={(files) => updateFormData(q.id, files)}
                onNext={goNext}
                onBack={currentIndex > 0 ? goBack : undefined}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
              />
            ) : q.type === 'social' ? (
              <SocialScreen
                question={q}
                value={
                  (formData[q.id] as SocialLinks) ?? {
                    facebook: '',
                    instagram: '',
                    googleBusiness: '',
                  }
                }
                onChange={(social) => updateFormData(q.id, social)}
                onNext={goNext}
                onBack={goBack}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
              />
            ) : (
              <QuestionScreen
                question={q}
                value={(formData[q.id] as string) ?? ''}
                onChange={(val) => updateFormData(q.id, val)}
                onNext={goNext}
                onBack={currentIndex > 0 ? goBack : undefined}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
              />
            )}
          </motion.div>
        )}

        {/* Review */}
        {currentIndex === REVIEW_INDEX && (
          <motion.div
            key="review"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <ReviewScreen
              formData={formData}
              onSubmit={handleSubmit}
              onEdit={goToQuestion}
              onBack={goBack}
              isSubmitting={isSubmitting}
              error={submitError}
            />
          </motion.div>
        )}

        {/* Success */}
        {currentIndex === SUCCESS_INDEX && (
          <motion.div
            key="success"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <SuccessScreen name={(formData.fullName as string) ?? ''} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
