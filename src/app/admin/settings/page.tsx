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
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
          setPushResult('VAPID public key not configured in environment.');
          setTestPushing(false);
          return;
        }
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
        <div className="bg-red-950/40 border border-red-800/50 p-8 text-center space-y-4 max-w-lg mx-auto mt-12 rounded-sm">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="font-serif text-2xl text-red-300">Access Restricted</h2>
          <p className="text-xs text-red-200/80 leading-relaxed">
            Studio Settings & Global Configuration is strictly restricted to the Studio Owner. If you require changes to branding, payment, or studio configuration, please contact Vikas Sir (Principal Architect).
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-[#A89F91] flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-champagne" />
          <span className="text-xs uppercase tracking-widest text-champagne">Loading studio configuration & audit trail...</span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-champagne font-medium">Full CMS & Operations</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light">Studio Settings & Page Controls</h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={loadSettingsAndLogs}
              className="p-2.5 bg-[#1D1714] border border-[#332821] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer rounded-xs shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-champagne" /> Reload Config
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="px-6 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest flex items-center gap-2 font-medium cursor-pointer transition-all rounded-xs shadow-xs"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* Global Feedback Notifications */}
        {savedSuccess && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2 rounded-xs animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">All studio settings, Balaji PG configuration, and homepage content saved to Supabase.</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-medium">{saveError}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#281F19] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('homepage')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'homepage'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            Homepage & Hero Control
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'identity'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Brand Logo & Identity
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'payment'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            Balaji PG / QR Gateway
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fiscal')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'fiscal'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Tax, GST & Freight
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'announcements'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            Announcement Bar & Social
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('push')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'push'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Push Notifications
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer rounded-2xs ${
              activeTab === 'audit'
                ? 'bg-champagne text-[#100C0A] border border-champagne shadow-xs'
                : 'bg-[#1D1714] text-[#A89F91] hover:text-[#FCFAF6] border border-[#332821] hover:border-champagne/40'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Security Audit Trail
          </button>
        </div>

        {/* Master Form */}
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* TAB 1: HOMEPAGE & HERO CONTROL */}
          {activeTab === 'homepage' && (
            <div className="space-y-8">
              {/* Hero Live Preview Card */}
              <div className="relative rounded-sm overflow-hidden border border-[#332821] bg-[#16110E] text-[#FCFAF6] p-8 sm:p-12 text-center space-y-4 shadow-md">
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
                  <h1 className="font-serif text-2xl sm:text-4xl text-[#FCFAF6] font-light leading-tight">
                    {home.heroHeadingLine1 || 'INTERIORS.'} <br />
                    {home.heroHeadingLine2 || 'ARCHITECTURE.'} <br />
                    {home.heroHeadingLine3 || 'MATERIALS.'}
                  </h1>
                  <p className="text-xs text-[#E5DCD0] max-w-lg mx-auto line-clamp-2">
                    {home.heroDescription ||
                      'Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.'}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <span className="px-4 py-2 bg-champagne text-[#100C0A] text-[10px] uppercase tracking-widest font-medium rounded-2xs">
                      {home.heroPrimaryBtnText || 'Explore Projects'} &rarr;
                    </span>
                    <span className="px-4 py-2 border border-champagne/50 text-champagne text-[10px] uppercase tracking-widest font-medium rounded-2xs">
                      {home.heroSecondaryBtnText || 'Explore Materials'}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-[10px] bg-[#100C0A]/90 text-champagne px-2 py-1 uppercase tracking-widest border border-champagne/30 rounded-2xs font-mono">
                  Live Preview
                </div>
              </div>

              {/* Hero Section Edit Controls */}
              <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#281F19] pb-3">
                  <LayoutTemplate className="w-4 h-4 text-champagne" />
                  <h2 className="font-serif text-xl text-[#FCFAF6]">Hero Section Typography & Media</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-champagne" /> Hero Background Image URL
                    </label>
                    <input
                      type="text"
                      value={home.heroImageUrl || ''}
                      onChange={(e) => updateHomepage('heroImageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-hidden font-mono text-[11px] rounded-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">
                      Hero Subtitle / Eyebrow Header
                    </label>
                    <input
                      type="text"
                      value={home.heroEyebrow || ''}
                      onChange={(e) => updateHomepage('heroEyebrow', e.target.value)}
                      placeholder="Architecture • Interior Studio • Material Curation"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Hero Heading — Line 1</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine1 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine1', e.target.value)}
                      placeholder="INTERIORS."
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Hero Heading — Line 2</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine2 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine2', e.target.value)}
                      placeholder="ARCHITECTURE."
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Hero Heading — Line 3</label>
                    <input
                      type="text"
                      value={home.heroHeadingLine3 || ''}
                      onChange={(e) => updateHomepage('heroHeadingLine3', e.target.value)}
                      placeholder="MATERIALS."
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">
                      Hero Narrative Description
                    </label>
                    <textarea
                      rows={3}
                      value={home.heroDescription || ''}
                      onChange={(e) => updateHomepage('heroDescription', e.target.value)}
                      placeholder="Crafted spaces and considered materials for timeless living..."
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden resize-none rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Primary Button Text</label>
                    <input
                      type="text"
                      value={home.heroPrimaryBtnText || ''}
                      onChange={(e) => updateHomepage('heroPrimaryBtnText', e.target.value)}
                      placeholder="Explore Projects"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Primary Button Link</label>
                    <input
                      type="text"
                      value={home.heroPrimaryBtnLink || ''}
                      onChange={(e) => updateHomepage('heroPrimaryBtnLink', e.target.value)}
                      placeholder="/projects"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Secondary Button Text</label>
                    <input
                      type="text"
                      value={home.heroSecondaryBtnText || ''}
                      onChange={(e) => updateHomepage('heroSecondaryBtnText', e.target.value)}
                      placeholder="Explore Materials"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Secondary Button Link</label>
                    <input
                      type="text"
                      value={home.heroSecondaryBtnLink || ''}
                      onChange={(e) => updateHomepage('heroSecondaryBtnLink', e.target.value)}
                      placeholder="/materials"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Trust Banner Badges */}
              <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#281F19] pb-3">
                  <Sparkles className="w-4 h-4 text-champagne" />
                  <h2 className="font-serif text-xl text-[#FCFAF6]">Hero Bottom Trust Badges (4 Items)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Badge 1 (Rating / Trust)</label>
                    <input
                      type="text"
                      value={home.trustBadge1 || ''}
                      onChange={(e) => updateHomepage('trustBadge1', e.target.value)}
                      placeholder="★ 5.0 (22 Google Reviews)"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Badge 2 (Location)</label>
                    <input
                      type="text"
                      value={home.trustBadge2 || ''}
                      onChange={(e) => updateHomepage('trustBadge2', e.target.value)}
                      placeholder="Guwahati Studio Office"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Badge 3 (Practice Model)</label>
                    <input
                      type="text"
                      value={home.trustBadge3 || ''}
                      onChange={(e) => updateHomepage('trustBadge3', e.target.value)}
                      placeholder="Turnkey Architecture"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Badge 4 (Logistics)</label>
                    <input
                      type="text"
                      value={home.trustBadge4 || ''}
                      onChange={(e) => updateHomepage('trustBadge4', e.target.value)}
                      placeholder="Pan-India Material Logistics"
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRAND LOGO & IDENTITY */}
          {activeTab === 'identity' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-8 rounded-xs shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#281F19] pb-3">
                <Building2 className="w-4 h-4 text-champagne" />
                <h2 className="font-serif text-xl text-[#FCFAF6]">Header Branding Typography & Studio Profile</h2>
              </div>

              {/* Live Header Logo Preview */}
              <div className="p-6 bg-[#14100D] border border-[#332821] flex flex-col items-center justify-center text-center space-y-2 rounded-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#100C0A] shadow-md flex-shrink-0 border border-champagne/50">
                    <img
                      src={settings.logoUrl || '/logo.png'}
                      alt="Brand Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-xl tracking-widest text-[#FCFAF6] font-normal leading-tight">
                      {settings.brandName || 'BALAJI ARCHITECT & INTERIORS'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-champagne font-medium mt-0.5">
                      {settings.brandSubtitle || 'ARCHITECTURE • INTERIORS • MATERIALS'}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-champagne/80 pt-1 font-mono">Live Header Brand & Logo Preview</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Brand Logo Image Path / URL</label>
                  <input
                    type="text"
                    value={settings.logoUrl || '/logo.png'}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden font-mono text-xs rounded-xs"
                    placeholder="/logo.png"
                  />
                  <span className="text-[10px] text-[#A89F91]">
                    Master high-resolution brand logo & iOS app icon (stored in public/logo.png).
                  </span>
                </div>

                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Brand Name (Header Title)</label>
                  <input
                    type="text"
                    value={settings.brandName || ''}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden font-serif text-sm tracking-wider rounded-xs"
                    placeholder="BALAJI ARCHITECT & INTERIORS"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Brand Subtitle (Header Sub-text)</label>
                  <input
                    type="text"
                    value={settings.brandSubtitle || ''}
                    onChange={(e) => setSettings({ ...settings, brandSubtitle: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden uppercase tracking-widest text-[11px] rounded-xs"
                    placeholder="ARCHITECTURE • INTERIORS • MATERIALS"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Principal Architect Name</label>
                  <input
                    type="text"
                    value={settings.architectName || ''}
                    onChange={(e) => setSettings({ ...settings, architectName: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    placeholder="Vikas Sir (Principal Architect)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Established Year</label>
                  <input
                    type="text"
                    value={settings.establishedYear || '2014'}
                    onChange={(e) => setSettings({ ...settings, establishedYear: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Tagline / Atelier Philosophy</label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Google Rating / Trust Metric</label>
                  <input
                    type="text"
                    value={settings.googleRating || '★ 5.0 (22 Google Reviews)'}
                    onChange={(e) => setSettings({ ...settings, googleRating: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Official Studio Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail || ''}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Direct Telephone</label>
                  <input
                    type="text"
                    value={settings.contactPhone || ''}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">WhatsApp Direct Line</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber || '+91 70029 48484'}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Physical Studio Address</label>
                  <input
                    type="text"
                    value={settings.studioAddress || ''}
                    onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Operating Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours || 'Mon - Sat: 10:00 AM - 7:00 PM (IST)'}
                    onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BALAJI PG / PAYMENT GATEWAY (DYNAMIC QR PAYMENT) */}
          {activeTab === 'payment' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-8 rounded-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-[#281F19] pb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-champagne" />
                  <div>
                    <h2 className="font-serif text-2xl text-[#FCFAF6]">Balaji PG • Dynamic QR Payment Gateway</h2>
                    <span className="text-[11px] text-[#A89F91]">Real-Time UPI Gateway Configuration</span>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#FCFAF6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pg.enabled ?? true}
                    onChange={(e) => updatePaymentGateway('enabled', e.target.checked)}
                    className="w-4 h-4 accent-champagne"
                  />
                  <span>Gateway Active</span>
                </label>
              </div>

              {/* Gateway Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Gateway Brand Name</label>
                  <input
                    type="text"
                    value={pg.gatewayName || 'Balaji PG'}
                    onChange={(e) => updatePaymentGateway('gatewayName', e.target.value)}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden font-medium rounded-xs"
                    placeholder="Balaji PG"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Payment Method Name</label>
                  <input
                    type="text"
                    value={pg.methodName || 'Balaji QR Payment'}
                    onChange={(e) => updatePaymentGateway('methodName', e.target.value)}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    placeholder="Balaji QR Payment"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne font-medium">
                    Primary Payee UPI ID (Settlement Account) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pg.upiId || '6000149918@fam'}
                    onChange={(e) => updatePaymentGateway('upiId', e.target.value)}
                    className="w-full p-2.5 bg-[#14100D] border border-champagne/50 focus:border-champagne focus:outline-hidden font-mono text-xs font-semibold text-champagne rounded-xs"
                    placeholder="6000149918@fam"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Payee Merchant / Studio Name</label>
                  <input
                    type="text"
                    value={pg.merchantName || 'Balaji Architect & Interiors'}
                    onChange={(e) => updatePaymentGateway('merchantName', e.target.value)}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden font-medium rounded-xs"
                    placeholder="Balaji Architect & Interiors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">QR Auto-Expiry Duration (Minutes)</label>
                  <input
                    type="number"
                    value={pg.qrExpiryMinutes || 10}
                    onChange={(e) => updatePaymentGateway('qrExpiryMinutes', Number(e.target.value))}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">
                    Customer Step-by-Step Payment Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={pg.instructions || ''}
                    onChange={(e) => updatePaymentGateway('instructions', e.target.value)}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden text-xs leading-relaxed rounded-xs"
                    placeholder="1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay)..."
                  />
                </div>
              </div>

              {/* Supported UPI Apps Control */}
              <div className="pt-6 border-t border-[#281F19] space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#FCFAF6] font-medium block">
                  Active UPI Application Badges on Checkout:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enableGPay ?? true}
                      onChange={(e) => updatePaymentGateway('enableGPay', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">Google Pay</span>
                  </label>

                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enablePhonePe ?? true}
                      onChange={(e) => updatePaymentGateway('enablePhonePe', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">PhonePe</span>
                  </label>

                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enablePaytm ?? true}
                      onChange={(e) => updatePaymentGateway('enablePaytm', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">Paytm UPI</span>
                  </label>

                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enableBhim ?? true}
                      onChange={(e) => updatePaymentGateway('enableBhim', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">BHIM UPI</span>
                  </label>

                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enableCred ?? true}
                      onChange={(e) => updatePaymentGateway('enableCred', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">CRED UPI</span>
                  </label>

                  <label className="p-3 bg-[#14100D] border border-[#382D25] flex items-center gap-2.5 cursor-pointer rounded-xs hover:border-champagne/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={pg.enableAmazonPay ?? true}
                      onChange={(e) => updatePaymentGateway('enableAmazonPay', e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne"
                    />
                    <span className="font-medium text-[#FCFAF6]">Amazon Pay</span>
                  </label>
                </div>
              </div>

              {/* UTR Verification Toggle */}
              <div className="pt-4 border-t border-[#281F19] flex items-center gap-3 text-xs">
                <input
                  type="checkbox"
                  id="requireUtr"
                  checked={pg.requireUtr ?? true}
                  onChange={(e) => updatePaymentGateway('requireUtr', e.target.checked)}
                  className="w-4 h-4 accent-champagne cursor-pointer"
                />
                <label htmlFor="requireUtr" className="cursor-pointer text-[#FCFAF6] font-medium">
                  Require customer to enter 12-digit UPI Reference / UTR Number before order placement
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: FISCAL, GST & FREIGHT */}
          {activeTab === 'fiscal' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-8 rounded-xs shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#281F19] pb-3">
                <Truck className="w-4 h-4 text-champagne" />
                <h2 className="font-serif text-xl text-[#FCFAF6]">Fiscal, GST & Freight Logistics</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Standard GST Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRatePercent !== undefined ? settings.taxRatePercent : 18}
                    onChange={(e) => setSettings({ ...settings, taxRatePercent: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Official GSTIN Number</label>
                  <input
                    type="text"
                    value={settings.gstinNumber || '18AAECB4848F1ZX'}
                    onChange={(e) => setSettings({ ...settings, gstinNumber: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] font-mono focus:border-champagne focus:outline-hidden rounded-xs"
                    placeholder="18AAECB4848F1ZX"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Standard Freight Fee (₹)</label>
                  <input
                    type="number"
                    value={settings.standardShippingFee !== undefined ? settings.standardShippingFee : 1500}
                    onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Complimentary Freight Threshold (₹)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold !== undefined ? settings.freeShippingThreshold : 50000}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currencySymbol || '₹'}
                    onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] font-mono focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Currency Code</label>
                  <input
                    type="text"
                    value={settings.currency || 'INR'}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] font-mono focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS & SOCIAL */}
          {activeTab === 'announcements' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-8 rounded-xs shadow-xs">
              <div className="flex items-center gap-2 border-b border-[#281F19] pb-3">
                <Megaphone className="w-4 h-4 text-champagne" />
                <h2 className="font-serif text-xl text-[#FCFAF6]">Global Announcement Banner & Socials</h2>
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
                    className="w-4 h-4 accent-champagne cursor-pointer"
                  />
                  <label htmlFor="announcementToggle" className="cursor-pointer uppercase tracking-wider text-[#FCFAF6] font-medium">
                    Display Announcement Header Bar on Website Top
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Announcement Message</label>
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
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Call-to-Action Link</label>
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
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#281F19] grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Instagram Atelier URL</label>
                    <input
                      type="text"
                      value={settings.socialInstagram || ''}
                      onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Pinterest Portfolio URL</label>
                    <input
                      type="text"
                      value={settings.socialPinterest || ''}
                      onChange={(e) => setSettings({ ...settings, socialPinterest: e.target.value })}
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">LinkedIn Practice URL</label>
                    <input
                      type="text"
                      value={settings.socialLinkedin || ''}
                      onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="uppercase tracking-wider text-champagne/90 font-medium">Facebook Page URL</label>
                    <input
                      type="text"
                      value={settings.socialFacebook || 'https://facebook.com/balajiarchitects'}
                      onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                      className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WEB PUSH NOTIFICATIONS */}
          {activeTab === 'push' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-[#281F19] pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-champagne" />
                  <h2 className="font-serif text-2xl text-[#FCFAF6]">Web Push Dispatch System</h2>
                </div>
                {browserPerm === 'granted' ? (
                  <span className="text-[11px] bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 px-2.5 py-1 font-medium flex items-center gap-1.5 rounded-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Alerts Active on this Device
                  </span>
                ) : (
                  <span className="text-[11px] bg-amber-950/40 text-amber-300 border border-amber-800/50 px-2.5 py-1 font-medium rounded-2xs">
                    {browserPerm === 'denied' ? 'Notifications Blocked in Browser' : 'Registration Pending'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A89F91] leading-relaxed max-w-2xl">
                When a customer places an order or submits an architectural quote, the server dispatches a VAPID web push directly to all registered administrative browsers.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleSendTestPush}
                  disabled={testPushing}
                  className="px-6 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-wider font-medium flex items-center gap-2 cursor-pointer transition-all rounded-xs shadow-xs"
                >
                  <Bell className="w-3.5 h-3.5" /> {testPushing ? 'Registering & Sending...' : 'Dispatch Test Notification'}
                </button>
                {pushResult && <span className="text-xs text-champagne font-medium">{pushResult}</span>}
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="bg-[#1D1714] border border-[#332821] p-6 sm:p-8 space-y-6 rounded-xs shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-champagne" />
                  <div>
                    <h2 className="font-serif text-2xl text-[#FCFAF6]">Security Audit Log</h2>
                    <span className="text-[11px] text-[#A89F91]">Immutable Traceability & Action Records</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-champagne/60 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search logs by action, operator, details..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:outline-hidden rounded-xs"
                    />
                  </div>

                  {/* Entity Filter */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-champagne/60" />
                    <select
                      value={entityFilter}
                      onChange={(e) => setEntityFilter(e.target.value)}
                      className="p-2 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
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
              <div className="overflow-x-auto max-h-[480px] overflow-y-auto border border-[#281F19] rounded-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-[#16110E] z-10">
                    <tr className="border-b border-[#281F19] text-[10px] uppercase tracking-widest text-champagne/90 font-medium">
                      <th className="p-3">Timestamp (IST)</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Entity</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#281F19] font-mono text-[11px]">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-[#7E7469] font-sans">
                          No audit records found matching the current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#251E1A]/60 transition-colors">
                          <td className="p-3 text-[#A89F91] whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </td>
                          <td className="p-3 text-[#FCFAF6] whitespace-nowrap font-medium">{log.adminEmail}</td>
                          <td className="p-3">
                            <span className="inline-block px-2 py-0.5 bg-[#14100D] border border-[#382D25] text-champagne font-medium text-[10px] uppercase tracking-wider rounded-2xs">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 text-[#D8CEBF]">{log.entity}</td>
                          <td className="p-3 text-[#A89F91] font-sans text-xs max-w-md break-words">
                            {log.details ? (
                              <span className="text-[#ECE5DC]">{JSON.stringify(log.details)}</span>
                            ) : (
                              <span className="text-[#7E7469]">—</span>
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
          <div className="p-4 bg-[#1D1714] border border-[#332821] flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xs shadow-xs">
            <span className="text-xs text-[#A89F91]">
              Changes update Supabase PostgreSQL immediately upon saving and take effect live across all pages.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest flex items-center gap-2 font-medium cursor-pointer shrink-0 transition-all rounded-xs shadow-xs"
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
