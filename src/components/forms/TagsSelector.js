'use client';

import { useState } from 'react';

const CATEGORIES = [
  'Parc', 'Night Life', 'Culture', 'Nature', 'Touristique',
  'Vue sur mer', 'Pour les couples', 'Famille', 'Forêt',
];

export default function TagsSelector({ selected, onToggle }) {
  const [customTag, setCustomTag] = useState('');

  const addCustomTag = () => {
    if (customTag.trim() && !selected.includes(customTag.trim())) {
      onToggle(customTag.trim());
      setCustomTag('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-sm font-bold text-[#333] mb-4">Catégories</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((tag) => (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`text-xs px-4 py-1.5 rounded-full border transition cursor-pointer ${
              selected.includes(tag)
                ? 'bg-[#B5533E] text-white border-[#B5533E]'
                : 'text-[#333] border-gray-200 hover:border-[#B5533E]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <label htmlFor="customTag" className="text-sm font-bold text-[#333] mb-2 block">Ajouter une catégorie personnalisée</label>
      <div className="flex items-center gap-3">
        <input
          id="customTag"
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="Nouveau tag"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#B5533E] transition"
          onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
        />
        <button
          onClick={addCustomTag}
          className="w-10 h-10 bg-[#B5533E] text-white rounded-full flex items-center justify-center cursor-pointer text-xl hover:opacity-90 transition"
          aria-label="Ajouter un tag"
        >
          +
        </button>
      </div>
      <p className="text-xs text-[#B5533E] mt-2 cursor-pointer" onClick={addCustomTag}>+Ajouter un tag</p>
    </div>
  );
}