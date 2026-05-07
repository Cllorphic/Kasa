/**
 * Affiche la liste des équipements sous forme de badges.
 * Ne rend rien si la liste est vide.
 * @param {Object} props
 * @param {string[]} props.equipments - Liste des noms d'équipements.
 */
export default function PropertyEquipments({ equipments }) {
  // Ne rend rien si aucun équipement
  if (!equipments || equipments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {/* Chaque équipement est affiché dans un badge arrondi */}
      {equipments.map((equip, index) => (
        <span
          key={index}
          className="text-xs text-[#333] border border-gray-200 rounded-full px-4 py-1.5"
        >
          {equip}
        </span>
      ))}
    </div>
  );
}