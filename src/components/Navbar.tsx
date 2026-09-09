'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

import { SiteSettings } from '@/types';

export function Navbar({ initialSettings }: { initialSettings?: SiteSettings | null }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Pages with dark hero or espresso header banner start in dark mode
  const isInitialDarkPage =
    pathname === '/' ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/materials');

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(isInitialDarkPage);

  const isDarkThemeRef = useRef<boolean>(isInitialDarkPage);
  const isScrolledRef = useRef<boolean>(false);

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

  // Dynamic Scroll Theme Detector:
  // Full-Spectrum Detection across ALL Images, Photos, Media, and Dark Sections on the Website.
  // When over ANY photograph, image, video, 3D card, or dark background:
  //   -> Navbar switches to Crisp Alabaster/White font and icons with high-clarity drop shadows.
  // When over Light/Ivory Canvas (without images):
  //   -> Navbar switches to Deep Espresso/Black font and icons.
  const detectThemeUnderNavbar = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const scrollY = window.scrollY;
    const isOverScrolled = scrollY > 20;
    if (isScrolledRef.current !== isOverScrolled) {
      isScrolledRef.current = isOverScrolled;
      setIsScrolled(isOverScrolled);
    }

    const headerEl = document.getElementById('main-navbar-header');
    let navbarTop = 0;
    let navbarBottom = 68;

    if (headerEl) {
      const hRect = headerEl.getBoundingClientRect();
      navbarTop = Math.max(0, hRect.top);
      navbarBottom = Math.max(navbarTop + 42, hRect.bottom);
    }

    const probeY = navbarTop + (navbarBottom - navbarTop) / 2;
    let isOverDark = false;

    // 1. Homepage Hero Check (3D Typography Canvas & Hero Photography)
    if (pathname === '/') {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.top < navbarBottom && rect.bottom > navbarTop) {
          isOverDark = true;
        }
      } else if (scrollY < window.innerHeight * 0.85) {
        isOverDark = true;
      }
    }

    // 2. Explicit Dark Sections, Footers & Header Banners
    if (!isOverDark) {
      try {
        const darkSections = document.querySelectorAll<HTMLElement>(
          '[data-navbar-theme="dark"], [data-theme="dark"], section.bg-espresso, footer, .bg-espresso, .bg-black'
        );
        for (let i = 0; i < darkSections.length; i++) {
          const el = darkSections[i];
          if (el.closest('#main-navbar-header') || el.closest('#navbar-container')) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top < navbarBottom && rect.bottom > navbarTop) {
            isOverDark = true;
            break;
          }
        }
      } catch (e) {
        // Safe fallback
      }
    }

    // 3. Viewport Intersection of ALL Visible Images & Media Across the Website
    // (Studio intro photo, 3D portfolio cards, category images, product photos, etc.)
    if (!isOverDark) {
      try {
        const visualMedia = document.querySelectorAll<HTMLElement>(
          'img, picture, video, canvas, [data-portfolio-card], [data-image], .image-reveal, [style*="background-image"]'
        );

        for (let i = 0; i < visualMedia.length; i++) {
          const el = visualMedia[i];
          if (el.closest('#main-navbar-header') || el.closest('#navbar-container')) continue;
          if (el.offsetParent === null) continue; // Fast check for display:none without forced layout reflow

          const rect = el.getBoundingClientRect();

          // Must physically intersect the navbar's vertical band and be on-screen horizontally
          if (rect.bottom <= navbarTop || rect.top >= navbarBottom) continue;
          if (rect.right <= 0 || rect.left >= window.innerWidth) continue;

          // Filter out tiny icons or tracking pixels
          if (rect.width < 45 || rect.height < 45) continue;

          // Active photograph or visual card is physically underneath the navbar
          isOverDark = true;
          break;
        }
      } catch (e) {
        // Safe fallback
      }
    }

    // 4. Multi-Point Point-In-Polygon Probes (elementsFromPoint across width)
    if (!isOverDark && typeof document.elementsFromPoint === 'function') {
      try {
        const probePointsX = [
          window.innerWidth * 0.12,
          window.innerWidth * 0.32,
          window.innerWidth * 0.50,
          window.innerWidth * 0.68,
          window.innerWidth * 0.88,
        ];

        for (let p = 0; p < probePointsX.length; p++) {
          const elements = document.elementsFromPoint(probePointsX[p], probeY);
          for (let e = 0; e < elements.length; e++) {
            const el = elements[e] as HTMLElement;
            if (!el || el.closest('#main-navbar-header') || el.closest('#navbar-container')) continue;

            const tag = el.tagName.toUpperCase();
            if (tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS' || tag === 'PICTURE') {
              const rect = el.getBoundingClientRect();
              if (rect.width >= 40 && rect.height >= 40) {
                isOverDark = true;
                break;
              }
            }

            if (el.hasAttribute('data-image') || el.hasAttribute('data-portfolio-card')) {
              isOverDark = true;
              break;
            }

            const cStyle = window.getComputedStyle(el);
            if (cStyle.backgroundImage && cStyle.backgroundImage !== 'none') {
              isOverDark = true;
              break;
            }

            // Check computed background color luminance
            const bg = cStyle.backgroundColor;
            if (bg && bg !== 'transparent') {
              const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
              if (match) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);
                const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
                if (a > 0.4) {
                  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                  if (lum < 0.45) {
                    isOverDark = true;
                    break;
                  }
                }
              }
            }
          }
          if (isOverDark) break;
        }
      } catch (e) {
        // Safe fallback
      }
    }

    // Only trigger React state update if the theme actually changed
    if (isDarkThemeRef.current !== isOverDark) {
      isDarkThemeRef.current = isOverDark;
      setIsDarkTheme(isOverDark);
    }
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          detectThemeUnderNavbar();
          ticking = false;
        });
      }
    };

    detectThemeUnderNavbar();

    // Re-check after short intervals to ensure lazy loaded images are detected
    const t1 = setTimeout(detectThemeUnderNavbar, 100);
    const t2 = setTimeout(detectThemeUnderNavbar, 400);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [detectThemeUnderNavbar]);

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

  // Pages with dark hero or espresso header banner start at top: 0
  const isHeroPage =
    pathname === '/' ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/materials');

  return (
    <>
      {/* 100% Transparent Fixed Glass Navigation Bar — Zero White Background */}
      <div
        id="navbar-container"
        data-navbar="true"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
      >
        <div className="pointer-events-auto">
          {/* Optional Top Announcement Bar */}
          {announcement?.enabled && announcement?.text && (
            <div
              className={`bg-espresso text-surface/90 text-[11px] py-1.5 px-4 text-center tracking-wider border-b border-espresso-light flex items-center justify-center gap-2 font-light transition-all duration-300 ${
                isScrolled ? 'hidden' : 'block'
              }`}
            >
              <span>{announcement.text}</span>
              {announcement.linkUrl && (
                <Link
                  href={announcement.linkUrl}
                  className="underline hover:text-champagne font-medium transition-colors ml-1"
                >
                  Explore &rarr;
                </Link>
              )}
            </div>
          )}

          {/* 100% Transparent Header with Dynamic Dual-Tone Chiaroscuro Theme */}
          <header
            id="main-navbar-header"
            className={`w-full transition-all duration-300 ${
              isScrolled
                ? isDarkTheme
                  ? 'bg-black/35 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] py-3 sm:py-3.5'
                  : 'bg-transparent backdrop-blur-md border-b border-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] py-3 sm:py-3.5'
                : 'bg-transparent border-b border-transparent py-4 sm:py-5'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              {/* Studio Brand Wordmark (Logo Icon Removed as Requested) */}
              <Link href="/" className="flex flex-col group py-0.5">
                <span
                  className={`font-serif text-base sm:text-lg md:text-xl tracking-widest font-normal leading-tight transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white group-hover:text-champagne drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso group-hover:text-bronze drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]'
                  }`}
                >
                  {brandInfo.name}
                </span>
                <span
                  className={`text-[8px] sm:text-[9px] uppercase tracking-widest-plus font-medium mt-0.5 transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                      : 'text-warmgray drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]'
                  }`}
                >
                  {brandInfo.subtitle}
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
                      className={`text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                        isActive
                          ? isDarkTheme
                            ? 'text-champagne border-b border-champagne pb-0.5 font-semibold drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                            : 'text-bronze border-b border-bronze pb-0.5 font-semibold'
                          : isDarkTheme
                          ? 'text-white/90 hover:text-champagne drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                          : 'text-espresso/80 hover:text-bronze'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Action Icons (Reacting to Opposite Visible Theme) */}
              <div className="flex items-center space-x-3.5 sm:space-x-5">
                {/* Search Button */}
                <Link
                  href="/search"
                  aria-label="Search catalog"
                  className={`p-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-black/5'
                  }`}
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </Link>

                {/* Wishlist Button */}
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className={`relative p-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-black/5'
                  }`}
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                        isDarkTheme
                          ? 'bg-champagne text-espresso'
                          : 'bg-bronze text-white'
                      }`}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Shopping Bag Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Shopping Bag"
                  className={`relative p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isDarkTheme
                      ? 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-black/5'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                  {itemCount > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                        isDarkTheme
                          ? 'bg-white text-espresso'
                          : 'bg-espresso text-white'
                      }`}
                    >
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* Accounts / Studio Button */}
                <Link
                  href="/studio"
                  aria-label="Client Account"
                  className={`p-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-black/5'
                  }`}
                  title="Client Account"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className={`md:hidden p-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme
                      ? 'text-white hover:text-champagne hover:bg-white/15 drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]'
                      : 'text-espresso hover:text-bronze hover:bg-black/5'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Spacer for non-hero pages so content starts below fixed navbar */}
      {!isHeroPage && (
        <div
          className={`w-full pointer-events-none select-none transition-all duration-300 ${
            announcement?.enabled && announcement?.text ? 'h-24 sm:h-28' : 'h-16 sm:h-20'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#FCFAF6] flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-atelier">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-base tracking-widest text-espresso font-medium">{brandInfo.name}</span>
              <span className="text-[8px] uppercase tracking-widest text-warmgray mt-0.5">{brandInfo.subtitle}</span>
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

            <div className="pt-4 space-y-3 border-t border-atelier/50">
              <Link
                href="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-espresso hover:text-bronze transition-colors flex items-center gap-2 font-medium"
              >
                <User className="w-4 h-4 text-bronze" />
                <span>Client Account & Studio</span>
              </Link>
            </div>
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
