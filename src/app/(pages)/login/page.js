'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { login as loginAPI } from '@/services/auth.service';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginAPI(email, password);
      login(data.user, data.token);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6 sm:py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-100 p-6 sm:p-10 md:p-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#B5533E] text-center mb-2 sm:mb-3">
          Heureux de vous revoir
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 sm:mb-10">
          Connectez-vous pour retrouver vos réservations, vos annonces
          et tout ce qui rend vos séjours uniques.
        </p>

        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full sm:max-w-sm sm:mx-auto">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <button
            type="submit"
            className="mt-2 sm:mt-4 w-full bg-[#B5533E] text-white py-2.5 sm:py-3 rounded-full text-sm font-medium hover:opacity-90 transition cursor-pointer"
          >
            Se connecter
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-4 sm:mt-6">
          <Link href="#" className="text-xs sm:text-sm text-[#B5533E]">
            Mot de passe oublié
          </Link>
          <p className="text-xs sm:text-sm text-[#B5533E]">
            Pas encore de compte ?{' '}
            <Link href="/register" className="font-semibold underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}