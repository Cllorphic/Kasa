import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export const metadata = {
  title: 'Kasa',
  description: "Location d'appartements entre particuliers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}