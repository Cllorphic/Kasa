'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

/** Photo de profil par défaut */
const PLACEHOLDER_PROFILE = 'https://via.placeholder.com/100';

/**
 * Carte de l'hôte avec photo, nom, note et boutons de contact.
 * Crée une conversation dans localStorage au clic sur les boutons.
 * @param {Object} props
 * @param {Object} props.host - Les infos de l'hôte.
 * @param {string} props.host.name - Le nom de l'hôte.
 * @param {string} props.host.picture - L'URL de la photo de profil.
 * @param {number} props.ratingAvg - La note moyenne de l'hôte.
 */
export default function HostCard({ host, ratingAvg }) {
  const router = useRouter();
  // Fallback sur le placeholder si pas de photo
  const picture = host.picture && host.picture.length > 0 ? host.picture : PLACEHOLDER_PROFILE;

  /**
   * Crée une conversation avec l'hôte si elle n'existe pas,
   * puis redirige vers la page de messagerie.
   */
  const startConversation = () => {
    const saved = localStorage.getItem('conversations');
    const conversations = saved ? JSON.parse(saved) : [];

    // Vérifie si une conversation existe déjà avec cet hôte
    const existing = conversations.find((c) => c.hostId === host.id);
    if (!existing) {
      const newConv = {
        id: Date.now(),
        hostId: host.id,
        name: host.name,
        picture: picture,
        lastMessage: '',
        lastTime: '',
        unread: false,
        messages: [],
      };
      conversations.push(newConv);
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    router.push('/messages');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-[#333] mb-4">Votre hôte</h3>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <Image src={picture} alt={host.name} fill className="object-cover" sizes="56px" />
        </div>
        <span className="text-sm font-semibold text-[#333]">{host.name}</span>
        {ratingAvg > 0 && <span className="text-sm">⭐ {ratingAvg}</span>}
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={startConversation}
          className="w-full bg-[#B5533E] text-white text-sm text-center py-2.5 rounded-full hover:opacity-90 transition cursor-pointer"
        >
          Contacter l&apos;hôte
        </button>
        <button
          onClick={startConversation}
          className="w-full border border-[#B5533E] text-[#B5533E] text-sm text-center py-2.5 rounded-full hover:bg-[#B5533E] hover:text-white transition cursor-pointer"
        >
          Envoyer un message
        </button>
      </div>
    </div>
  );
}