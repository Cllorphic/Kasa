import Link from 'next/link';
import Image from 'next/image';
import { getPropertyById } from '@/services/property.service';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyEquipments from '@/components/property/PropertyEquipments';
import HostCard from '@/components/property/HostCard';

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Retour */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#333] border border-gray-200 rounded-full px-4 py-2 w-fit hover:border-[#B5533E] transition"
      >
        <Image src="/images/Back.svg" alt="" width={16} height={16} />
        Retour aux annonces
      </Link>

      {/* Galerie + Hôte */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Galerie */}
        <div className="flex-1">
          <PropertyGallery
            pictures={property.pictures || [property.cover]}
            title={property.title}
          />
        </div>

        {/* Hôte */}
        <div className="w-full lg:w-80 shrink-0">
          <HostCard
            host={property.host}
            propertyId={property.id}
            ratingAvg={property.rating_avg}
          />
        </div>
      </div>

      {/* Détails */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#333] mb-2">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
            <Image src="/images/Localisation.svg" alt="" width={14} height={14} />
            {property.location}
          </div>

          <p className="text-sm text-[#333] leading-relaxed mb-6">
            {property.description}
          </p>

          {/* Équipements */}
          <PropertyEquipments equipments={property.equipments} />

          {/* Tags / Catégories */}
          {property.tags && property.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-[#333] mb-3">Catégorie</h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-[#333] border border-gray-200 rounded-full px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Espace vide à droite pour aligner avec le layout du haut */}
        <div className="hidden lg:block w-80 shrink-0" />
      </div>
    </div>
  );
}