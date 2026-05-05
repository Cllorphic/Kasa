'use client';

import Image from 'next/image';

export default function ImageUpload({ label, previews, onUpload, multiple = false }) {
  const previewList = Array.isArray(previews) ? previews : previews ? [previews] : [];

  return (
    <div>
      <label className="block text-sm font-semibold text-[#333] mb-2">{label}</label>
      <div className="flex items-center gap-3 flex-wrap">
        {previewList.map((src, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image src={src} alt={`${label} ${i + 1}`} fill className="object-cover" sizes="80px" />
          </div>
        ))}
        <label className="w-10 h-10 bg-[#B5533E] text-white rounded-full flex items-center justify-center cursor-pointer text-xl hover:opacity-90 transition">
          +
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      </div>
      {multiple && (
        <p className="text-xs text-[#B5533E] mt-2 cursor-pointer">+Ajouter une image</p>
      )}
    </div>
  );
}