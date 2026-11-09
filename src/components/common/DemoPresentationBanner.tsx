import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { LayoutDashboard, Globe, Sparkles, RefreshCw, KeyRound } from 'lucide-react';

export const DemoPresentationBanner: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    leads, 
    resetDemoData,
    isAdminAuthenticated
  } = useLeadFlow();

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-blue-400 tracking-wide uppercase text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>LeadFlow Demo System</span>
          </div>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-slate-300">
            Client Presentation for <strong className="text-white font-medium">ArcticFlow Heating & Cooling</strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setCurrentView('public')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                currentView === 'public'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all relative ${
                currentView === 'admin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Contractor Dashboard</span>
              {newLeadsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full font-bold text-[10px]">
                  {newLeadsCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Demo Controls */}
          <button
            onClick={resetDemoData}
            title="Reset demonstration data to initial baseline"
            className="hidden md:flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
