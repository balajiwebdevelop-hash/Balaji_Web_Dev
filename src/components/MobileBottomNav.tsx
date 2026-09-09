'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Package,
  ShoppingBag,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-atelier/80 px-1.5 py-2 shadow-2xl safe-area-bottom">
      <nav className="grid grid-cols-6 items-center">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-0.5 px-1 transition-all duration-200 active:scale-92 ${
                isActive ? 'text-bronze' : 'text-warmgray/80 hover:text-espresso'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-[18px] h-[18px] transition-transform duration-200 ${isActive ? 'stroke-[2] scale-105' : 'stroke-[1.35]'}`} />
              </div>
              <span className={`text-[9.5px] tracking-tight mt-1 transition-colors ${isActive ? 'font-semibold text-bronze' : 'font-normal'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-bronze mt-0.5 transition-all" />
              )}
            </Link>
          );
        })}

        {/* Cart Trigger with badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-0.5 px-1 relative text-warmgray/80 hover:text-espresso transition-all duration-200 active:scale-92 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.35]" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-espresso text-surface text-[8.5px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[9.5px] tracking-tight mt-1 font-normal">Bag</span>
        </button>
      </nav>
    </div>
  );
}

export default MobileBottomNav;

