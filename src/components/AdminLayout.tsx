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
import { urlBase64ToUint8Array } from '@/lib/push';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  // Execute global search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Load notification badge counts
  useEffect(() => {
    async function loadNotificationMetrics() {
      try {
        const [ordRes, qtRes, prodRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/quotes'),
          fetch('/api/products?all=true'),
        ]);

        let pOrders = 0;
        let pQuotes = 0;
        let lStock = 0;

        if (ordRes.ok) {
          const d = await ordRes.json();
          pOrders = (d.orders || []).filter((o: any) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
        }
        if (qtRes.ok) {
          const d = await qtRes.json();
          pQuotes = (d.quotes || []).filter((q: any) => q.status === 'Pending' || q.status === 'Under_Review').length;
        }
        if (prodRes.ok) {
          const d = await prodRes.json();
          lStock = (d.products || []).filter((p: any) => p.stock <= (p.moq * 2) || p.stock < 10).length;
        }

        setNotifCounts({
          pendingOrders: pOrders,
          pendingQuotes: pQuotes,
          lowStock: lStock,
          recentActivity: pOrders + pQuotes + lStock,
        });
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
    if (!loading && !admin) {
      router.replace('/studio');
    }
  }, [admin, loading, router]);

  useEffect(() => {
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
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0A0706] text-[#FCFAF6] p-4 flex items-center justify-between sticky top-0 z-50 border-b border-[#241C16]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm overflow-hidden bg-[#16110E] shadow-xs flex-shrink-0 border border-champagne/40">
            <img src="/logo.png" alt="Balaji" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-sm tracking-wider text-[#FCFAF6]">BALAJI ATELIER</span>
          <span
            className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 font-bold rounded-2xs ${
              isOwner ? 'bg-champagne/20 text-champagne border border-champagne/30' : 'bg-white/10 text-white/90 border border-white/15'
            }`}
          >
            {isOwner ? 'OWNER' : 'EMPLOYEE'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 text-[#A89F91] hover:text-[#FCFAF6]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-1 text-[#FCFAF6]/80 hover:text-[#FCFAF6]">
            {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#0A0706] text-[#FCFAF6] flex-shrink-0 flex flex-col border-r border-[#241C16] z-40 fixed md:sticky top-0 h-screen overflow-y-auto`}
      >
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
                      onClick={() => setMobileNavOpen(false)}
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

      {/* Main Command Workspace */}
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
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>

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
