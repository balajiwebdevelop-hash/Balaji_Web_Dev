'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Save,
  Check,
  History,
  RefreshCw,
  Building2,
  Phone,
  Truck,
  Globe,
  Megaphone,
  AlertCircle,
  Search,
  Filter,
  LayoutTemplate,
  Sparkles,
  ArrowRight,
  Eye,
  ImageIcon,
  QrCode,
  CreditCard,
  Copy,
  ShieldAlert,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings, AuditLog, HomepageSettings, PaymentGatewaySettings } from '@/types';
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

export default function AdminSettingsPage() {
  const { admin } = useAdminAuth();
  const isOwner = admin?.role === 'owner' || admin?.role === 'super_admin';

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [testPushing, setTestPushing] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);
  const [browserPerm, setBrowserPerm] = useState<NotificationPermission | 'unsupported'>('default');

  // Active section tab
  const [activeTab, setActiveTab] = useState<
    'homepage' | 'identity' | 'payment' | 'fiscal' | 'announcements' | 'push' | 'audit'
  >('homepage');

  // Audit Log Filter States
  const [auditSearch, setAuditSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('ALL');

  const loadSettingsAndLogs = async () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setBrowserPerm(Notification.permission);
      } else if (typeof window !== 'undefined') {
        setBrowserPerm('unsupported');
      }

      const [setRes, logRes] = await Promise.all([
        fetch('/api/admin/settings', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }),
        fetch('/api/admin/audit-logs', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }),
      ]);

      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.settings);
      } else {
        const errData = await setRes.json().catch(() => ({}));
        setSaveError(errData.error || 'Failed to load site settings from server.');
      }

      if (logRes.ok) {
        const l = await logRes.json();
        setLogs(l.logs || []);
      }
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'Network error loading studio configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettingsAndLogs();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedSuccess(false);
    setSaveError(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSavedSuccess(true);
        if (data.settings) {
          setSettings(data.settings);
        }
        // Reload audit logs to reflect the settings modification
        const logRes = await fetch('/api/admin/audit-logs');
        if (logRes.ok) {
          const l = await logRes.json();
          setLogs(l.logs || []);
        }
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        setSaveError(data.error || 'Failed to save settings to database.');
      }
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'Network error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const updateHomepage = (field: keyof HomepageSettings, value: string) => {
    if (!settings) return;
    const currentHome = settings.homepage || {};
    setSettings({
      ...settings,
      homepage: {
        ...currentHome,
        [field]: value,
      },
    });
  };

  const updatePaymentGateway = (field: keyof PaymentGatewaySettings, value: any) => {
    if (!settings) return;
    const currentPg = settings.paymentGateway || {
      enabled: true,
      gatewayName: 'Balaji PG',
      methodName: 'Balaji QR Payment',
      upiId: '6000149918@fam',
      merchantName: 'Balaji Architect & Interiors',
      instructions: '',
      qrExpiryMinutes: 10,
      enableGPay: true,
      enablePhonePe: true,
      enablePaytm: true,
      enableBhim: true,
      enableCred: true,
      enableAmazonPay: true,
      requireUtr: true,
    };

    setSettings({
      ...settings,
      paymentGateway: {
        ...currentPg,
        [field]: value,
      },
    });
  };

  const handleSendTestPush = async () => {
    setTestPushing(true);
    setPushResult(null);
    try {
      // 1. Ensure service worker and browser push subscription are registered
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'Notification' in window) {
        if (Notification.permission !== 'granted') {
          const perm = await Notification.requestPermission();
          setBrowserPerm(perm);
          if (perm !== 'granted') {
            setPushResult('Please allow browser notifications in the permission prompt to enable alerts.');
            setTestPushing(false);
            return;
          }
        }

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

      // 2. Dispatch real server push
      const res = await fetch('/api/admin/notifications/test', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPushResult(data.message || 'Real Web Push notification dispatched to your registered device.');
      } else {
        setPushResult(data.message || data.error || 'Test notification sent to registered endpoints.');
      }
    } catch (err: any) {
      setPushResult(err.message || 'Server error sending test push.');
    } finally {
      setTestPushing(false);
    }
  };

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      auditSearch === '' ||
      l.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.adminEmail.toLowerCase().includes(auditSearch.toLowerCase()) ||
      (l.entity && l.entity.toLowerCase().includes(auditSearch.toLowerCase())) ||
      (l.details && JSON.stringify(l.details).toLowerCase().includes(auditSearch.toLowerCase()));

    const matchesEntity =
      entityFilter === 'ALL' || (l.entity && l.entity.toLowerCase() === entityFilter.toLowerCase());

    return matchesSearch && matchesEntity;
  });

  if (!isOwner) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 p-8 text-center space-y-4 max-w-lg mx-auto mt-12">
          <ShieldAlert className="w-12 h-12 text-red-600 mx-auto" />
          <h2 className="font-serif text-2xl text-red-900">Access Restricted</h2>
          <p className="text-xs text-red-700 leading-relaxed">
            Studio Settings & Global Configuration is strictly restricted to the Studio Owner. If you require changes to branding, payment, or studio configuration, please contact Vikas Sir (Principal Architect).
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-warmgray flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-bronze" />
          <span className="text-xs uppercase tracking-widest">Loading studio configuration & audit trail...</span>
        </div>
      </AdminLayout>
    );
  }

  const home = settings.homepage || {};
  const pg = settings.paymentGateway || {
    enabled: true,
    gatewayName: 'Balaji PG',
    methodName: 'Balaji QR Payment',
    upiId: '6000149918@fam',
    merchantName: 'Balaji Architect & Interiors',
    instructions:
      '1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\n2. Scan the dynamic Balaji QR code or select your preferred app below.\n3. Verify payee "Balaji Architect & Interiors" and exact amount.\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.',
    qrExpiryMinutes: 10,
    enableGPay: true,
    enablePhonePe: true,
    enablePaytm: true,
    enableBhim: true,
    enableCred: true,
    enableAmazonPay: true,
    requireUtr: true,
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Full CMS & Operations</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Studio Settings & Page Controls</h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={loadSettingsAndLogs}
              className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reload Config
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium cursor-pointer"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* Global Feedback Notifications */}
        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">All studio settings, Balaji PG configuration, and homepage content saved to Supabase.</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{saveError}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-atelier pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('homepage')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'homepage'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-bronze" />
            Homepage & Hero Control
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-bronze" />
            Brand Logo & Identity
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-bronze" />
            Balaji PG / QR Gateway
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fiscal')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'fiscal'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-bronze" />
            Tax, GST & Freight
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-bronze" />
            Announcement Bar & Social
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('push')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'push'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-bronze" />
            Push Notifications
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-espresso text-surface border border-espresso'
                : 'bg-surface text-warmgray hover:text-espresso border border-atelier'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-bronze" />
            Security Audit Trail
          </button>
        </div>

        {/* Master Form */}
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* TAB 1: HOMEPAGE & HERO CONTROL */}
          {activeTab === 'homepage' && (
            <div className="space-y-8">
              {/* Hero Live Preview Card */}
              <div className="relative rounded-sm overflow-hidden border border-atelier bg-espresso text-surface p-8 sm:p-12 text-center space-y-4">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage: `url(${
                      home.heroImageUrl ||
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90'
                    })`,
                  }}
                />
                <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-medium">
                    {home.heroEyebrow || 'Architecture • Interior Studio • Material Curation'}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-4xl text-surface font-light leading-tight">
                    {home.heroHeadingLine1 || 'INTERIORS.'} <br />
                    {home.heroHeadingLine2 || 'ARCHITECTURE.'} <br />
                    {home.heroHeadingLine3 || 'MATERIALS.'}
                  </h1>
                  <p className="text-xs text-surface/80 max-w-lg mx-auto line-clamp-2">
                    {home.heroDescription ||
                      'Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.'}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <span className="px-4 py-2 bg-surface text-espresso text-[10px] uppercase tracking-widest font-medium">
                      {home.heroPrimaryBtnText || 'Explore Projects'} &rarr;
                    </span>
                    <span className="px-4 py-2 border border-surface/40 text-surface text-[10px] uppercase tracking-widest font-medium">
                      {home.heroSecondaryBtnText || 'Explore Materials'}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-[10px] bg-canvas/80 text-espresso px-2 py-1 uppercase tracking-widest border border-atelier">
                  Live Preview
                </div>
              </div>

              {/* Hero Section Edit Controls */}
              <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 border-b border-atelier pb-3">
                  <LayoutTemplate className="w-4 h-4 text-bronze" />
                  <h2 className="font-serif text-xl text-espresso">Hero Section Typography & Media</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-warmgray font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-bronze" /> Hero Background Image URL
                    </label>
                    <input
                      type="text"
                      value={home.heroImageUrl || ''}
                      onChange={(e) => updateHomepage('heroImageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-warmgray font-medium">
                      Hero Subtitle / Eyebrow Header
                    </label>
                    <input
                      type="text"
                      value={home.heroEyebrow || ''}
                      onChange={(e) => updateHomepage('heroEyebrow', e.target.value)}
                      placeholder="Architecture • Interior Studio • Material Curation"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Hero Heading — Line 1</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine1 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine1', e.target.value)}
                      placeholder="INTERIORS."
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Hero Heading — Line 2</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine2 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine2', e.target.value)}
                      placeholder="ARCHITECTURE."
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Hero Heading — Line 3</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine3 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine3', e.target.value)}
                      placeholder="MATERIALS."
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-warmgray font-medium">
                      Hero Narrative Description
                    </label>
                    <textarea
                      rows={3}
                      value={home.heroDescription || ''}
                      onChange={(e) => updateHomepage('heroDescription', e.target.value)}
                      placeholder="Crafted spaces and considered materials for timeless living..."
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Primary Button Text</label>
                    <input
                      type="text"
                      value={home.heroPrimaryBtnText || ''}
                      onChange={(e) => updateHomepage('heroPrimaryBtnText', e.target.value)}
                      placeholder="Explore Projects"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Primary Button Link</label>
                    <input
                      type="text"
                      value={home.heroPrimaryBtnLink || ''}
                      onChange={(e) => updateHomepage('heroPrimaryBtnLink', e.target.value)}
                      placeholder="/projects"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Secondary Button Text</label>
                    <input
                      type="text"
                      value={home.heroSecondaryBtnText || ''}
                      onChange={(e) => updateHomepage('heroSecondaryBtnText', e.target.value)}
                      placeholder="Explore Materials"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Secondary Button Link</label>
                    <input
                      type="text"
                      value={home.heroSecondaryBtnLink || ''}
                      onChange={(e) => updateHomepage('heroSecondaryBtnLink', e.target.value)}
                      placeholder="/materials"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Trust Banner Badges */}
              <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 border-b border-atelier pb-3">
                  <Sparkles className="w-4 h-4 text-bronze" />
                  <h2 className="font-serif text-xl text-espresso">Hero Bottom Trust Badges (4 Items)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Badge 1 (Rating / Trust)</label>
                    <input
                      type="text"
                      value={home.trustBadge1 || ''}
                      onChange={(e) => updateHomepage('trustBadge1', e.target.value)}
                      placeholder="★ 5.0 (22 Google Reviews)"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Badge 2 (Location)</label>
                    <input
                      type="text"
                      value={home.trustBadge2 || ''}
                      onChange={(e) => updateHomepage('trustBadge2', e.target.value)}
                      placeholder="Guwahati Studio Office"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Badge 3 (Practice Model)</label>
                    <input
                      type="text"
                      value={home.trustBadge3 || ''}
                      onChange={(e) => updateHomepage('trustBadge3', e.target.value)}
                      placeholder="Turnkey Architecture"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Badge 4 (Logistics)</label>
                    <input
                      type="text"
                      value={home.trustBadge4 || ''}
                      onChange={(e) => updateHomepage('trustBadge4', e.target.value)}
                      placeholder="Pan-India Material Logistics"
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRAND LOGO & IDENTITY */}
          {activeTab === 'identity' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-2 border-b border-atelier pb-3">
                <Building2 className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Header Branding Typography & Studio Profile</h2>
              </div>

              {/* Live Header Logo Preview */}
              <div className="p-6 bg-canvas border border-atelier flex flex-col items-center justify-center text-center space-y-1">
                <span className="font-serif text-xl tracking-widest text-espresso font-normal">
                  {settings.brandName || 'BALAJI ARCHITECT & INTERIORS'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  {settings.brandSubtitle || 'ARCHITECTURE • INTERIORS • MATERIALS'}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-bronze pt-2">Live Header Brand Preview</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Brand Name (Header Title)</label>
                  <input
                    type="text"
                    value={settings.brandName || ''}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden font-serif text-sm tracking-wider"
                    placeholder="BALAJI ARCHITECT & INTERIORS"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Brand Subtitle (Header Sub-text)</label>
                  <input
                    type="text"
                    value={settings.brandSubtitle || ''}
                    onChange={(e) => setSettings({ ...settings, brandSubtitle: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden uppercase tracking-widest text-[11px]"
                    placeholder="ARCHITECTURE • INTERIORS • MATERIALS"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Principal Architect Name</label>
                  <input
                    type="text"
                    value={settings.architectName || ''}
                    onChange={(e) => setSettings({ ...settings, architectName: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    placeholder="Vikas Sir (Principal Architect)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Established Year</label>
                  <input
                    type="text"
                    value={settings.establishedYear || '2014'}
                    onChange={(e) => setSettings({ ...settings, establishedYear: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Tagline / Atelier Philosophy</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Google Rating / Trust Metric</label>
                  <input
                    type="text"
                    value={settings.googleRating || '★ 5.0 (22 Google Reviews)'}
                    onChange={(e) => setSettings({ ...settings, googleRating: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Official Studio Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail || ''}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Direct Telephone</label>
                  <input
                    type="text"
                    value={settings.contactPhone || ''}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">WhatsApp Direct Line</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber || '+91 70029 48484'}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Physical Studio Address</label>
                  <input
                    type="text"
                    value={settings.studioAddress || ''}
                    onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Operating Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours || 'Mon - Sat: 10:00 AM - 7:00 PM (IST)'}
                    onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BALAJI PG / PAYMENT GATEWAY (DYNAMIC QR PAYMENT) */}
          {activeTab === 'payment' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-atelier pb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-bronze" />
                  <div>
                    <h2 className="font-serif text-2xl text-espresso">Balaji PG • Dynamic QR Payment Gateway</h2>
                    <span className="text-[11px] text-warmgray">Real-Time UPI Gateway Configuration</span>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-espresso cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pg.enabled ?? true}
                    onChange={(e) => updatePaymentGateway('enabled', e.target.checked)}
                    className="w-4 h-4 accent-bronze"
                  />
                  <span>Gateway Active</span>
                </label>
              </div>

              {/* Gateway Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Gateway Brand Name</label>
                  <input
                    type="text"
                    value={pg.gatewayName || 'Balaji PG'}
                    onChange={(e) => updatePaymentGateway('gatewayName', e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden font-medium"
                    placeholder="Balaji PG"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Payment Method Name</label>
                  <input
                    type="text"
                    value={pg.methodName || 'Balaji QR Payment'}
                    onChange={(e) => updatePaymentGateway('methodName', e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    placeholder="Balaji QR Payment"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium text-bronze">
                    Primary Payee UPI ID (Settlement Account) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pg.upiId || '6000149918@fam'}
                    onChange={(e) => updatePaymentGateway('upiId', e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-bronze focus:border-bronze focus:outline-hidden font-mono text-xs font-semibold text-espresso"
                    placeholder="6000149918@fam"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Payee Merchant / Studio Name</label>
                  <input
                    type="text"
                    value={pg.merchantName || 'Balaji Architect & Interiors'}
                    onChange={(e) => updatePaymentGateway('merchantName', e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden font-medium"
                    placeholder="Balaji Architect & Interiors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">QR Auto-Expiry Duration (Minutes)</label>
                  <input
                    type="number"
                    value={pg.qrExpiryMinutes || 10}
                    onChange={(e) => updatePaymentGateway('qrExpiryMinutes', Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                  <label className="uppercase tracking-wider text-warmgray font-medium">
                    Customer Step-by-Step Payment Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={pg.instructions || ''}
                    onChange={(e) => updatePaymentGateway('instructions', e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs leading-relaxed"
                    placeholder="1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay)..."
                  />
                </div>
              </div>

              {/* Supported UPI Apps Control */}
              <div className="pt-6 border-t border-atelier space-y-4">
                <span className="text-xs uppercase tracking-widest text-espresso font-medium block">
                  Active UPI Application Badges on Checkout:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enableGPay ?? true}
                      onChange={(e) => updatePaymentGateway('enableGPay', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">Google Pay</span>
                  </label>

                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enablePhonePe ?? true}
                      onChange={(e) => updatePaymentGateway('enablePhonePe', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">PhonePe</span>
                  </label>

                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enablePaytm ?? true}
                      onChange={(e) => updatePaymentGateway('enablePaytm', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">Paytm UPI</span>
                  </label>

                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enableBhim ?? true}
                      onChange={(e) => updatePaymentGateway('enableBhim', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">BHIM UPI</span>
                  </label>

                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enableCred ?? true}
                      onChange={(e) => updatePaymentGateway('enableCred', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">CRED UPI</span>
                  </label>

                  <label className="p-3 bg-canvas border border-atelier flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pg.enableAmazonPay ?? true}
                      onChange={(e) => updatePaymentGateway('enableAmazonPay', e.target.checked)}
                      className="w-3.5 h-3.5 accent-bronze"
                    />
                    <span className="font-medium text-espresso">Amazon Pay</span>
                  </label>
                </div>
              </div>

              {/* UTR Verification Toggle */}
              <div className="pt-4 border-t border-atelier flex items-center gap-3 text-xs">
                <input
                  type="checkbox"
                  id="requireUtr"
                  checked={pg.requireUtr ?? true}
                  onChange={(e) => updatePaymentGateway('requireUtr', e.target.checked)}
                  className="w-4 h-4 accent-bronze cursor-pointer"
                />
                <label htmlFor="requireUtr" className="cursor-pointer text-espresso font-medium">
                  Require customer to enter 12-digit UPI Reference / UTR Number before order placement
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: FISCAL, GST & FREIGHT */}
          {activeTab === 'fiscal' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-2 border-b border-atelier pb-3">
                <Truck className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Fiscal, GST & Freight Logistics</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Standard GST Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRatePercent !== undefined ? settings.taxRatePercent : 18}
                    onChange={(e) => setSettings({ ...settings, taxRatePercent: Number(e.target.value) })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Official GSTIN Number</label>
                  <input
                    type="text"
                    value={settings.gstinNumber || '18AAECB4848F1ZX'}
                    onChange={(e) => setSettings({ ...settings, gstinNumber: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier font-mono focus:border-bronze focus:outline-hidden"
                    placeholder="18AAECB4848F1ZX"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Standard Freight Fee (₹)</label>
                  <input
                    type="number"
                    value={settings.standardShippingFee !== undefined ? settings.standardShippingFee : 1500}
                    onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Complimentary Freight Threshold (₹)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold !== undefined ? settings.freeShippingThreshold : 50000}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currencySymbol || '₹'}
                    onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier font-mono focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Currency Code</label>
                  <input
                    type="text"
                    value={settings.currency || 'INR'}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full p-2.5 bg-canvas border border-atelier font-mono focus:border-bronze focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS & SOCIAL */}
          {activeTab === 'announcements' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-2 border-b border-atelier pb-3">
                <Megaphone className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Global Announcement Banner & Socials</h2>
              </div>

              <div className="space-y-6 text-xs">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="announcementToggle"
                    checked={settings.announcementBanner?.enabled ?? true}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        announcementBanner: {
                          enabled: e.target.checked,
                          text: settings.announcementBanner?.text || '',
                          linkUrl: settings.announcementBanner?.linkUrl || '/quote',
                        },
                      })
                    }
                    className="w-4 h-4 accent-bronze cursor-pointer"
                  />
                  <label htmlFor="announcementToggle" className="cursor-pointer uppercase tracking-wider text-espresso font-medium">
                    Display Announcement Header Bar on Website Top
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Announcement Message</label>
                    <input
                      type="text"
                      value={settings.announcementBanner?.text || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          announcementBanner: {
                            enabled: settings.announcementBanner?.enabled ?? true,
                            text: e.target.value,
                            linkUrl: settings.announcementBanner?.linkUrl || '/quote',
                          },
                        })
                      }
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Call-to-Action Link</label>
                    <input
                      type="text"
                      value={settings.announcementBanner?.linkUrl || '/quote'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          announcementBanner: {
                            enabled: settings.announcementBanner?.enabled ?? true,
                            text: settings.announcementBanner?.text || '',
                            linkUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-atelier grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Instagram Atelier URL</label>
                    <input
                      type="text"
                      value={settings.socialInstagram || ''}
                      onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Pinterest Portfolio URL</label>
                    <input
                      type="text"
                      value={settings.socialPinterest || ''}
                      onChange={(e) => setSettings({ ...settings, socialPinterest: e.target.value })}
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">LinkedIn Practice URL</label>
                    <input
                      type="text"
                      value={settings.socialLinkedin || ''}
                      onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-warmgray font-medium">Facebook Page URL</label>
                    <input
                      type="text"
                      value={settings.socialFacebook || 'https://facebook.com/balajiarchitects'}
                      onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                      className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WEB PUSH NOTIFICATIONS */}
          {activeTab === 'push' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-atelier pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-bronze" />
                  <h2 className="font-serif text-2xl text-espresso">Web Push Dispatch System</h2>
                </div>
                {browserPerm === 'granted' ? (
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Alerts Active on this Device
                  </span>
                ) : (
                  <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 font-medium">
                    {browserPerm === 'denied' ? 'Notifications Blocked in Browser' : 'Registration Pending'}
                  </span>
                )}
              </div>
              <p className="text-xs text-warmgray leading-relaxed max-w-2xl">
                When a customer places an order or submits an architectural quote, the server dispatches a VAPID web push directly to all registered administrative browsers.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleSendTestPush}
                  disabled={testPushing}
                  className="px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-wider font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" /> {testPushing ? 'Registering & Sending...' : 'Dispatch Test Notification'}
                </button>
                {pushResult && <span className="text-xs text-bronze font-medium">{pushResult}</span>}
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-bronze" />
                  <div>
                    <h2 className="font-serif text-2xl text-espresso">Security Audit Log</h2>
                    <span className="text-[11px] text-warmgray">Immutable Traceability & Action Records</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search logs by action, operator, details..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
                    />
                  </div>

                  {/* Entity Filter */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-warmgray" />
                    <select
                      value={entityFilter}
                      onChange={(e) => setEntityFilter(e.target.value)}
                      className="p-2 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
                    >
                      <option value="ALL">All Entities</option>
                      <option value="Order">Orders</option>
                      <option value="Product">Products</option>
                      <option value="Category">Categories</option>
                      <option value="SiteSettings">Site Settings</option>
                      <option value="Auth">Authentication</option>
                      <option value="Quote">Quotes</option>
                      <option value="Enquiry">Enquiries</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Audit Table */}
              <div className="overflow-x-auto max-h-[480px] overflow-y-auto border border-atelier">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-canvas z-10">
                    <tr className="border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray">
                      <th className="p-3">Timestamp (IST)</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Entity</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-atelier/60 font-mono text-[11px]">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-warmgray font-sans">
                          No audit records found matching the current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-canvas/50 transition-colors">
                          <td className="p-3 text-warmgray whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </td>
                          <td className="p-3 text-espresso whitespace-nowrap font-medium">{log.adminEmail}</td>
                          <td className="p-3">
                            <span className="inline-block px-2 py-0.5 bg-canvas border border-atelier text-timber font-medium text-[10px] uppercase tracking-wider">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 text-warmgray">{log.entity}</td>
                          <td className="p-3 text-warmgray font-sans text-xs max-w-md break-words">
                            {log.details ? (
                              <span className="text-espresso/80">{JSON.stringify(log.details)}</span>
                            ) : (
                              <span className="text-warmgray/60">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Fixed Action Bar */}
          <div className="p-4 bg-surface border border-atelier flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-warmgray">
              Changes update Supabase PostgreSQL immediately upon saving and take effect live across all pages.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium cursor-pointer shrink-0"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Persisting to Database...' : 'Save All Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
