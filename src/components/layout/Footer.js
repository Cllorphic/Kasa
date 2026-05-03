import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 mt-auto bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Image src="/images/logo-small.svg" alt="Kasa" width={30} height={30} />
        <p className="text-sm text-gray-500">© 2025 Kasa. All rights reserved</p>
      </div>
    </footer>
  );
}