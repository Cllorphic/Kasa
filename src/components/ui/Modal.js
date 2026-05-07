'use client';

/**
 * Modale de confirmation avec boutons annuler/confirmer.
 * S'affiche en overlay sur toute la page.
 * @param {Object} props
 * @param {boolean} props.isOpen - Si la modale est visible.
 * @param {Function} props.onClose - Callback pour fermer la modale.
 * @param {Function} props.onConfirm - Callback pour confirmer l'action.
 * @param {string} props.title - Le titre de la modale.
 * @param {string} props.message - Le message de confirmation.
 */
export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    // Overlay sombre qui couvre toute la page
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm w-full mx-4 shadow-lg">
        <h2 className="text-lg font-bold text-[#333] mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-sm text-[#333] py-2.5 rounded-full hover:bg-gray-50 transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white text-sm py-2.5 rounded-full hover:opacity-90 transition cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}