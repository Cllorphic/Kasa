const BASE_URL = 'http://localhost:3000';

export default async function sitemap() {
  let properties = [];
  try {
    const res = await fetch('http://localhost:3001/api/properties');
    properties = await res.json();
  } catch (err) {
    console.error('Erreur sitemap:', err);
  }

  const propertyPages = properties.map((property) => ({
    url: `${BASE_URL}/logements/${property.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/favoris`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...propertyPages,
  ];
}