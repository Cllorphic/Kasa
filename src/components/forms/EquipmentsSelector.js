'use client';

/** Liste prédéfinie des équipements disponibles */
const EQUIPMENTS = [
  'Micro-Ondes', 'Clic-clac', 'Douche italienne', 'Four',
  'Frigo', 'Rangements', 'WIFI', 'Lit', 'Parking', 'Bouilloire',
  'Sèche Cheveux', 'SDB', 'Machine à laver', 'Toilettes sèches',
  'Cuisine équipée', 'Cintres', 'Télévision', 'Baie vitrée',
  'Chambre Séparée', 'Hotte', 'Climatisation', 'Baignoire',
  'Frigo Américain', 'Vue Parc',
];

/**
 * Sélecteur d'équipements avec checkboxes.
 * Utilise une liste prédéfinie d'équipements disponibles.
 * @param {Object} props
 * @param {string[]} props.selected - Liste des équipements sélectionnés.
 * @param {Function} props.onToggle - Callback pour ajouter/retirer un équipement.
 */
export default function EquipmentsSelector({ selected, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-sm font-bold text-[#333] mb-4">Équipements</h2>
      {/* Grille de checkboxes sur 2 colonnes */}
      <div className="grid grid-cols-2 gap-3">
        {EQUIPMENTS.map((equip) => (
          <label key={equip} className="flex items-center gap-2 text-sm text-[#333] cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(equip)}
              onChange={() => onToggle(equip)}
              className="accent-[#B5533E]"
            />
            {equip}
          </label>
        ))}
      </div>
    </div>
  );
}