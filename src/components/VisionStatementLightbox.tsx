import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { VISION_STATEMENT_IMAGE } from '../content/about';

export default function VisionStatementLightbox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const preload = new Image();
    preload.src = VISION_STATEMENT_IMAGE;
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vision-statement-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col animate-mobile-modal-in">
        <div className="mb-3 flex items-center justify-between gap-3 text-white">
          <h2 id="vision-statement-title" className="text-sm font-medium tracking-tight sm:text-base">
            Fezer Vision Statement
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            aria-label="Close vision statement"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-auto rounded-sm bg-[#f4f1ea] shadow-2xl">
          <img
            src={VISION_STATEMENT_IMAGE}
            alt="Fezer Vision Statement, dated August 26, 2026"
            width={1103}
            height={1426}
            draggable={false}
            className="block h-auto w-full select-none"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
