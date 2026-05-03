'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext();

function getInitialFavorites() {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getInitialFavorites);

  const toggleFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((propertyId) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}