import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Balaji Atelier — Luxury Interior Architecture & Curated Materials',
  description:
    'Crafted spaces and considered materials for timeless living. Balaji Atelier unites high-end residential architecture, turnkey interior design, and a curated marketplace of natural stones, hardwood veneers, and acoustic surfaces.',
  keywords: [
    'Luxury Interior Design Mumbai',
    'Architectural Materials India',
    'Vein-Cut Travertine',
    'Smoked Oak Flooring',
    'Acoustic Walnut Wall Panels',
    'Turnkey Luxury Architecture',
    'Balaji Atelier',
  ],
  authors: [{ name: 'Balaji Atelier' }],
  openGraph: {
    title: 'Balaji Atelier — Architecture & Considered Materials',
    description: 'Crafted spaces and considered materials for timeless living.',
    url: 'https://balaji-atelier.com',
    siteName: 'Balaji Atelier',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-canvas text-charcoal flex flex-col min-h-screen">
        <AdminAuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <CartDrawer />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
