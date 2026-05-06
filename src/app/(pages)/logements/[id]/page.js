import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyById } from '@/services/property.service';
import Carousel from '@/components/carousel/Carousel';
import PropertyEquipments from '@/components/property/PropertyEquipments';
import PropertyCollapse from '@/components/property/PropertyCollapse';
import HostCard from '@/components/property/HostCard';
import DeleteButton from '@/components/property/DeleteButton';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const property = await getPropertyById(id);
    return {
      title: property.title,
      description: property.description,
    };
  } catch {
    return { title: 'Logement introuvable' };
  }
}

export default async function PropertyPage({ params }) {
  const { id } = await params;

  let property;
  try {
    property = await getPropertyById(id);
  } catch {
    notFound();
  }

  const images = property.pictures?.length > 0 ? property.pictures : [property.cover];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.title,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
    },
    image: property.cover || '',
    priceRange: `${property.price_per_night}€ par nuit`,
    aggregateRating: property.rating_avg > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: property.rating_avg,
      ratingCount: property.ratings_count || 1,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#333] border border-gray-200 rounded-full px-4 py-2 w-fit hover:border-[#B5533E] transition">
            <Image src="/images/Back.svg" alt="" width={16} height={16} />
            Retour aux annonces
          </Link>
          <DeleteButton propertyId={property.id} hostId={property.host?.id} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Carousel images={images} title={property.title} />
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <HostCard host={property.host} ratingAvg={property.rating_avg} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#333] mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
              <Image src="/images/Localisation.svg" alt="" width={14} height={14} />
              {property.location}
            </div>

            <PropertyCollapse title="Description">
              <p className="text-sm text-[#333] leading-relaxed">{property.description}</p>
            </PropertyCollapse>

            <PropertyCollapse title="Équipements">
              <PropertyEquipments equipments={property.equipments} />
            </PropertyCollapse>

            {property.tags?.length > 0 && (
              <PropertyCollapse title="Catégories">
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-[#333] border border-gray-200 rounded-full px-4 py-1.5">{tag}</span>
                  ))}
                </div>
              </PropertyCollapse>
            )}
          </div>
          <div className="hidden lg:block w-80 shrink-0" />
        </div>
      </div>
    </>
  );
}