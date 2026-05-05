'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register as registerAPI } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    role: 'client',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerAPI({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6 sm:py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-100 p-6 sm:p-10 md:p-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#B5533E] text-center mb-2 sm:mb-3">
          Rejoignez la communauté Kasa
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 sm:mb-10">
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d&apos;autres voyageurs.
        </p>

        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full sm:max-w-sm sm:mx-auto">
          <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Nom
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label htmlFor="registerEmail" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Adresse email
            </label>
            <input
              id="registerEmail"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label htmlFor="registerPassword" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Mot de passe
            </label>
            <input
              id="registerPassword"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-xs sm:text-sm font-semibold text-[#333] mb-1 sm:mb-2">
              Type de compte
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#B5533E] transition"
            >
              <option value="client">Voyageur (client)</option>
              <option value="owner">Propriétaire (hôte)</option>
            </select>
          </div>

          <label htmlFor="terms" className="flex items-center gap-2 text-xs sm:text-sm text-[#333]">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="accent-[#B5533E]"
              required
            />
            J&apos;accepte les{' '}
            <Link href="#" className="underline">
              conditions générales d&apos;utilisation
            </Link>
          </label>

          <button
            type="submit"
            className="mt-2 sm:mt-4 w-full bg-[#B5533E] text-white py-2.5 sm:py-3 rounded-full text-sm font-medium hover:opacity-90 transition cursor-pointer"
          >
            S&apos;inscrire
          </button>
        </form>

        <p className="text-xs sm:text-sm text-[#B5533E] text-center mt-4 sm:mt-6">
          Déjà membre ?{' '}
          <Link href="/login" className="font-semibold underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}