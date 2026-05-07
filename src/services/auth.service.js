/**
 * Connecte un utilisateur avec ses identifiants.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe.
 * @returns {Promise<{user: Object, token: string}>} Les données utilisateur et le token JWT.
 * @throws {Error} Si les identifiants sont invalides.
 */
export async function login(email, password) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Identifiants invalides');
  }
  return res.json();
}

/**
 * Inscrit un nouvel utilisateur.
 * @param {Object} data - Les données d'inscription.
 * @param {string} data.email - L'email.
 * @param {string} data.password - Le mot de passe.
 * @param {string} data.name - Le nom complet.
 * @param {string} [data.role='client'] - Le rôle (client ou owner).
 * @returns {Promise<Object>} Les données de l'utilisateur créé.
 * @throws {Error} Si l'inscription échoue.
 */
export async function register(data) {
  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role || 'client',
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur lors de l'inscription");
  }
  return res.json();
}