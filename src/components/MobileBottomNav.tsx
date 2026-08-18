'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Package,
  ShoppingBag,
  Phone,
  MessageCircle,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const [quickContactOpen, setQuickContactOpen] = useState(false);

  // Hide mobile bottom nav on admin pages to maximize admin workspace
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Projects', href: '/projects', icon: Building2 },
    { label: 'Materials', href: '/materials', icon: Package },
    { label: 'Services', href: '/services', icon: Sparkles },
    { label: 'Quote', href: '/quote', icon: FileText },
  ];

  return (
    <>
      {/* Quick Contact Modal Drawer for Mobile */}
      {quickContactOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-espresso/70 backdrop-blur-xs flex items-end animate-fade-in">
          <div className="w-full bg-surface border-t border-atelier p-6 space-y-5 rounded-t-2xl shadow-2xl animate-slide-up pb-8">
            <div className="flex items-center justify-between pb-3 border-b border-atelier">
              <div>
                <h3 className="font-serif text-lg text-espresso font-medium">Connect with Studio</h3>
                <p className="text-[11px] text-warmgray">Direct architectural & interior consultation</p>
              </div>
              <button
                onClick={() => setQuickContactOpen(false)}
                className="p-1.5 rounded-full bg-canvas text-warmgray hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/917002948484?text=Hello%20Balaji%20Architect%20%26%20Interiors%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 p-3.5 bg-green-700 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+917002948484"
                className="flex items-center justify-center gap-2.5 p-3.5 bg-espresso text-surface rounded-lg text-xs font-medium uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-warmgray">
                Guwahati Office • Mon-Sat 9:30 AM - 7:30 PM • 5.0 ★ Rated
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom App Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-atelier px-2 py-1.5 shadow-2xl safe-area-bottom">
        <nav className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                  isActive ? 'text-bronze' : 'text-warmgray hover:text-espresso'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.5]'}`} />
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Cart Trigger with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 relative text-warmgray hover:text-espresso"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-espresso text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Bag</span>
          </button>

          {/* Direct WhatsApp Call Launcher */}
          <button
            onClick={() => setQuickContactOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 text-green-700 hover:text-green-800"
          >
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5 text-green-800">Chat</span>
          </button>
        </nav>
      </div>
    </>
  );
}
