'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Shield, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

import { SiteSettings } from '@/types';

export function Navbar({ initialSettings }: { initialSettings?: SiteSettings | null }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [announcement, setAnnouncement] = useState<{ enabled: boolean; text: string; linkUrl?: string } | null>(
    initialSettings?.announcementBanner !== undefined
      ? initialSettings.announcementBanner
      : {
          enabled: true,
          text: 'Complimentary Material Advisory Sessions Available for Q3/Q4 Architectural Commissions',
          linkUrl: '/quote',
        }
  );
  const [brandInfo, setBrandInfo] = useState<{ name: string; subtitle: string; logoUrl: string }>({
    name: initialSettings?.brandName || 'BALAJI ARCHITECT & INTERIORS',
    subtitle: initialSettings?.brandSubtitle || 'ARCHITECTURE • INTERIORS • MATERIALS',
    logoUrl: initialSettings?.logoUrl || '/logo.png',
  });

  useEffect(() => {
    if (initialSettings) {
      setBrandInfo({
        name: initialSettings.brandName || 'BALAJI ARCHITECT & INTERIORS',
        subtitle: initialSettings.brandSubtitle || 'ARCHITECTURE • INTERIORS • MATERIALS',
        logoUrl: initialSettings.logoUrl || '/logo.png',
      });
      if (initialSettings.announcementBanner !== undefined) {
        setAnnouncement(initialSettings.announcementBanner);
      }
    }
  }, [initialSettings]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Silent background sync for live updates
    fetch('/api/admin/settings', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          if (data.settings.announcementBanner !== undefined) {
            setAnnouncement(data.settings.announcementBanner);
          }
          setBrandInfo({
            name: data.settings.brandName || 'BALAJI ARCHITECT & INTERIORS',
            subtitle: data.settings.brandSubtitle || 'ARCHITECTURE • INTERIORS • MATERIALS',
            logoUrl: data.settings.logoUrl || '/logo.png',
          });
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'PROJECTS', href: '/projects' },
    { label: 'SERVICES', href: '/services' },
    { label: 'MATERIALS', href: '/materials' },
    { label: 'SHOP', href: '/shop' },
    { label: 'ABOUT', href: '/about' },
    { label: 'QUOTE', href: '/quote' },
  ];

  return (
    <>
      {announcement?.enabled && announcement?.text && (
        <div className="bg-espresso text-surface/90 text-[11px] py-1.5 px-4 text-center tracking-wider border-b border-espresso-light flex items-center justify-center gap-2 font-light">
          <span>{announcement.text}</span>
          {announcement.linkUrl && (
            <Link href={announcement.linkUrl} className="underline hover:text-champagne font-medium transition-colors ml-1">
              Explore &rarr;
            </Link>
          )}
        </div>
      )}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-atelier shadow-xs py-3.5'
            : 'bg-canvas/80 backdrop-blur-xs border-b border-atelier/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Studio Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-espresso shadow-xs flex-shrink-0 border border-champagne/40">
              <img
                src={brandInfo.logoUrl || '/logo.png'}
                alt={brandInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg md:text-xl tracking-widest text-espresso font-normal group-hover:text-bronze transition-colors leading-tight">
                {brandInfo.name}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest-plus text-warmgray font-medium mt-0.5">
                {brandInfo.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                    isActive ? 'text-bronze border-b border-bronze pb-0.5' : 'text-espresso/80 hover:text-bronze'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <Link
              href="/search"
              aria-label="Search catalog"
              className="text-espresso/80 hover:text-bronze transition-colors p-1"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-espresso/80 hover:text-bronze transition-colors p-1"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bronze text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative text-espresso/80 hover:text-bronze transition-colors p-1 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-espresso text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/admin"
              aria-label="Studio Admin"
              className="hidden sm:flex text-espresso/60 hover:text-espresso transition-colors p-1 items-center gap-1 text-[11px] uppercase tracking-wider"
              title="Studio Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">Studio</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden text-espresso hover:text-bronze p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#FCFAF6] flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-atelier">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-espresso shadow-xs flex-shrink-0 border border-champagne/40">
                <img
                  src={brandInfo.logoUrl || '/logo.png'}
                  alt={brandInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-widest text-espresso font-medium">{brandInfo.name}</span>
                <span className="text-[8px] uppercase tracking-widest text-warmgray mt-0.5">{brandInfo.subtitle}</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-espresso hover:text-bronze transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-espresso hover:text-bronze transition-colors flex items-center justify-between py-2.5 border-b border-atelier"
              >
                <span className="tracking-wide">{link.label}</span>
                <span className="text-sm text-bronze font-sans">→</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-espresso hover:text-bronze transition-colors flex items-center justify-between py-2.5 border-b border-atelier"
            >
              <span className="tracking-wide">CONTACT & STUDIO</span>
              <span className="text-sm text-bronze font-sans">→</span>
            </Link>

            {/* Quick Action Contact Row on Mobile Drawer */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href="https://wa.me/917002948484?text=Hello%20Balaji%20Architect%20%26%20Interiors%2C%20I%20would%20like%20to%20consult%20on%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-green-700 hover:bg-green-800 text-white rounded text-center text-xs uppercase tracking-wider font-medium shadow-sm transition-colors"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+917002948484"
                className="p-3.5 bg-espresso hover:bg-timber text-surface rounded text-center text-xs uppercase tracking-wider font-medium shadow-sm transition-colors"
              >
                Call Studio
              </a>
            </div>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors flex items-center gap-2 pt-4"
            >
              <Shield className="w-4 h-4 text-bronze" />
              <span>Studio Admin Portal</span>
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-atelier text-xs text-warmgray space-y-1.5">
            <p className="font-medium text-espresso">Door No. 306, DN TOWER, Floor 03, Beltola Tiniali</p>
            <p>Guwahati, Assam 781040</p>
            <p className="text-bronze font-medium">★ 5.0 Rating • 22 Google Reviews</p>
            <p>Direct: +91 70029 48484</p>
          </div>
        </div>
      )}
    </>
  );
}
