'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="w-full px-4 pt-4">
      <nav className="max-w-3xl mx-auto bg-white rounded-xl shadow-[0_4px_4px_rgba(182,182,182,0.05)] px-6 md:px-12 py-2 flex items-center justify-between relative">
        
        {/* Gauche */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <Link href="/" className="text-sm text-[#333] hover:text-[#B5533E] transition whitespace-nowrap">
            Accueil
          </Link>
          <Link href="/a-propos" className="text-sm text-[#333] hover:text-[#B5533E] transition whitespace-nowrap">
            À propos
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.svg" alt="Kasa" width={130} height={36} priority />
        </Link>

        {/* Droite */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {!isReady ? null : user ? (
            <>
              <Link
                href="/ajouter-propriete"
                className="text-sm text-[#B5533E] hover:opacity-80 transition whitespace-nowrap"
              >
                +Ajouter un logement
              </Link>
              <Link href="/favoris" aria-label="Favoris">
                <Image src="/images/Favoris.svg" alt="" width={20} height={20} />
              </Link>
              <Link href="/messages" aria-label="Messages">
                <Image src="/images/Message.svg" alt="" width={20} height={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-[#333] hover:text-[#B5533E] transition cursor-pointer whitespace-nowrap"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-[#B5533E] hover:opacity-80 transition whitespace-nowrap"
            >
              Se connecter
            </Link>
          )}
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <Image
            src={menuOpen ? '/images/Close.svg' : '/images/Menu.svg'}
            alt=""
            width={24}
            height={24}
          />
        </button>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 md:hidden z-50">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm text-[#333]">
              Accueil
            </Link>
            <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="text-sm text-[#333]">
              À propos
            </Link>
            {!isReady ? null : user ? (
              <>
                <Link href="/ajouter-propriete" onClick={() => setMenuOpen(false)} className="text-sm text-[#B5533E]">
                  +Ajouter un logement
                </Link>
                <div className="flex gap-4">
                  <Link href="/favoris" onClick={() => setMenuOpen(false)} aria-label="Favoris">
                    <Image src="/images/Favoris.svg" alt="" width={20} height={20} />
                  </Link>
                  <Link href="/messages" onClick={() => setMenuOpen(false)} aria-label="Messages">
                    <Image src="/images/Message.svg" alt="" width={20} height={20} />
                  </Link>
                </div>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-sm text-[#333] text-left cursor-pointer"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#B5533E]">
                Se connecter
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}