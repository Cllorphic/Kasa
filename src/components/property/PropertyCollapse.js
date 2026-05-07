'use client';

import { useState } from 'react';

/**
 * Section repliable avec animation. Affiche/masque le contenu au clic.
 * Utilise CSS grid pour une animation fluide de la hauteur.
 * @param {Object} props
 * @param {string} props.title - Le titre de la section.
 * @param {React.ReactNode} props.children - Le contenu à afficher/masquer.
 */
export default function PropertyCollapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Bouton toggle avec flèche rotative */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-sm font-bold text-[#333] cursor-pointer"
        aria-expanded={isOpen}
      >
        {title}
        {/* Flèche qui tourne à 180° quand ouvert */}
        <span
          className={`text-[#B5533E] text-lg transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
      {/* Contenu animé via grid-rows pour une transition fluide */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}