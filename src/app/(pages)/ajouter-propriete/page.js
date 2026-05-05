'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/forms/ImageUpload';
import EquipmentsSelector from '@/components/forms/EquipmentsSelector';
import TagsSelector from '@/components/forms/TagsSelector';

export default function AddPropertyPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    postalCode: '',
    location: '',
    hostName: '',
    pricePerNight: '',
  });

  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [photoFiles, setPhotoFiles] = useState([]);
  const [photosPreview, setPhotosPreview] = useState([]);

  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEquipment = (equip) => {
    setSelectedEquipments((prev) =>
      prev.includes(equip) ? prev.filter((e) => e !== equip) : [...prev, equip]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotos = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFiles((prev) => [...prev, file]);
      setPhotosPreview((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  const handleProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file, purpose) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);

    const res = await fetch('/api/uploads/image', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) throw new Error("Erreur lors de l'upload d'image");
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async () => {
    setError('');

    if (!form.title || !form.description || !form.location) {
      setError('Veuillez remplir les champs obligatoires.');
      return;
    }

    setLoading(true);

    try {
      let coverUrl = '';
      if (coverFile) {
        coverUrl = await uploadImage(coverFile, 'property-cover');
      }

      const pictureUrls = [];
      for (const file of photoFiles) {
        const url = await uploadImage(file, 'property-picture');
        pictureUrls.push(url);
      }

      let profileUrl = '';
      if (profileFile) {
        profileUrl = await uploadImage(profileFile, 'user-picture');
      }

      const hostName = form.hostName || user.name;
      if (form.hostName || profileUrl) {
        const updateBody = {};
        if (form.hostName) updateBody.name = form.hostName;
        if (profileUrl) updateBody.picture = profileUrl;

        await fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateBody),
        });
      }

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          location: form.location,
          price_per_night: Number(form.pricePerNight) || 0,
          cover: coverUrl,
          pictures: pictureUrls,
          equipments: selectedEquipments,
          tags: selectedTags,
          host_id: user.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#333] border border-gray-200 rounded-full px-4 py-2 w-fit hover:border-[#B5533E] transition">
        <Image src="/images/Back.svg" alt="" width={16} height={16} />
        Retour
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-[#333]">Ajouter une propriété</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#B5533E] text-white text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Envoi en cours...' : 'Ajouter'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#333] mb-2">Titre de la propriété</label>
            <input id="title" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Ex : Appartement cosy au coeur de paris" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#333] mb-2">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Décrivez votre propriété en détail..." rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition resize-y" />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-semibold text-[#333] mb-2">Code postal</label>
            <input id="postalCode" type="text" name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-[#333] mb-2">Localisation</label>
            <input id="location" type="text" name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition" />
          </div>
          <div>
            <label htmlFor="pricePerNight" className="block text-sm font-semibold text-[#333] mb-2">Prix par nuit (€)</label>
            <input id="pricePerNight" type="number" name="pricePerNight" value={form.pricePerNight} onChange={handleChange} placeholder="Ex : 100" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition" />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">
          <ImageUpload label="Image de couverture" previews={coverPreview} onUpload={handleCover} />
          <ImageUpload label="Image du logement" previews={photosPreview} multiple onUpload={handlePhotos} />
          <div>
            <label htmlFor="hostName" className="block text-sm font-semibold text-[#333] mb-2">Nom de l&apos;hôte</label>
            <input id="hostName" type="text" name="hostName" value={form.hostName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#B5533E] transition" />
          </div>
          <ImageUpload label="Photo de profil" previews={profilePreview} onUpload={handleProfile} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquipmentsSelector selected={selectedEquipments} onToggle={toggleEquipment} />
        <TagsSelector selected={selectedTags} onToggle={toggleTag} />
      </div>
    </div>
  );
}