const API_URL = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001') + '/api'
  : '/api';

/**
 * Effectue un appel à l'API backend.
 * @param {string} endpoint - Le chemin de l'endpoint (ex: '/properties').
 * @param {RequestInit} [options={}] - Options fetch (method, body, headers...).
 * @returns {Promise<any>} Les données JSON de la réponse.
 * @throws {Error} Si la réponse n'est pas OK.
 */
export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Erreur API : ${res.status}`);
  }

  return res.json();
}