export default function PropertyEquipments({ equipments }) {
  if (!equipments || equipments.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-bold text-[#333] mb-3">Équipements</h3>
      <div className="flex flex-wrap gap-2">
        {equipments.map((equip, index) => (
          <span key={index} className="text-xs text-[#333] border border-gray-200 rounded-full px-4 py-1.5">{equip}</span>
        ))}
      </div>
    </div>
  );
}