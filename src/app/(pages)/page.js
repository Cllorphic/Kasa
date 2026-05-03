import Image from 'next/image';
import { getProperties } from '@/services/property.service';
import PropertyCard from '@/components/cards/PropertyCard';

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col gap-8 sm:gap-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#B5533E] mb-2">
          Chez vous, partout et ailleurs
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
        <div className="w-full rounded-xl overflow-hidden">
          <Image
            src="/images/HomeImage.svg"
            alt="Paysage Kasa"
            width={1200}
            height={400}
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
            priority
          />
        </div>
      </section>

      {/* Grille des propriétés */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="text-center py-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#333] mb-2">
          Comment ça marche ?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
          Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#B5533E] text-white rounded-xl p-6">
            <h3 className="font-bold text-sm sm:text-base mb-2">Recherchez</h3>
            <p className="text-xs">
              Entrez votre destination, vos dates et laissez Kasa faire le reste.
            </p>
          </div>
          <div className="bg-[#B5533E] text-white rounded-xl p-6">
            <h3 className="font-bold text-sm sm:text-base mb-2">Réservez</h3>
            <p className="text-xs">
              Profitez d&apos;une plateforme sécurisée et de profils d&apos;hôtes vérifiés.
            </p>
          </div>
          <div className="bg-[#B5533E] text-white rounded-xl p-6">
            <h3 className="font-bold text-sm sm:text-base mb-2">Vivez l&apos;expérience</h3>
            <p className="text-xs">
              Installez-vous, profitez de votre séjour et sentez-vous chez vous, partout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}