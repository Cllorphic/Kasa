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
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-100 p-8 md:p-16">
        <h1 className="text-2xl md:text-3xl font-bold text-[#B5533E] text-center mb-3">
          Heureux de vous revoir
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Connectez-vous pour retrouver vos réservations, vos annonces
          et tout ce qui rend vos séjours uniques.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm mx-auto">
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Adresse email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#B5533E] text-white py-3 rounded-full font-medium hover:opacity-90 transition cursor-pointer"
          >
            Se connecter
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-6">
          <Link href="#" className="text-sm text-[#B5533E]">
            Mot de passe oublié
          </Link>
          <p className="text-sm text-[#B5533E]">
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