'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Building2,
  Compass,
  FileText,
  Users,
  Settings,
  UserCheck,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Radio,
  Search,
  Plus,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { urlBase64ToUint8Array, DEFAULT_VAPID_PUBLIC_KEY } from '@/lib/push-client';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNotifOpen, setMobileNotifOpen] = useState(false);
  const [mobileQuickOpen, setMobileQuickOpen] = useState(false);
  const [pushStatus, setPushStatus] = useState<string>('default');

  // Global Search Palette State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Notification Center State
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCounts, setNotifCounts] = useState<{
    pendingOrders: number;
    pendingQuotes: number;
    lowStock: number;
    recentActivity: number;
  }>({ pendingOrders: 0, pendingQuotes: 0, lowStock: 0, recentActivity: 0 });

  // Quick Action Dropdown State
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  const isOwner = admin?.role === 'owner' || admin?.role === 'super_admin';

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
        setQuickActionOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  // Execute global search with AbortController
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const abortController = new AbortController();
    const delayDebounce = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`, {
          signal: abortController.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.error('Search error:', e);
        }
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => {
      clearTimeout(delayDebounce);
      abortController.abort();
    };
  }, [searchQuery]);

  // Register Service Worker and initialize Push Notification state
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js')
      .then(async (reg) => {
        if ('Notification' in window) {
          setPushStatus(Notification.permission);
          if (Notification.permission === 'granted') {
            try {
              let sub = await reg.pushManager.getSubscription();
              if (!sub) {
                let vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
                if (!vapidKey) {
                  const keyRes = await fetch('/api/notifications/subscribe');
                  if (keyRes.ok) {
                    const keyData = await keyRes.json();
                    vapidKey = keyData.vapidPublicKey;
                  }
                }
                if (vapidKey) {
                  sub = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidKey) as any,
                  });
                }
              }
              if (sub) {
                await fetch('/api/notifications/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ subscription: sub }),
                });
              }
            } catch (subErr) {
              console.warn('Auto push subscription notice:', subErr);
            }
          }
        }
      })
      .catch((err) => {
        console.warn('Service Worker registration notice:', err);
      });
  }, [admin]);

  const handleRequestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator)) {
      alert('Push notifications are not supported in this browser environment.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setPushStatus(perm);
      if (perm === 'granted') {
        let reg = await navigator.serviceWorker.getRegistration();
        if (!reg) {
          reg = await navigator.serviceWorker.register('/sw.js');
        }
        let vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
          const keyRes = await fetch('/api/notifications/subscribe');
          if (keyRes.ok) {
            const keyData = await keyRes.json();
            vapidKey = keyData.vapidPublicKey;
          }
        }
        if (vapidKey) {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKey) as any,
          });
          if (sub) {
            await fetch('/api/notifications/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscription: sub }),
            });
            alert('Push notifications successfully enabled on this device.');
          }
        }
      } else {
        alert('Notification permission was not granted. Please allow notifications in your browser settings.');
      }
    } catch (e: any) {
      alert(`Error enabling notifications: ${e.message}`);
    }
  };

  // Load notification badge counts via lightweight summary endpoint
  useEffect(() => {
    async function loadNotificationMetrics() {
      try {
        const res = await fetch('/api/admin/summary');
        if (res.ok) {
          const d = await res.json();
          setNotifCounts({
            pendingOrders: d.pendingOrders ?? 0,
            pendingQuotes: d.pendingQuotes ?? 0,
            lowStock: d.lowStock ?? 0,
            recentActivity: d.recentActivity ?? 0,
          });
        }
      } catch (err) {
        console.warn('Notification counts load notice:', err);
      }
    }

    if (admin) {
      loadNotificationMetrics();
    }
  }, [admin, pathname]);

  // Route security checks
  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (!loading && !admin) {
      router.replace('/admin/login');
    }
  }, [admin, loading, pathname, router]);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (!loading && admin && !isOwner) {
      if (pathname.startsWith('/admin/settings') || pathname.startsWith('/admin/employees')) {
        router.replace('/admin');
      }
    }
  }, [admin, isOwner, loading, pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0B09] text-[#FCFAF6] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-champagne font-light tracking-wide">Authenticating Command Center...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  // Organized Navigation Groups
  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Command Center', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      group: 'COMMERCE & MATERIALS',
      items: [
        { label: 'Products & Materials', href: '/admin/products', icon: Package },
        { label: 'Categories', href: '/admin/categories', icon: FolderTree },
        { label: 'Inventory Control', href: '/admin/inventory', icon: Boxes },
        { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag, badge: notifCounts.pendingOrders > 0 ? String(notifCounts.pendingOrders) : undefined },
      ],
    },
    {
      group: 'CLIENTS & CRM',
      items: [
        { label: 'Quotes & Dossiers', href: '/admin/quotes', icon: FileText, badge: notifCounts.pendingQuotes > 0 ? String(notifCounts.pendingQuotes) : undefined },
        { label: 'Customer Directory', href: '/admin/customers', icon: Users },
      ],
    },
    {
      group: 'ARCHITECTURE PRACTICE',
      items: [
        { label: 'Selected Projects', href: '/admin/projects', icon: Building2 },
        { label: 'Design Services', href: '/admin/services', icon: Compass },
      ],
    },
    {
      group: 'SYSTEM & AUDIT',
      items: [
        { label: 'Audit Logs', href: '/admin/audit-logs', icon: Activity },
        ...(isOwner
          ? [
              { label: 'Employee Management', href: '/admin/employees', icon: UserCheck },
              { label: 'Studio Settings', href: '/admin/settings', icon: Settings },
            ]
          : []),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0B09] text-[#FCFAF6] flex flex-col md:flex-row antialiased selection:bg-champagne/30 selection:text-champagne">
      {/* ========================================================================= */}
      {/* 1. MOBILE TOP APP BAR (< md ONLY)                                         */}
      {/* ========================================================================= */}
      <div className="md:hidden bg-[#0A0706] text-[#FCFAF6] px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-[#241C16] shadow-md">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm overflow-hidden bg-[#16110E] shadow-xs flex-shrink-0 border border-champagne/40">
            <img src="/logo.png" alt="Balaji" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-wider text-[#FCFAF6] font-medium leading-none">BALAJI ATELIER</span>
            <span className="text-[8px] uppercase tracking-widest text-champagne font-mono mt-0.5">Admin Command</span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#A89F91] hover:text-champagne hover:bg-[#140F0C] rounded-xs transition-colors"
            aria-label="Global Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Quick Action (+) */}
          <button
            onClick={() => setMobileQuickOpen(true)}
            className="p-2 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] rounded-xs shadow-xs transition-all flex items-center justify-center"
            aria-label="Quick Action"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Mobile Notifications Bell */}
          <button
            onClick={() => setMobileNotifOpen(true)}
            className="relative p-2 text-[#A89F91] hover:text-champagne hover:bg-[#140F0C] rounded-xs transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifCounts.recentActivity > 0 && (
              <span className="absolute top-1 right-1 bg-champagne text-[#100C0A] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                {notifCounts.recentActivity}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP SIDEBAR (md:block ONLY - 100% UNTOUCHED PC NAVIGATION)          */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex w-64 bg-[#0A0706] text-[#FCFAF6] flex-shrink-0 flex-col border-r border-[#241C16] z-40 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#241C16] space-y-1.5 bg-[#0A0706]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#16110E] shadow-xs flex-shrink-0 border border-champagne/40 group-hover:border-champagne transition-colors">
              <img src="/logo.png" alt="Balaji Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-widest text-[#FCFAF6] block font-light leading-tight">
                BALAJI ATELIER
              </span>
              <span className="text-[8px] uppercase tracking-widest text-champagne font-medium mt-0.5">
                Executive Command Center
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[9px] text-emerald-400">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              <span>Realtime Pipeline Live</span>
            </div>
            <span className="text-[9px] text-[#7E7469] font-mono">v2.0 PRO</span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[#665A4F] px-3 block">
                {grp.group}
              </span>
              <div className="space-y-0.5 pt-1">
                {grp.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 text-xs tracking-wider rounded-xs transition-all font-medium ${
                        isActive
                          ? 'bg-champagne/15 text-champagne border-l-2 border-champagne shadow-[inset_0_0_12px_rgba(197,168,128,0.06)] font-semibold'
                          : 'text-[#B5ABA0] hover:text-[#FCFAF6] hover:bg-[#16110E]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-champagne' : 'text-[#8E8275]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 bg-champagne text-[#100C0A] text-[9px] font-bold rounded-2xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-3.5 border-t border-[#241C16] space-y-2.5 text-xs bg-[#0A0706]">
          <div className="flex items-center justify-between p-2 rounded-xs bg-[#140F0C] border border-[#241C16]">
            <div className="truncate">
              <span className="font-medium text-[#FCFAF6] block text-xs truncate">{admin.name}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-flex items-center px-1.5 py-0.2 text-[8px] uppercase tracking-wider font-semibold rounded-2xs ${
                    isOwner
                      ? 'bg-champagne/20 text-champagne border border-champagne/40'
                      : 'bg-white/10 text-white/80 border border-white/15'
                  }`}
                >
                  {isOwner ? 'Principal Architect' : 'Operations'}
                </span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-[#A89F91] hover:text-red-400 hover:bg-[#1E1713] rounded-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#7E7469] px-1">
            <Link href="/" target="_blank" className="hover:text-champagne transition-colors flex items-center gap-1">
              <span>View Public Studio</span> <ExternalLink className="w-2.5 h-2.5" />
            </Link>
            <span className="text-emerald-500 font-mono text-[9px]">● Secure</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE & DESKTOP HEADER                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0E0B09]">
        {/* Top Command Bar (Desktop & Tablet) */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-[#0A0706] border-b border-[#241C16] sticky top-0 z-30">
          {/* Global Search Bar */}
          <div className="flex-1 max-w-md">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs text-xs text-[#8E8275] transition-all group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#8E8275] group-hover:text-champagne transition-colors" />
                <span className="text-[#A89F91]">Search orders, materials, clients, quotes...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-[#7E7469] bg-[#0E0B09] border border-[#281F19] rounded-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Top Actions & Notification Badges */}
          <div className="flex items-center gap-4">
            {/* Quick Action Button */}
            <div className="relative">
              <button
                onClick={() => setQuickActionOpen(!quickActionOpen)}
                className="px-3 py-1.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 rounded-xs shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quick Action</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {quickActionOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#140F0C] border border-[#2C211A] rounded-xs shadow-xl py-1 z-50 text-xs divide-y divide-[#241C16]"
                  onClick={() => setQuickActionOpen(false)}
                >
                  <div className="py-1">
                    <Link
                      href="/admin/products"
                      className="flex items-center gap-2 px-3.5 py-2 text-[#FCFAF6] hover:bg-[#1E1713] hover:text-champagne transition-colors"
                    >
                      <Package className="w-3.5 h-3.5 text-champagne" />
                      <span>Add New Material</span>
                    </Link>
                    <Link
                      href="/admin/projects"
                      className="flex items-center gap-2 px-3.5 py-2 text-[#FCFAF6] hover:bg-[#1E1713] hover:text-champagne transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5 text-champagne" />
                      <span>Add Architectural Project</span>
                    </Link>
                    <Link
                      href="/admin/quotes"
                      className="flex items-center gap-2 px-3.5 py-2 text-[#FCFAF6] hover:bg-[#1E1713] hover:text-champagne transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-champagne" />
                      <span>Review Quotations</span>
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/admin/inventory"
                      className="flex items-center gap-2 px-3.5 py-2 text-[#FCFAF6] hover:bg-[#1E1713] hover:text-champagne transition-colors"
                    >
                      <Boxes className="w-3.5 h-3.5 text-champagne" />
                      <span>Update Inventory Stock</span>
                    </Link>
                    <Link
                      href="/admin/orders"
                      className="flex items-center gap-2 px-3.5 py-2 text-[#FCFAF6] hover:bg-[#1E1713] hover:text-champagne transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-champagne" />
                      <span>View Orders & Dispatch</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 text-[#FCFAF6] rounded-xs transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-[#A89F91]" />
                {notifCounts.recentActivity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-champagne text-[#100C0A] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {notifCounts.recentActivity}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#140F0C] border border-[#2C211A] rounded-xs shadow-2xl p-4 z-50 text-xs space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-[#241C16] pb-2">
                    <span className="font-serif text-sm text-[#FCFAF6] font-medium">Activity Stream</span>
                    <span className="text-[10px] text-champagne uppercase font-semibold">Realtime Feed</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifCounts.pendingOrders > 0 && (
                      <Link
                        href="/admin/orders"
                        onClick={() => setNotifOpen(false)}
                        className="p-2.5 bg-[#1C1612] hover:bg-[#241C16] border border-[#2C211A] rounded-xs block space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-champagne">New Orders Received</span>
                          <span className="px-1.5 py-0.2 bg-champagne/20 text-champagne text-[9px] rounded-2xs font-bold">
                            {notifCounts.pendingOrders}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A89F91]">Action required for client dispatch.</p>
                      </Link>
                    )}

                    {notifCounts.pendingQuotes > 0 && (
                      <Link
                        href="/admin/quotes"
                        onClick={() => setNotifOpen(false)}
                        className="p-2.5 bg-[#1C1612] hover:bg-[#241C16] border border-[#2C211A] rounded-xs block space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-champagne">Architectural Quotes Pending</span>
                          <span className="px-1.5 py-0.2 bg-champagne/20 text-champagne text-[9px] rounded-2xs font-bold">
                            {notifCounts.pendingQuotes}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A89F91]">Review estimation dossiers & inquiries.</p>
                      </Link>
                    )}

                    {notifCounts.lowStock > 0 && (
                      <Link
                        href="/admin/inventory"
                        onClick={() => setNotifOpen(false)}
                        className="p-2.5 bg-[#1C1612] hover:bg-[#241C16] border border-[#2C211A] rounded-xs block space-y-1 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-amber-400">Low Stock Alert</span>
                          <span className="px-1.5 py-0.2 bg-amber-950/60 text-amber-400 border border-amber-800/40 text-[9px] rounded-2xs font-bold">
                            {notifCounts.lowStock}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A89F91]">Materials requiring inventory replenishment.</p>
                      </Link>
                    )}

                    {notifCounts.recentActivity === 0 && (
                      <div className="p-4 text-center text-[#7E7469] space-y-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                        <p className="text-xs">All studio pipelines are up to date.</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-[#241C16] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Radio className={`w-3 h-3 ${pushStatus === 'granted' ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                      <span className="text-[#A89F91]">
                        {pushStatus === 'granted' ? 'Push Alerts Active' : 'Push Inactive'}
                      </span>
                    </div>
                    {pushStatus !== 'granted' ? (
                      <button
                        onClick={handleRequestPushPermission}
                        className="px-2 py-1 bg-champagne/20 text-champagne hover:bg-champagne/30 rounded-2xs font-medium text-[10px] transition-colors"
                      >
                        Enable Alerts
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/admin/notifications/test', { method: 'POST' });
                            const d = await res.json();
                            alert(d.message || 'Test notification sent.');
                          } catch (e: any) {
                            alert(e.message || 'Failed to dispatch test notification.');
                          }
                        }}
                        className="text-[10px] text-[#A89F91] hover:text-champagne underline"
                      >
                        Send Test Push
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body with mobile safe padding */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto overflow-x-hidden pb-24 md:pb-10">
          {children}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE NATIVE BOTTOM NAVIGATION BAR (< md ONLY)                        */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0706]/98 backdrop-blur-xl border-t border-[#241C16] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {/* Tab 1: Command Center / Overview */}
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xs transition-all ${
            pathname === '/admin' ? 'text-champagne' : 'text-[#8E8275] hover:text-[#FCFAF6]'
          }`}
        >
          <div className="relative">
            <LayoutDashboard className={`w-4 h-4 ${pathname === '/admin' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            {pathname === '/admin' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-champagne rounded-full" />
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-1">Overview</span>
        </Link>

        {/* Tab 2: Orders */}
        <Link
          href="/admin/orders"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xs transition-all ${
            pathname.startsWith('/admin/orders') ? 'text-champagne' : 'text-[#8E8275] hover:text-[#FCFAF6]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-4 h-4 ${pathname.startsWith('/admin/orders') ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            {notifCounts.pendingOrders > 0 && (
              <span className="absolute -top-1 -right-2 bg-champagne text-[#100C0A] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {notifCounts.pendingOrders}
              </span>
            )}
            {pathname.startsWith('/admin/orders') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-champagne rounded-full" />
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-1">Orders</span>
        </Link>

        {/* Tab 3: Materials & Products */}
        <Link
          href="/admin/products"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xs transition-all ${
            pathname.startsWith('/admin/products') ? 'text-champagne' : 'text-[#8E8275] hover:text-[#FCFAF6]'
          }`}
        >
          <div className="relative">
            <Package className={`w-4 h-4 ${pathname.startsWith('/admin/products') ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            {pathname.startsWith('/admin/products') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-champagne rounded-full" />
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-1">Materials</span>
        </Link>

        {/* Tab 4: Quotes */}
        <Link
          href="/admin/quotes"
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xs transition-all ${
            pathname.startsWith('/admin/quotes') ? 'text-champagne' : 'text-[#8E8275] hover:text-[#FCFAF6]'
          }`}
        >
          <div className="relative">
            <FileText className={`w-4 h-4 ${pathname.startsWith('/admin/quotes') ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            {notifCounts.pendingQuotes > 0 && (
              <span className="absolute -top-1 -right-2 bg-champagne text-[#100C0A] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {notifCounts.pendingQuotes}
              </span>
            )}
            {pathname.startsWith('/admin/quotes') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-champagne rounded-full" />
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-1">Quotes</span>
        </Link>

        {/* Tab 5: Studio Hub / Menu Drawer Trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xs transition-all ${
            mobileMenuOpen ? 'text-champagne' : 'text-[#8E8275] hover:text-[#FCFAF6]'
          }`}
        >
          <div className="relative">
            <Menu className="w-4 h-4 stroke-[1.8]" />
            {notifCounts.lowStock > 0 && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-1">Hub</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* 5. MOBILE SLIDE-OVER STUDIO HUB DRAWER (< md ONLY)                        */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#0E0B09] border-t border-[#2C211A] rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 space-y-5 shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-[#3A2E26] rounded-full mx-auto" />

            {/* User Profile Header */}
            <div className="flex items-center justify-between p-3 bg-[#140F0C] border border-[#241C16] rounded-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-champagne/20 text-champagne border border-champagne/40 flex items-center justify-center font-serif text-sm font-semibold">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#FCFAF6]">{admin.name}</h4>
                  <span className="text-[10px] text-champagne uppercase tracking-wider font-mono">
                    {isOwner ? 'Principal Architect' : 'Operations Staff'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="px-2.5 py-1 text-[10px] uppercase font-semibold text-red-400 bg-red-950/40 border border-red-800/40 rounded-2xs hover:bg-red-900/60 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Quick Actions 2x2 Grid */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-widest text-[#7E7469] font-semibold block px-1">
                Quick Shortcuts
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/admin/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-2 transition-colors"
                >
                  <Package className="w-4 h-4 text-champagne" />
                  <span className="text-[11px] font-medium text-[#FCFAF6]">Add Material</span>
                </Link>
                <Link
                  href="/admin/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-2 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-champagne" />
                  <span className="text-[11px] font-medium text-[#FCFAF6]">Add Project</span>
                </Link>
                <Link
                  href="/admin/inventory"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-2 transition-colors"
                >
                  <Boxes className="w-4 h-4 text-champagne" />
                  <span className="text-[11px] font-medium text-[#FCFAF6]">Update Stock</span>
                </Link>
                <Link
                  href="/admin/quotes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-champagne" />
                  <span className="text-[11px] font-medium text-[#FCFAF6]">Review Quotes</span>
                </Link>
              </div>
            </div>

            {/* Categorized Full Studio Menu */}
            <div className="space-y-4">
              {navGroups.map((grp) => (
                <div key={grp.group} className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#7E7469] font-semibold block px-1">
                    {grp.group}
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {grp.items.map((item) => {
                      const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-3 rounded-xs text-xs tracking-wider transition-colors ${
                            isActive
                              ? 'bg-champagne/15 text-champagne border border-champagne/30 font-semibold'
                              : 'bg-[#140F0C] border border-[#241C16] text-[#B5ABA0] hover:text-[#FCFAF6]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-champagne' : 'text-[#8E8275]'}`} />
                            <span className="text-[12px]">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-champagne text-[#100C0A] text-[9px] font-bold rounded-2xs">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Realtime Push Notification Status Bar */}
            <div className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Radio className={`w-3.5 h-3.5 ${pushStatus === 'granted' ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                <span className="text-[11px] text-[#A89F91]">
                  {pushStatus === 'granted' ? 'Push Alerts Active' : 'Push Alerts Disabled'}
                </span>
              </div>
              {pushStatus !== 'granted' ? (
                <button
                  onClick={handleRequestPushPermission}
                  className="px-2.5 py-1 bg-champagne text-[#100C0A] text-[10px] font-semibold uppercase rounded-2xs"
                >
                  Enable
                </button>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/admin/notifications/test', { method: 'POST' });
                      const d = await res.json();
                      alert(d.message || 'Test notification sent.');
                    } catch (e: any) {
                      alert(e.message || 'Failed to dispatch test notification.');
                    }
                  }}
                  className="text-[10px] text-champagne underline"
                >
                  Test Alert
                </button>
              )}
            </div>

            {/* Public Studio Link & Dismiss */}
            <div className="flex items-center justify-between pt-2 border-t border-[#241C16]">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-champagne hover:underline flex items-center gap-1.5"
              >
                <span>View Public Studio</span> <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-1.5 bg-[#1C1612] text-[#A89F91] hover:text-[#FCFAF6] text-xs rounded-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MOBILE NOTIFICATION DRAWER (< md ONLY)                                 */}
      {/* ========================================================================= */}
      {mobileNotifOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end animate-fade-in"
          onClick={() => setMobileNotifOpen(false)}
        >
          <div
            className="bg-[#0E0B09] border-t border-[#2C211A] rounded-t-2xl max-h-[80vh] overflow-y-auto p-5 space-y-4 shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#3A2E26] rounded-full mx-auto" />
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <span className="font-serif text-base text-[#FCFAF6]">Live Activity Feed</span>
              <span className="text-[10px] text-champagne uppercase font-mono">Realtime Stream</span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {notifCounts.pendingOrders > 0 && (
                <Link
                  href="/admin/orders"
                  onClick={() => setMobileNotifOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs block space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-champagne text-xs">New Orders Received</span>
                    <span className="px-1.5 py-0.2 bg-champagne/20 text-champagne text-[9px] rounded-2xs font-bold">
                      {notifCounts.pendingOrders}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A89F91]">Action required for client dispatch.</p>
                </Link>
              )}

              {notifCounts.pendingQuotes > 0 && (
                <Link
                  href="/admin/quotes"
                  onClick={() => setMobileNotifOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs block space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-champagne text-xs">Architectural Quotes Pending</span>
                    <span className="px-1.5 py-0.2 bg-champagne/20 text-champagne text-[9px] rounded-2xs font-bold">
                      {notifCounts.pendingQuotes}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A89F91]">Review estimation dossiers & inquiries.</p>
                </Link>
              )}

              {notifCounts.lowStock > 0 && (
                <Link
                  href="/admin/inventory"
                  onClick={() => setMobileNotifOpen(false)}
                  className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs block space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-400 text-xs">Low Stock Alert</span>
                    <span className="px-1.5 py-0.2 bg-amber-950/60 text-amber-400 border border-amber-800/40 text-[9px] rounded-2xs font-bold">
                      {notifCounts.lowStock}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A89F91]">Materials requiring inventory replenishment.</p>
                </Link>
              )}

              {notifCounts.recentActivity === 0 && (
                <div className="p-6 text-center text-[#7E7469] space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs">All studio pipelines are up to date.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileNotifOpen(false)}
              className="w-full py-2 bg-[#140F0C] border border-[#241C16] text-[#A89F91] text-xs rounded-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MOBILE QUICK ACTION DRAWER (< md ONLY)                                 */}
      {/* ========================================================================= */}
      {mobileQuickOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end animate-fade-in"
          onClick={() => setMobileQuickOpen(false)}
        >
          <div
            className="bg-[#0E0B09] border-t border-[#2C211A] rounded-t-2xl p-5 space-y-4 shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#3A2E26] rounded-full mx-auto" />
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <span className="font-serif text-base text-[#FCFAF6]">Quick Operations</span>
              <span className="text-[10px] text-champagne uppercase font-mono">Create & Manage</span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <Link
                href="/admin/products"
                onClick={() => setMobileQuickOpen(false)}
                className="p-3.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-3 transition-colors"
              >
                <Package className="w-4 h-4 text-champagne" />
                <div>
                  <span className="text-xs font-medium text-[#FCFAF6] block">Add New Material</span>
                  <span className="text-[10px] text-[#8E8275]">Catalog item, finish, price modifier</span>
                </div>
              </Link>

              <Link
                href="/admin/projects"
                onClick={() => setMobileQuickOpen(false)}
                className="p-3.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-3 transition-colors"
              >
                <Building2 className="w-4 h-4 text-champagne" />
                <div>
                  <span className="text-xs font-medium text-[#FCFAF6] block">Add Architectural Project</span>
                  <span className="text-[10px] text-[#8E8275]">Publish portfolio commission & blueprints</span>
                </div>
              </Link>

              <Link
                href="/admin/inventory"
                onClick={() => setMobileQuickOpen(false)}
                className="p-3.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-3 transition-colors"
              >
                <Boxes className="w-4 h-4 text-champagne" />
                <div>
                  <span className="text-xs font-medium text-[#FCFAF6] block">Update Inventory Stock</span>
                  <span className="text-[10px] text-[#8E8275]">Adjust warehouse stock & reserve counts</span>
                </div>
              </Link>

              <Link
                href="/admin/quotes"
                onClick={() => setMobileQuickOpen(false)}
                className="p-3.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs flex items-center gap-3 transition-colors"
              >
                <FileText className="w-4 h-4 text-champagne" />
                <div>
                  <span className="text-xs font-medium text-[#FCFAF6] block">Review Quotations</span>
                  <span className="text-[10px] text-[#8E8275]">Client estimation dossiers & inquiries</span>
                </div>
              </Link>
            </div>

            <button
              onClick={() => setMobileQuickOpen(false)}
              className="w-full py-2 bg-[#140F0C] border border-[#241C16] text-[#A89F91] text-xs rounded-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Global Search Palette Modal (Ctrl+K) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-[#140F0C] border border-[#2C211A] w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-[#241C16]">
              <Search className="w-4 h-4 text-champagne" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials, orders, customers, quotes, projects..."
                className="w-full p-3.5 bg-transparent text-xs text-[#FCFAF6] placeholder-[#7E7469] focus:outline-hidden"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#7E7469] hover:text-[#FCFAF6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#201712]">
              {searching ? (
                <div className="p-6 text-center text-xs text-[#A89F91] space-y-2">
                  <div className="w-4 h-4 border-2 border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
                  <span>Searching database...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#7E7469]">
                  {searchQuery.length < 2 ? 'Type at least 2 characters to search across studio entities...' : 'No matching studio records found.'}
                </div>
              ) : (
                searchResults.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-[#1E1713] transition-colors rounded-xs group block"
                  >
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#FCFAF6] group-hover:text-champagne transition-colors">
                          {item.title}
                        </span>
                        <span className="px-1.5 py-0.2 bg-[#241C16] text-[#A89F91] text-[9px] uppercase font-mono rounded-2xs">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E8275] truncate">{item.subtitle}</p>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] text-champagne font-mono flex-shrink-0 ml-2">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
