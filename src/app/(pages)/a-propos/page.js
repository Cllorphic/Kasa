import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-8 sm:gap-12 py-6 sm:py-12">
      {/* Titre */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#B5533E] mb-4">
          À propos
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mt-2">
          Depuis notre création, nous mettons en relation des voyageurs en quête
          d&apos;authenticité avec des hôtes passionnés qui aiment partager leur
          région et leurs bonnes adresses.
        </p>
      </div>

      {/* Image principale */}
      <div className="w-full rounded-xl overflow-hidden">
        <Image
          src="/images/About1.png"
          alt="Maison en bois chaleureuse"
          width={1200}
          height={400}
          className="w-full h-48 sm:h-64 md:h-96 object-cover"
          priority
        />
      </div>

      {/* Mission + Image */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-[#B5533E] mb-4">
            Notre mission est simple :
          </h2>
          <ol className="text-sm text-[#333] space-y-3 mb-6">
            <li>1. Offrir une plateforme fiable et simple d&apos;utilisation</li>
            <li>2. Proposer des hébergements variés et de qualité</li>
            <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
          </ol>
          <p className="text-sm text-[#B5533E] leading-relaxed">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne
            pour que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>

        <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
          <Image
            src="/images/About2.png"
            alt="Chalet avec vue"
            width={494}
            height={458}
            className="w-full h-64 sm:h-80 md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}