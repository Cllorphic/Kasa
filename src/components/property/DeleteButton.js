'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

export default function DeleteButton({ propertyId, hostId }) {
  const { token, user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  if (!token || !user) return null;
  const isOwner = user.id == hostId;
  const isAdmin = user.role === 'admin';
  if (!isOwner && !isAdmin) return null;

  const handleDelete = async () => {
    setError('');
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur lors de la suppression');
        setShowModal(false);
        return;
      }

      router.push('/');
    } catch (err) {
      setError('Erreur lors de la suppression');
      setShowModal(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 text-sm text-red-500 border border-red-200 rounded-full px-4 py-2 hover:bg-red-50 transition cursor-pointer"
      >
        <Image src="/images/Delete.svg" alt="" width={16} height={16} />
        Supprimer
      </button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Supprimer cette annonce ?"
        message="Cette action est irréversible. Toutes les informations liées à cette propriété seront définitivement supprimées."
      />
    </>
  );
}