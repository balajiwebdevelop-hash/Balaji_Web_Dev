import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { PageTransition } from '@/components/PageTransition';
import { getSiteSettings } from '@/lib/db';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const revalidate = 60;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFAF6' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1614' },
  ],
};

export const metadata: Metadata = {
  title: 'Balaji Architect & Interiors — Luxury Architecture, Interior Design & Materials',
  description:
    'Crafted spaces and considered materials for timeless living. Balaji Architect & Interiors unites high-end residential architecture, turnkey interior design, and a curated marketplace of natural stones, hardwood veneers, and acoustic surfaces.',
  applicationName: 'Balaji Architect & Interiors',
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-167x167.png', sizes: '167x167', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Balaji Atelier',
    startupImage: [
      {
        url: '/logo.png',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Balaji Architect & Interiors — Architecture & Considered Materials',
    description: 'Crafted spaces and considered materials for timeless living.',
    url: 'https://balaji-atelier.com',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Balaji Architect & Interiors',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jakarta.variable}`}>
      <head>
        {/* iOS Specific Home Screen App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Balaji Atelier" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-canvas text-charcoal flex flex-col min-h-screen">
        <AdminAuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar initialSettings={settings} />
              <main className="flex-1 pb-16 md:pb-0">
                <PageTransition>{children}</PageTransition>
              </main>
              <CartDrawer />
              <MobileBottomNav />
              <Footer initialSettings={settings} />
            </WishlistProvider>
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
