'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, RefreshCw, Filter, Clock, Activity, FileText, ShoppingBag, Package } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { AuditLog } from '@/types';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>('ALL');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs?limit=150');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error('Failed to load audit logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filterAction === 'ALL') return true;
    return log.action.includes(filterAction);
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-medium">System Security & Operations</span>
              <span className="px-2 py-0.5 bg-champagne/15 text-champagne text-[9px] uppercase tracking-wider font-semibold rounded-2xs border border-champagne/30">
                Immutable Trail
              </span>
            </div>
            <h1 className="font-serif text-3xl text-[#FCFAF6] font-light mt-1">Audit Logs & Activity Stream</h1>
            <p className="text-xs text-[#A89F91]">Authoritative record of mutations, logins, and operational actions.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadLogs}
              className="p-2.5 bg-[#1D1714] border border-[#332821] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-xs shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-champagne ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {['ALL', 'LOGIN', 'ORDER', 'PRODUCT', 'QUOTE', 'EMPLOYEE', 'SETTINGS'].map((action) => (
            <button
              key={action}
              onClick={() => setFilterAction(action)}
              className={`px-3 py-1.5 rounded-xs uppercase tracking-wider text-[11px] font-medium transition-colors ${
                filterAction === action
                  ? 'bg-champagne text-[#100C0A]'
                  : 'bg-[#1D1714] text-[#A89F91] border border-[#332821] hover:text-[#FCFAF6]'
              }`}
            >
              {action === 'ALL' ? 'All Activity' : action}
            </button>
          ))}
        </div>

        {/* Logs Table */}
        <div className="bg-[#16110E] border border-[#281F19] rounded-xs overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center space-y-2">
              <div className="w-6 h-6 border-2 border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs uppercase tracking-wider text-[#A89F91]">Retrieving system audit trail...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Activity className="w-8 h-8 text-[#A89F91] mx-auto stroke-1" />
              <p className="font-serif text-lg text-[#FCFAF6]">No activity recorded</p>
              <p className="text-xs text-[#7E7469]">Operational mutations will appear here in realtime.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#281F19]">
              {filteredLogs.map((l) => (
                <div key={l.id} className="p-4 hover:bg-[#1D1714] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-2xs ${
                          l.action.includes('DELETE')
                            ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                            : l.action.includes('CREATE') || l.action.includes('SUCCESS')
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                        }`}
                      >
                        {l.action}
                      </span>
                      <span className="text-[#FCFAF6] font-medium">{l.entity}</span>
                      {l.entityId && <span className="text-[#7E7469] font-mono text-[10px]">#{l.entityId}</span>}
                    </div>

                    <p className="text-[#A89F91] text-[11px]">
                      By <span className="text-[#FCFAF6]">{l.adminEmail || 'System'}</span>
                      {l.details && typeof l.details === 'object' ? ` • ${JSON.stringify(l.details)}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[#7E7469] text-[11px] whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(l.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
