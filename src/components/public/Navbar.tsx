import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Phone, Menu, X, Flame } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { publicPage, setPublicPage, openQuoteModal, settings } = useLeadFlow();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'services' | 'about' | 'contact') => {
    setPublicPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight">
            Arctic<span className="text-blue-600">Flow</span>
          </span>
        </button>

        {/* Zone 2: 4 Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 relative py-1 ${
              publicPage === 'home' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Home
            {publicPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 relative py-1 ${
              publicPage === 'services' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Services
            {publicPage === 'services' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 relative py-1 ${
              publicPage === 'about' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            About
            {publicPage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-600 relative py-1 ${
              publicPage === 'contact' ? 'text-blue-600 font-bold' : ''
            }`}
          >
            Contact
            {publicPage === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Clickable Phone */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
            className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span>{settings.phone}</span>
          </a>

          <button
            onClick={() => openQuoteModal()}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-600/30 transition-all hover:shadow-md whitespace-nowrap shrink-0"
          >
            Request a Free Estimate
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                publicPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                publicPage === 'services' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                publicPage === 'about' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                publicPage === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 rounded-xl"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call Team: {settings.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-sm"
            >
              Request a Free Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
