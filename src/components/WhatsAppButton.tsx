'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsAppFloatingSettings } from '@/types';

interface WhatsAppButtonProps {
  settings?: WhatsAppFloatingSettings;
  fallbackPhone?: string;
}

export function WhatsAppButton({ settings, fallbackPhone }: WhatsAppButtonProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Settings with robust fallbacks
  const enabled = settings?.enabled ?? true;
  const phoneNumber = settings?.phoneNumber || fallbackPhone || '+91 70029 48484';
  const defaultMessage =
    settings?.defaultMessage ||
    'Hello Balaji Architect & Interiors, I would like to inquire about architectural and interior design services for my project.';
  const tooltipText = settings?.tooltipText || 'Chat with Atelier Vikas Sir';
  const position = settings?.position || 'bottom-right';
  const showOnMobile = settings?.showOnMobile ?? true;
  const showOnDesktop = settings?.showOnDesktop ?? true;
  const displayDelayMs = settings?.displayDelayMs ?? 800;

  // Sanitize phone number to international WhatsApp format (digits only)
  const sanitizedWhatsAppUrl = useMemo(() => {
    let clean = (phoneNumber || '').replace(/[^0-9]/g, '');
    // If user provided a 10-digit Indian number without country code
    if (clean.length === 10 && ['6', '7', '8', '9'].includes(clean[0])) {
      clean = '91' + clean;
    }
    const encodedMessage = encodeURIComponent(defaultMessage);
    return `https://wa.me/${clean}?text=${encodedMessage}`;
  }, [phoneNumber, defaultMessage]);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, Math.max(100, displayDelayMs));

    return () => clearTimeout(timer);
  }, [enabled, displayDelayMs]);

  // Completely suppress on /admin pages to avoid obstructing admin interactions
  if (!enabled || pathname?.startsWith('/admin')) {
    return null;
  }

  // Device-level visibility classes
  const deviceVisibilityClass =
    showOnMobile && showOnDesktop
      ? 'flex'
      : showOnMobile
      ? 'flex sm:hidden'
      : showOnDesktop
      ? 'hidden sm:flex'
      : 'hidden';

  // Position classes (above mobile bottom bar if on phone)
  const positionClass =
    position === 'bottom-left'
      ? 'left-4 sm:left-6 bottom-20 md:bottom-8'
      : 'right-4 sm:right-6 bottom-20 md:bottom-8';

  return (
    <div
      className={`fixed z-40 items-center gap-3 transition-all duration-500 ease-out ${positionClass} ${deviceVisibilityClass} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip Callout */}
      {position === 'bottom-right' && (
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#100C0A]/95 text-[#FCFAF6] border border-champagne/30 text-xs tracking-wider rounded-full shadow-xl transition-all duration-300 pointer-events-none select-none backdrop-blur-md ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isHovered ? 'animate-ping' : ''}`} />
          <span className="text-champagne font-medium text-[11px]">{tooltipText}</span>
        </div>
      )}

      {/* Floating WhatsApp Action Trigger */}
      <a
        href={sanitizedWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Balaji Architect & Interiors on WhatsApp at ${phoneNumber}`}
        className="relative group p-3.5 sm:p-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-108 active:scale-95 flex items-center justify-center border border-champagne/40"
      >
        {/* Subtle Luxury Pulsing Glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-pulse-subtle pointer-events-none group-hover:opacity-100 opacity-60" />

        {/* WhatsApp Vector Icon */}
        <svg
          className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 fill-white transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.275-.101-.476-.15-.677.15-.201.301-.778.978-.953 1.178-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.897-.799-1.503-1.787-1.679-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.677-1.632-.928-2.234-.244-.587-.493-.507-.677-.516l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.51 1.079 2.911 1.23 3.112c.15.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.119.579-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.429-.076-.126-.276-.201-.577-.351zM12.05 21.785h-.008c-1.748 0-3.461-.47-4.965-1.359l-.356-.21-3.694.969.986-3.602-.23-.367a9.852 9.852 0 0 1-1.512-5.263c0-5.461 4.444-9.904 9.909-9.904 2.646 0 5.133 1.031 7.003 2.903a9.855 9.855 0 0 1 2.9 7.004c0 5.463-4.444 9.909-9.908 9.909zM12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.731.944 3.682 1.442 5.71 1.442h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.488 3.48 11.823 11.823 0 0 0 12.05 0z" />
        </svg>
      </a>

      {/* Tooltip for bottom-left position */}
      {position === 'bottom-left' && (
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#100C0A]/95 text-[#FCFAF6] border border-champagne/30 text-xs tracking-wider rounded-full shadow-xl transition-all duration-300 pointer-events-none select-none backdrop-blur-md ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isHovered ? 'animate-ping' : ''}`} />
          <span className="text-champagne font-medium text-[11px]">{tooltipText}</span>
        </div>
      )}
    </div>
  );
}

export default WhatsAppButton;
