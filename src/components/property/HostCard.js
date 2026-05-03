import Image from 'next/image';
import Link from 'next/link';

export default function HostCard({ host, propertyId, ratingAvg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-[#333] mb-4">Votre hôte</h3>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <Image
            src={host.picture}
            alt={host.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <span className="text-sm font-semibold text-[#333]">{host.name}</span>
        {ratingAvg > 0 && (
          <span className="flex items-center gap-1 text-sm text-[#333]">
            ⭐ {ratingAvg}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href={`/messages`}
          className="w-full bg-[#B5533E] text-white text-sm text-center py-2.5 rounded-full hover:opacity-90 transition"
        >
          Contacter l&apos;hôte
        </Link>
        <Link
          href={`/messages`}
          className="w-full border border-[#B5533E] text-[#B5533E] text-sm text-center py-2.5 rounded-full hover:bg-[#B5533E] hover:text-white transition"
        >
          Envoyer un message
        </Link>
      </div>
    </div>
  );
}