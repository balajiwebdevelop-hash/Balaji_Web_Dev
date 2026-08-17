'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Shield, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-atelier shadow-xs py-3.5'
            : 'bg-canvas/80 backdrop-blur-xs border-b border-atelier/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Studio Brand */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-widest text-espresso font-normal group-hover:text-bronze transition-colors">
              BALAJI ARCHITECT & INTERIORS
            </span>
            <span className="text-[9px] uppercase tracking-widest-plus text-warmgray font-medium -mt-0.5">
              Architecture • Interiors • Materials
            </span>
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
        <div className="md:hidden fixed inset-0 z-50 bg-surface/98 backdrop-blur-lg flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-atelier">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-xl tracking-widest text-espresso">BALAJI ATELIER</span>
              <span className="text-[8px] uppercase tracking-widest text-warmgray">Architecture & Materials</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-espresso hover:text-bronze"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-espresso hover:text-bronze transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-warmgray font-sans tracking-widest">→</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-espresso hover:text-bronze transition-colors flex items-center justify-between"
            >
              <span>CONTACT</span>
              <span className="text-xs text-warmgray font-sans tracking-widest">→</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-xl text-warmgray hover:text-espresso transition-colors flex items-center gap-2 pt-4 border-t border-atelier"
            >
              <Shield className="w-4 h-4" />
              <span>Studio Admin Portal</span>
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-atelier text-xs text-warmgray space-y-1.5">
            <p className="font-medium text-espresso">Door No. 306, DN TOWER, Floor 03, Beltola Tiniali</p>
            <p>Guwahati, Assam 781040</p>
            <p>Tel: +91 70029 48484</p>
            <p>Email: atelier@balaji-interior.com</p>
          </div>
        </div>
      )}
    </>
  );
}
