export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/messages', '/ajouter-propriete'],
    },
    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}