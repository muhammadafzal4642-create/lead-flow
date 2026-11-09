import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Flame, Phone, Mail, MapPin, Shield, ArrowUp, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPublicPage, openQuoteModal, setCurrentView, settings } = useLeadFlow();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Arctic<span className="text-blue-500">Flow</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              ArcticFlow Heating & Cooling is a premier demonstration contractor website developed by LeadFlow. Engineered to showcase high-conversion quote request funnels and dispatch workflows for HVAC business owners.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Texas Department of Licensing & Regulation: TACLA# 48291E</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setPublicPage('home');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPublicPage('services');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  HVAC Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPublicPage('about');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPublicPage('contact');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal()}
                  className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                >
                  Request a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: HVAC Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openQuoteModal('AC Repair')}
                  className="hover:text-white transition-colors"
                >
                  AC Repair & Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal('AC Installation')}
                  className="hover:text-white transition-colors"
                >
                  High-Efficiency AC Install
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal('Heating Repair')}
                  className="hover:text-white transition-colors"
                >
                  Furnace & Heat Pump Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal('HVAC Maintenance')}
                  className="hover:text-white transition-colors"
                >
                  Annual Maintenance Tune-Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal('Air Duct Cleaning')}
                  className="hover:text-white transition-colors"
                >
                  HEPA Air Duct Sanitization
                </button>
              </li>
              <li>
                <button
                  onClick={() => openQuoteModal('Emergency HVAC Service')}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                >
                  24/7 Emergency Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Dispatch</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{settings.phone}</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Emergency: {settings.emergencyPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contractor Presentation Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} ArcticFlow Heating & Cooling. Demonstration project built on LeadFlow architecture.</p>
            <p className="text-[11px] text-slate-600">
              Notice: All customer profiles, phone numbers, and addresses shown in this demonstration are fictional and provided for sales demonstration purposes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('admin')}
              className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
            >
              Access Contractor CRM Console
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
