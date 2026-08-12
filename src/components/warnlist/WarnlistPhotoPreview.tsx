"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

interface WarnlistPhotoPreviewProps {
  src: string;
  alt: string;
  /** Thumbnail size classes, e.g. w-20 h-20 */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function WarnlistPhotoPreview({
  src,
  alt,
  className = "w-20 h-20",
  sizes = "80px",
  priority = false,
}: WarnlistPhotoPreviewProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`relative ${className} rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30`}
        aria-label={`View larger photo of ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={sizes}
          priority={priority}
        />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <p id={titleId} className="sr-only">
              {alt}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-[101] h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative flex items-center justify-center max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-[min(960px,100vw-2rem)] max-h-[min(90vh,100%)] w-auto h-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
