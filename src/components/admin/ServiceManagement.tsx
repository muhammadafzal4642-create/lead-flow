import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Edit3, Check, DollarSign, Clock, Sparkles, X } from 'lucide-react';
import { HvacService } from '../../types';

export const ServiceManagement: React.FC = () => {
  const { services, updateService, setCurrentView, setPublicPage } = useLeadFlow();
  const [editingService, setEditingService] = useState<HvacService | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService.id, editingService);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro info box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">HVAC Service Catalogue & Pricing</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify base pricing and descriptions here. Changes update immediately across all public website cards and quote estimators!
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('public');
            setPublicPage('services');
          }}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
        >
          View Public Catalogue →
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Image Header */}
              <div className="relative h-36 bg-slate-100">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const fallback = '/assets/images/service_ac_repair_1794122698686.jpg';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  ${srv.startingPrice}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{srv.name}</h4>
                  {srv.popular && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Base Investment:</span>
                    <span className="font-bold text-slate-900 font-mono tabular-nums">
                      ${srv.startingPrice} <span className="text-[10px] text-slate-400 font-normal">({srv.priceUnit})</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Turnaround:</span>
                    <span className="font-medium text-slate-900">{srv.turnaroundTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit button */}
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setEditingService(srv)}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-colors shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Description & Pricing</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase">Service Catalogue</span>
                <h3 className="text-base font-bold text-white">Edit: {editingService.name}</h3>
              </div>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Starting Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Price Unit / Scope</label>
                  <input
                    type="text"
                    value={editingService.priceUnit}
                    onChange={(e) => setEditingService({ ...editingService, priceUnit: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Turnaround / Dispatch Guarantee</label>
                <input
                  type="text"
                  value={editingService.turnaroundTime}
                  onChange={(e) => setEditingService({ ...editingService, turnaroundTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Short Summary (Homepage)</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Full Description (Services Page)</label>
                <textarea
                  rows={3}
                  value={editingService.fullDesc}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.popular || false}
                    onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Feature as "Most Requested" service</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Save to Public Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
