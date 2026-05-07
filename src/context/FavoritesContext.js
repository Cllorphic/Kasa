'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext();

/**
 * Récupère les favoris depuis localStorage.
 * @returns {Array<string>} Liste des ids des propriétés favorites.
 */
function getInitialFavorites() {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Provider des favoris. Gère l'ajout/retrait de propriétés favorites.
 * @param {{children: React.ReactNode}} props
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getInitialFavorites);

  /**
   * Ajoute ou retire une propriété des favoris.
   * @param {string} propertyId - L'id de la propriété.
   */
  const toggleFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  /**
   * Vérifie si une propriété est dans les favoris.
   * @param {string} propertyId - L'id de la propriété.
   * @returns {boolean} True si la propriété est favorite.
   */
  const isFavorite = useCallback((propertyId) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook pour accéder au contexte des favoris.
 * @returns {{favorites: Array<string>, toggleFavorite: Function, isFavorite: Function}}
 */
export function useFavorites() {
  return useContext(FavoritesContext);
}