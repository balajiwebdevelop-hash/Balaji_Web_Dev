'use client';

import React, { useEffect, useState } from 'react';
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
  LogOut,
  Bell,
  Radio,
  Menu,
  X,
  ExternalLink,
  Shield,
  UserCheck,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const DEFAULT_VAPID_PUBLIC_KEY =
  'BHsG3ouw3YgPO_jlPvdNIBFISisslHHm-vxyMHmCRswNnDQxTBCZTLR2qRAQvNOC-avolJ61etGkPrNJV4MpxTE';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pushStatus, setPushStatus] = useState<NotificationPermission | 'default'>('default');

  const isOwner = admin?.role === 'owner' || admin?.role === 'super_admin';

  useEffect(() => {
    if (!loading && !admin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [admin, loading, pathname, router]);

  // Route security check: block employees from accessing owner-only routes
  useEffect(() => {
    if (!loading && admin && !isOwner) {
      if (pathname.startsWith('/admin/settings') || pathname.startsWith('/admin/employees')) {
        router.replace('/admin');
      }
    }
  }, [admin, isOwner, loading, pathname, router]);

  // Register service worker and synchronize existing push subscription
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
      setPushStatus(Notification.permission);

      navigator.serviceWorker
        .register('/sw.js')
        .then(async (reg) => {
          if (Notification.permission === 'granted') {
            try {
              const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
              const convertedKey = urlBase64ToUint8Array(vapidKey);
              let sub = await reg.pushManager.getSubscription();
              if (!sub) {
                sub = await reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertedKey,
                });
              }
              if (sub) {
                await fetch('/api/notifications/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ subscription: sub }),
                });
              }
            } catch (err) {
              console.warn('Auto push subscription sync notice:', err);
            }
          }
        })
        .catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
    }
  }, [admin]);

  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission();
        setPushStatus(permission);
        if (permission === 'granted') {
          const reg = await navigator.serviceWorker.ready;
          const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
          const convertedKey = urlBase64ToUint8Array(vapidKey);
          let sub = await reg.pushManager.getSubscription();
          if (!sub) {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedKey,
            });
          }
          if (sub) {
            await fetch('/api/notifications/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscription: sub }),
            });
          }
        }
      } catch (e) {
        console.error('Failed to subscribe to push notifications', e);
      }
    }
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-espresso border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-espresso font-light">Authenticating Studio Admin...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  // Define navigational links according to role permissions
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Materials', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Inventory Control', href: '/admin/inventory', icon: Boxes },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Architectural Projects', href: '/admin/projects', icon: Building2 },
    { label: 'Design Services', href: '/admin/services', icon: Compass },
    { label: 'Quotes & Inquiries', href: '/admin/quotes', icon: FileText },
    { label: 'Customer Directory', href: '/admin/customers', icon: Users },
    ...(isOwner
      ? [
          { label: 'Employee Management', href: '/admin/employees', icon: UserCheck },
          { label: 'Studio Settings', href: '/admin/settings', icon: Settings },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden bg-espresso text-surface p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm overflow-hidden bg-espresso shadow-xs flex-shrink-0 border border-champagne/40">
            <img src="/logo.png" alt="Balaji" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-base tracking-wider">BALAJI ADMIN</span>
          <span
            className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 font-bold ${
              isOwner ? 'bg-champagne/20 text-champagne' : 'bg-surface/20 text-surface'
            }`}
          >
            {isOwner ? 'OWNER' : 'EMPLOYEE'}
          </span>
        </div>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-1">
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-espresso text-surface flex-shrink-0 flex flex-col border-r border-espresso-light z-40 fixed md:sticky top-0 h-screen overflow-y-auto`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-atelier-dark space-y-1">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-espresso shadow-xs flex-shrink-0 border border-champagne/40">
              <img src="/logo.png" alt="Balaji Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-widest text-surface block font-light leading-tight">
                BALAJI ARCHITECT
              </span>
              <span className="text-[8px] uppercase tracking-widest text-champagne font-medium mt-0.5">
                Studio Management Portal
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 pt-2 text-[10px] text-green-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Realtime Pipeline Active</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs tracking-wider rounded-none transition-colors font-medium ${
                  isActive
                    ? 'bg-champagne/15 text-champagne border-l-2 border-champagne'
                    : 'text-surface/70 hover:text-surface hover:bg-espresso-light'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Push Notification & User Status */}
        <div className="p-4 border-t border-atelier-dark space-y-3 text-xs">
          {pushStatus !== 'granted' && (
            <button
              onClick={requestPushPermission}
              className="w-full py-2 px-3 bg-champagne/10 text-champagne border border-champagne/30 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-champagne/20 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" /> Enable Push Alerts
            </button>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="truncate">
              <span className="font-medium text-surface block text-xs truncate">{admin.name}</span>
              <span className="text-[10px] text-surface/50 truncate block">{admin.email}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-semibold ${
                    isOwner
                      ? 'bg-champagne/20 text-champagne border border-champagne/40'
                      : 'bg-surface/10 text-surface/80 border border-surface/20'
                  }`}
                >
                  {isOwner ? 'OWNER' : 'EMPLOYEE'}
                </span>
                <span className="text-[9px] text-green-400">● Active</span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-surface/60 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-atelier-dark/60 flex items-center justify-between text-[10px] text-surface/40">
            <Link href="/" target="_blank" className="hover:text-surface flex items-center gap-1">
              <span>View Public Studio</span> <ExternalLink className="w-3 h-3" />
            </Link>
            <span>v1.0 Production</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
