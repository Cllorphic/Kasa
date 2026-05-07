'use client';

import { createContext, useContext, useState, useSyncExternalStore, useCallback } from 'react';

const AuthContext = createContext();

/**
 * Récupère les données d'authentification depuis localStorage.
 * @returns {{user: Object|null, token: string|null}} Les données d'auth.
 */
function getStoredAuth() {
  if (typeof window === 'undefined') return { user: null, token: null };
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  if (savedToken && savedUser) {
    return { user: JSON.parse(savedUser), token: savedToken };
  }
  return { user: null, token: null };
}

/** @param {Function} callback */
function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return localStorage.getItem('token');
}

function getServerSnapshot() {
  return null;
}

/**
 * Provider d'authentification. Gère l'état de connexion de l'utilisateur.
 * @param {{children: React.ReactNode}} props
 */
export function AuthProvider({ children }) {
  const storeToken = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [auth, setAuth] = useState(() => getStoredAuth());

  if (storeToken && !auth.token) {
    setAuth(getStoredAuth());
  } else if (!storeToken && auth.token) {
    setAuth({ user: null, token: null });
  }

  /**
   * Connecte l'utilisateur et stocke ses données.
   * @param {Object} userData - Les infos utilisateur.
   * @param {string} jwtToken - Le token JWT.
   */
  const login = useCallback((userData, jwtToken) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth({ user: userData, token: jwtToken });
  }, []);

  /** Déconnecte l'utilisateur et supprime ses données. */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ user: null, token: null });
  }, []);

  const isReady = storeToken !== undefined;

  return (
    <AuthContext.Provider value={{ user: auth.user, token: auth.token, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook pour accéder au contexte d'authentification.
 * @returns {{user: Object|null, token: string|null, isReady: boolean, login: Function, logout: Function}}
 */
export function useAuth() {
  return useContext(AuthContext);
}