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
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings, AuditLog } from '@/types';

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
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [testPushing, setTestPushing] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);
  const [browserPerm, setBrowserPerm] = useState<NotificationPermission | 'unsupported'>('default');

  // Audit Log UI Filter States
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
        fetch('/api/admin/settings', { headers: { 'Cache-Control': 'no-cache' } }),
        fetch('/api/admin/audit-logs', { headers: { 'Cache-Control': 'no-cache' } }),
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

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Configuration & Security</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Studio Settings & Audit</h1>
          </div>
          <button
            onClick={loadSettingsAndLogs}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Live Config
          </button>
        </div>

        {/* Global Feedback Notifications */}
        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Studio settings successfully saved and persisted to Supabase database.</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{saveError}</span>
          </div>
        )}

        {/* Studio Settings Master Form */}
        <form onSubmit={handleSaveSettings} className="bg-surface border border-atelier p-6 sm:p-8 space-y-10">
          {/* Section 1: Atelier Profile */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-atelier pb-3">
              <Building2 className="w-4 h-4 text-bronze" />
              <h2 className="font-serif text-xl text-espresso">1. Atelier Identity & Principal Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="uppercase tracking-wider text-warmgray font-medium">Brand / Atelier Name</label>
                <input
                  type="text"
                  value={settings.brandName || ''}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="Balaji Architect & Interiors"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Principal Architect</label>
                <input
                  type="text"
                  value={settings.architectName || ''}
                  onChange={(e) => setSettings({ ...settings, architectName: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="Vikas Sir (Principal Architect)"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="uppercase tracking-wider text-warmgray font-medium">Tagline / Atelier Philosophy</label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="Crafted spaces, luxury architecture, and considered materials for timeless living."
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Established Year</label>
                <input
                  type="text"
                  value={settings.establishedYear || '2014'}
                  onChange={(e) => setSettings({ ...settings, establishedYear: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="2014"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Google Rating / Trust Metric</label>
                <input
                  type="text"
                  value={settings.googleRating || '★ 5.0 (22 Google Reviews)'}
                  onChange={(e) => setSettings({ ...settings, googleRating: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="★ 5.0 (22 Google Reviews)"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Operating Studio */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-atelier pb-3">
              <Phone className="w-4 h-4 text-bronze" />
              <h2 className="font-serif text-xl text-espresso">2. Direct Inquiries & Studio Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Official Studio Email</label>
                <input
                  type="email"
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="atelier@balaji-interior.com"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Direct Telephone</label>
                <input
                  type="text"
                  value={settings.contactPhone || ''}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="+91 70029 48484"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">WhatsApp Direct Line</label>
                <input
                  type="text"
                  value={settings.whatsappNumber || '+91 70029 48484'}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="+91 70029 48484"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="uppercase tracking-wider text-warmgray font-medium">Physical Studio Address</label>
                <input
                  type="text"
                  value={settings.studioAddress || ''}
                  onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Studio Operating Hours</label>
                <input
                  type="text"
                  value={settings.businessHours || 'Mon - Sat: 10:00 AM - 7:00 PM (IST)'}
                  onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="Mon - Sat: 10:00 AM - 7:00 PM (IST)"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">City</label>
                <input
                  type="text"
                  value={settings.city || 'Guwahati'}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">State / Province</label>
                <input
                  type="text"
                  value={settings.state || 'Assam'}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Pincode</label>
                <input
                  type="text"
                  value={settings.pincode || '781040'}
                  onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Fiscal, GST, & Freight Logistics */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-atelier pb-3">
              <Truck className="w-4 h-4 text-bronze" />
              <h2 className="font-serif text-xl text-espresso">3. Fiscal, GST & Freight Logistics</h2>
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

          {/* Section 4: Social Media & Global Presence */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-atelier pb-3">
              <Globe className="w-4 h-4 text-bronze" />
              <h2 className="font-serif text-xl text-espresso">4. Social Media & Global Presence</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Instagram Atelier URL</label>
                <input
                  type="text"
                  value={settings.socialInstagram || ''}
                  onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="https://instagram.com/balajiatelier"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Pinterest Portfolio URL</label>
                <input
                  type="text"
                  value={settings.socialPinterest || ''}
                  onChange={(e) => setSettings({ ...settings, socialPinterest: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="https://pinterest.com/balajiatelier"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">LinkedIn Practice URL</label>
                <input
                  type="text"
                  value={settings.socialLinkedin || ''}
                  onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="https://linkedin.com/company/balaji-atelier"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Facebook Page URL</label>
                <input
                  type="text"
                  value={settings.socialFacebook || 'https://facebook.com/balajiarchitects'}
                  onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                  className="w-full p-2.5 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  placeholder="https://facebook.com/balajiarchitects"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Public Announcement Banner */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-atelier pb-3">
              <Megaphone className="w-4 h-4 text-bronze" />
              <h2 className="font-serif text-xl text-espresso">5. Public Announcement Banner</h2>
            </div>

            <div className="space-y-4 text-xs">
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
                  Display Global Announcement Bar on Header
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
                    placeholder="Complimentary Material Advisory Sessions Available for Q3/Q4 Architectural Commissions"
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
                    placeholder="/quote"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-atelier flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-warmgray">
              All modifications are written directly to Supabase <code className="bg-canvas px-1.5 py-0.5 border border-atelier">site_settings</code> and broadcast live.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium self-end sm:self-auto cursor-pointer"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Persisting to Database...' : 'Save Studio Settings'}
            </button>
          </div>
        </form>

        {/* Web Push Notification Diagnostic */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-4">
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

        {/* Security Audit Log with Search & Filter */}
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
      </div>
    </AdminLayout>
  );
}
