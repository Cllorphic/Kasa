'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';

const PLACEHOLDER = '/images/HomeImage.svg';

export default function PropertyCard({ property }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const favorited = isFavorite(property.id);
  const cover = property.cover || PLACEHOLDER;

  return (
    <Link href={`/logements/${property.id}`} className="group">
      <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
        <Image
          src={cover}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {user && (
          <button
            className="absolute top-3 right-3 z-10"
            aria-label="Favoris"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={favorited ? '#B5533E' : 'none'}
              stroke={favorited ? '#B5533E' : '#FFFFFF'}
              strokeWidth="2"
              className="drop-shadow-md transition-colors duration-200"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold text-[#333]">{property.title}</h3>
        <p className="text-xs text-gray-400">{property.location}</p>
        <p className="text-sm font-bold text-[#333] mt-1">
          {property.price_per_night}€ <span className="font-normal text-gray-400">par nuit</span>
        </p>
      </div>
    </Link>
  );
}