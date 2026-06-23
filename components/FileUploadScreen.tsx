'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/lib/questions';
import { UploadedFile } from './OnboardingForm';

interface Props {
  question: Question;
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  onNext: () => void;
  onBack?: () => void;
  questionNumber: number;
  totalQuestions: number;
}

interface PendingFile {
  id: string;
  name: string;
  size: number;
  preview?: string;
  status: 'uploading' | 'done' | 'error';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(name: string): boolean {
  return /\.(jpe?g|png|gif|webp|svg|bmp)$/i.test(name);
}

export default function FileUploadScreen({
  question,
  value,
  onChange,
  onNext,
  onBack,
  questionNumber,
  totalQuestions,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadOne = async (file: File, folder: string): Promise<UploadedFile | null> => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return { name: file.name, url: data.url, publicId: data.publicId, size: file.size };
    } catch {
      return null;
    }
  };

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);

      const newPending: PendingFile[] = files.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        size: f.size,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
        status: 'uploading',
      }));

      setPending((prev) => [...prev, ...newPending]);

      const results = await Promise.all(
        files.map(async (file, i) => {
          const result = await uploadOne(file, question.id);
          setPending((prev) =>
            prev.map((p) =>
              p.id === newPending[i].id
                ? { ...p, status: result ? 'done' : 'error' }
                : p
            )
          );
          return result;
        })
      );

      const successful = results.filter(Boolean) as UploadedFile[];
      if (successful.length) onChange([...value, ...successful]);

      // Clean up done/error entries after brief delay
      setTimeout(() => {
        setPending((prev) => prev.filter((p) => !newPending.find((n) => n.id === p.id)));
      }, 1200);
    },
    [value, onChange, question.id]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const isUploading = pending.some((p) => p.status === 'uploading');

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

        <span className="inline-block font-sans text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1 mb-8">
          Optional
        </span>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
                      transition-all duration-200 select-none
                      ${isDragging
                        ? 'border-[#C2956C] bg-[#C2956C]/5 scale-[1.01]'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                      }`}
        >
          <div className="text-3xl mb-3 opacity-60">&#128206;</div>
          <p className="font-sans text-stone-500 text-base">
            Drag & drop files here, or{' '}
            <span className="text-[#C2956C]">browse</span>
          </p>
          <p className="font-sans text-stone-300 text-sm mt-1">
            {question.accept?.includes('image') && !question.accept?.includes('.pdf')
              ? 'PNG, JPG, SVG, GIF accepted'
              : 'Images, PDFs, AI, EPS, ZIP accepted'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple={question.multiple}
            accept={question.accept}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        {/* File list */}
        {(value.length > 0 || pending.length > 0) && (
          <div className="mt-5 space-y-2">
            {/* Pending (uploading/done/error) */}
            {pending.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 bg-white rounded-xl p-3 border border-stone-100"
              >
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                    &#128196;
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-stone-700 truncate">{file.name}</p>
                  <p className="font-sans text-xs text-stone-300">{formatBytes(file.size)}</p>
                </div>
                <div className="flex-shrink-0">
                  {file.status === 'uploading' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-stone-200 border-t-[#C2956C] rounded-full"
                    />
                  )}
                  {file.status === 'done' && (
                    <span className="text-green-500 text-lg">&#10003;</span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-red-400 text-sm font-sans">Failed</span>
                  )}
                </div>
              </div>
            ))}

            {/* Successfully uploaded */}
            {value.map((file, index) => (
              <div
                key={file.publicId}
                className="flex items-center gap-3 bg-white rounded-xl p-3 border border-stone-100"
              >
                {isImage(file.name) ? (
                  <img
                    src={file.url}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                    &#128196;
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-stone-700 truncate">{file.name}</p>
                  <p className="font-sans text-xs text-stone-300">{formatBytes(file.size)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-stone-300 hover:text-red-400 transition-colors text-xl leading-none flex-shrink-0"
                  aria-label="Remove file"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
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
            onClick={onNext}
            disabled={isUploading}
            className="font-sans font-medium bg-[#C2956C] hover:bg-[#A87852] disabled:opacity-50
                       text-white px-8 py-3 rounded-full transition-colors duration-200"
          >
            {isUploading ? 'Uploading…' : value.length === 0 ? 'Skip' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
