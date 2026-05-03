'use client';

import { createContext, useContext, useState, useSyncExternalStore, useCallback } from 'react';

const AuthContext = createContext();

function getStoredAuth() {
  if (typeof window === 'undefined') return { user: null, token: null };
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  if (savedToken && savedUser) {
    return { user: JSON.parse(savedUser), token: savedToken };
  }
  return { user: null, token: null };
}

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

export function AuthProvider({ children }) {
  const storeToken = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [auth, setAuth] = useState(() => getStoredAuth());

  // Sync si le localStorage change depuis un autre onglet
  if (storeToken && !auth.token) {
    setAuth(getStoredAuth());
  } else if (!storeToken && auth.token) {
    setAuth({ user: null, token: null });
  }

  const login = useCallback((userData, jwtToken) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth({ user: userData, token: jwtToken });
  }, []);

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

export function useAuth() {
  return useContext(AuthContext);
}