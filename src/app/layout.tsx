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
  title: 'Balaji Architect & Interiors — Luxury Architecture, Interior Design & Materials',
  description:
    'Crafted spaces and considered materials for timeless living. Balaji Architect & Interiors unites high-end residential architecture, turnkey interior design, and a curated marketplace of natural stones, hardwood veneers, and acoustic surfaces.',
  keywords: [
    'Balaji Architect & Interiors',
    'Luxury Interior Design Guwahati',
    'Architectural Materials India',
    'Vein-Cut Travertine',
    'Smoked Oak Flooring',
    'Acoustic Walnut Wall Panels',
    'Turnkey Luxury Architecture',
  ],
  authors: [{ name: 'Balaji Architect & Interiors' }],
  openGraph: {
    title: 'Balaji Architect & Interiors — Architecture & Considered Materials',
    description: 'Crafted spaces and considered materials for timeless living.',
    url: 'https://balaji-atelier.com',
    siteName: 'Balaji Architect & Interiors',
    locale: 'en_IN',
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
