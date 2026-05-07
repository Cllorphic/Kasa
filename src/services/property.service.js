import { fetchAPI } from '@/lib/api';

/**
 * Récupère la liste de toutes les propriétés.
 * @returns {Promise<Array<Object>>} Liste des propriétés.
 */
export async function getProperties() {
  return fetchAPI('/properties');
}

/**
 * Récupère une propriété par son identifiant.
 * @param {string} id - L'identifiant de la propriété.
 * @returns {Promise<Object>} Les détails de la propriété.
 * @throws {Error} Si la propriété n'existe pas (404).
 */
export async function getPropertyById(id) {
  return fetchAPI(`/properties/${id}`);
}