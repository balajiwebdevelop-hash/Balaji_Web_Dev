'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  // Do not render public footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-espresso text-surface border-t border-espresso-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-atelier-dark">
          {/* Studio Identity */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-widest text-surface font-light">
              BALAJI ARCHITECT & INTERIORS
            </h3>
            <p className="text-xs uppercase tracking-widest text-champagne font-medium">
              Architecture • Interior Design • Materials
            </p>
            <p className="text-sm text-surface/70 font-light leading-relaxed max-w-sm pt-2">
              Crafted spaces, bespoke architectural commissions, and considered materials for timeless living. We bridge the disciplines of luxury architecture, master interior craftsmanship, and global material curation.
            </p>
            <div className="pt-4 flex items-center space-x-6 text-xs uppercase tracking-widest text-surface/60">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Architectural Practice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">PRACTICE</h4>
            <ul className="space-y-2.5 text-xs text-surface/70 font-light">
              <li>
                <Link href="/projects" className="hover:text-surface transition-colors">
                  Selected Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-surface transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-surface transition-colors">
                  Studio & Founders
                </Link>
              </li>
              <li>
                <Link href="/services#turnkey" className="hover:text-surface transition-colors">
                  Turnkey Execution
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-surface transition-colors">
                  Project Estimation
                </Link>
              </li>
            </ul>
          </div>

          {/* Materials & Shop */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">MATERIALS MARKET</h4>
            <ul className="space-y-2.5 text-xs text-surface/70 font-light">
              <li>
                <Link href="/category/natural-stone-marble" className="hover:text-surface transition-colors">
                  Natural Stone & Travertine
                </Link>
              </li>
              <li>
                <Link href="/category/hardwood-veneers" className="hover:text-surface transition-colors">
                  Hardwood & Architectural Veneers
                </Link>
              </li>
              <li>
                <Link href="/category/wall-panels-acoustic" className="hover:text-surface transition-colors">
                  Acoustic Fluted Panels
                </Link>
              </li>
              <li>
                <Link href="/category/porcelain-slabs" className="hover:text-surface transition-colors">
                  Large Format Porcelain Slabs
                </Link>
              </li>
              <li>
                <Link href="/category/architectural-lighting" className="hover:text-surface transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/category/bespoke-hardware" className="hover:text-surface transition-colors">
                  Bespoke Patinated Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-widest text-champagne font-medium">STUDIO & PRACTICE</h4>
              <div className="flex items-center gap-1.5 text-[11px] text-champagne">
                <span>★ 5.0</span>
                <span className="text-surface/60">(22 Google Reviews)</span>
                <span className="text-surface/40">•</span>
                <span className="text-surface/60">Interior Architect Office</span>
              </div>
            </div>
            <div className="text-xs text-surface/70 font-light space-y-1.5 leading-relaxed">
              <p className="text-surface font-medium">Door No. 306, DN TOWER, Floor No. 03</p>
              <p>Beltola Tiniali</p>
              <p>Guwahati, Assam 781040</p>
            </div>
            <div className="text-xs text-surface/70 font-light space-y-1 pt-1">
              <p>Inquiries: <span className="text-surface">atelier@balaji-interior.com</span></p>
              <p>Direct: <a href="tel:+917002948484" className="text-surface hover:text-champagne transition-colors">+91 70029 48484</a></p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-champagne hover:text-surface transition-colors"
              >
                Schedule Studio Consultation <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/40 font-light gap-4">
          <p>© {new Date().getFullYear()} Balaji Architect & Interiors. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-surface/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-surface/70 transition-colors">
              Terms of Supply
            </Link>
            <Link href="/admin/login" className="hover:text-surface/70 transition-colors text-surface/30">
              Studio Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
