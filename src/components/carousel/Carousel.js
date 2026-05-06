'use client';

import { useState } from 'react';
import Image from 'next/image';

const PLACEHOLDER = '/images/HomeImage.svg';

export default function Carousel({ images, title }) {
  const validImages = (images || []).filter((img) => img && typeof img === 'string' && img.length > 0);
  const displayImages = validImages.length > 0 ? validImages : [PLACEHOLDER];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null);
  const total = displayImages.length;

  const prev = () => {
    setDirection('left');
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  };

  const next = () => {
    setDirection('right');
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-[#B5533E]"
      role="region"
      aria-label="Galerie photos"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out" key={current}>
        <Image
          src={displayImages[current]}
          alt={`${title} - photo ${current + 1} sur ${total}`}
          fill
          className="object-cover animate-fadeIn"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={current === 0}
        />
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition"
            aria-label="Photo précédente"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition"
            aria-label="Photo suivante"
          >
            ›
          </button>
          <span className="absolute bottom-3 right-3 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
            {current + 1}/{total}
          </span>
        </>
      )}
    </div>
  );
}