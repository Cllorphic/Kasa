'use client';

import { useState, useEffect, use } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { getProperties } from '@/services/property.service';
import PropertyCard from '@/components/cards/PropertyCard';

export default function FavorisPage() {
  const { favorites } = useFavorites();
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setAllProperties);
  }, []);

  const properties = allProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col items-center gap-8 py-6 sm:py-12">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#B5533E] mb-3">
          Vos favoris
        </h1>
        <p className="text-sm text-gray-500">
          Retrouvez ici tous les logements que vous avez aimés.
          <br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>
      </div>

      {properties.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 mt-8">
          Vous n&apos;avez pas encore de favoris.
        </p>
      )}
    </div>
  );
}