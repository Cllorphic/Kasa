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
      });
      router.push('/login');
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-100 p-8 md:p-16">
        <h1 className="text-2xl md:text-3xl font-bold text-[#B5533E] text-center mb-3">
          Rejoignez la communauté Kasa
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d&apos;autres voyageurs.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm mx-auto">
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#333]">
            <input
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
            className="mt-4 w-full bg-[#B5533E] text-white py-3 rounded-full font-medium hover:opacity-90 transition cursor-pointer"
          >
            S&apos;inscrire
          </button>
        </form>

        <p className="text-sm text-[#B5533E] text-center mt-6">
          Déjà membre ?{' '}
          <Link href="/login" className="font-semibold underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}