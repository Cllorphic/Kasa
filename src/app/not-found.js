import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <h1 className="text-7xl sm:text-8xl font-bold text-[#B5533E] mb-4">404</h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        Il semble que la page que vous cherchez ait pris
        <br />
        des vacances... ou n&apos;ait jamais existé.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href="/" className="w-full bg-[#B5533E] text-white text-sm text-center py-3 rounded-full hover:opacity-90 transition">
          Accueil
        </Link>
        <Link href="/" className="w-full bg-[#B5533E] text-white text-sm text-center py-3 rounded-full hover:opacity-90 transition">
          Logements
        </Link>
      </div>
    </div>
  );
}