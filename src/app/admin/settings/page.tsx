'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Shield, Bell, Save, Check, History, RefreshCw, Radio } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SiteSettings, AuditLog } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testPushing, setTestPushing] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);

  const loadSettingsAndLogs = async () => {
    try {
      const [setRes, logRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/audit-logs'),
      ]);

      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.settings);
      }
      if (logRes.ok) {
        const l = await logRes.json();
        setLogs(l.logs || []);
      }
    } catch (e) {
      console.error(e);
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

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        loadSettingsAndLogs();
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestPush = async () => {
    setTestPushing(true);
    setPushResult(null);
    try {
      // Create a test client notification or trigger via sw
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Balaji Architect & Interiors Live Dispatch', {
          body: 'Realtime order push notification verified.',
          icon: '/favicon.ico',
        });
        setPushResult('Test notification dispatched to your browser.');
      } else {
        setPushResult('Please grant notification permissions first in browser.');
      }
    } catch (err: any) {
      setPushResult(err.message || 'Notification error');
    } finally {
      setTestPushing(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-warmgray">Loading studio configuration...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Configuration</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Studio Settings & Audit</h1>
          </div>
          <button
            onClick={loadSettingsAndLogs}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload Config
          </button>
        </div>

        {/* Studio Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-2xl text-espresso">Atelier Profile & Tax Rules</h2>
            </div>
            {savedSuccess && (
              <span className="text-xs text-green-800 bg-green-50 px-3 py-1 border border-green-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Settings Saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Brand / Atelier Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Tagline / Mission</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Studio Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Direct Telephone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Physical Studio Address</label>
              <input
                type="text"
                value={settings.studioAddress}
                onChange={(e) => setSettings({ ...settings, studioAddress: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Standard GST Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRatePercent}
                onChange={(e) => setSettings({ ...settings, taxRatePercent: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Standard Freight Fee (₹)</label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Complimentary Freight Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 bg-canvas border border-atelier"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-warmgray font-medium">Currency Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full p-2.5 bg-canvas border border-atelier font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Studio Settings'}
            </button>
          </div>
        </form>

        {/* Web Push Notification Diagnostic */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-atelier pb-4">
            <Bell className="w-5 h-5 text-bronze" />
            <h2 className="font-serif text-2xl text-espresso">Web Push Dispatch System</h2>
          </div>
          <p className="text-xs text-warmgray leading-relaxed max-w-xl">
            When a client completes an online order or submits an architectural quote request, registered admin browser devices receive instant background push notifications.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleSendTestPush}
              disabled={testPushing}
              className="px-5 py-2.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider font-medium"
            >
              Dispatch Test Notification
            </button>
            {pushResult && <span className="text-xs text-bronze">{pushResult}</span>}
          </div>
        </div>

        {/* Security Audit Log */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-bronze" />
              <h2 className="font-serif text-2xl text-espresso">Security Audit Log</h2>
            </div>
            <span className="text-xs text-warmgray">Immutable Traceability</span>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-canvas/40">
                    <td className="p-3 text-warmgray whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-espresso whitespace-nowrap">{log.adminEmail}</td>
                    <td className="p-3 text-timber font-medium">{log.action}</td>
                    <td className="p-3 text-warmgray">{log.entity}</td>
                    <td className="p-3 text-warmgray font-sans text-xs">
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
