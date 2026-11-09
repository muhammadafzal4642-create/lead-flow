import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { loginAdmin, setCurrentView } = useLeadFlow();
  const [password, setPassword] = useState('arcticflow2026');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('arcticflow2026');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              LeadFlow Contractor CRM
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Demonstration Admin Access
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              This protected portal demonstrates how ArcticFlow Heating & Cooling manages customer inquiries, dispatches technicians, and tracks sales pipelines.
            </p>
          </div>

          {/* Quick Demo Info Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              <span>Demo Presentation Password:</span>
            </div>
            <div className="font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-blue-700 font-bold text-center">
              arcticflow2026
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1 text-left">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter demo password"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-center font-mono"
              />
              {error && (
                <p className="text-rose-500 text-xs text-center pt-1">
                  Invalid password. Use <code className="font-bold">arcticflow2026</code>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Unlock Contractor Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                One-Click Instant Demo Login
              </button>
            </div>
          </form>

          <div className="pt-2">
            <button
              onClick={() => setCurrentView('public')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Return to Public Customer Website
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
