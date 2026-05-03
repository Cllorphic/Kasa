'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PropertyGallery({ pictures, title }) {
  const [mainImage, setMainImage] = useState(0);

  if (!pictures || pictures.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Image principale */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
        <Image
          src={pictures[mainImage]}
          alt={`${title} - photo ${mainImage + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>

      {/* Miniatures */}
      {pictures.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {pictures.map((pic, index) => (
            <button
              key={index}
              onClick={() => setMainImage(index)}
              className={`relative rounded-lg overflow-hidden aspect-[4/3] cursor-pointer border-2 transition ${
                index === mainImage ? 'border-[#B5533E]' : 'border-transparent'
              }`}
            >
              <Image
                src={pic}
                alt={`${title} - miniature ${index + 1}`}
                fill
                className="object-cover"
                sizes="15vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}