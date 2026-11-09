import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { MapPin, Search, CheckCircle2, Phone, Compass, ArrowRight } from 'lucide-react';

export const ServiceAreaSection: React.FC = () => {
  const { settings, openQuoteModal } = useLeadFlow();
  const [zipInput, setZipInput] = useState('');
  const [zipCheckResult, setZipCheckResult] = useState<'checked_in' | 'checked_out' | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    if (settings.serviceZipCodes.includes(cleanZip)) {
      setZipCheckResult('checked_in');
    } else {
      setZipCheckResult('checked_out');
    }
  };

  return (
    <section className="py-20 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Service Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Serving Central Texas Homeowners & Businesses
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our dispatch fleet is strategically positioned across Travis, Williamson, and Hays counties for prompt same-day heating and air conditioning service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive ZIP Code Checker Card */}
          <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Instant Service Availability Checker</span>
              </div>
              <p className="text-xs text-slate-500">
                Enter your 5-digit US ZIP code to verify immediate same-day dispatch coverage.
              </p>
            </div>

            <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value.replace(/[^0-9]/g, ''));
                    setZipCheckResult(null);
                  }}
                  placeholder="Enter ZIP code (e.g., 78749)"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Check Coverage</span>
              </button>
            </form>

            {/* Check Results */}
            {zipCheckResult === 'checked_in' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-bold">
                      Coverage Confirmed! ZIP {zipInput} is in our Primary Service Zone.
                    </p>
                    <p className="text-xs text-emerald-800">
                      Our technicians provide same-day diagnostics and priority scheduling in your neighborhood.
                    </p>
                    <button
                      onClick={() => openQuoteModal()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg shadow-sm transition-all"
                    >
                      <span>Book Service in {zipInput}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {zipCheckResult === 'checked_out' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-bold">
                      Extended Territory for ZIP {zipInput}
                    </p>
                    <p className="text-xs text-amber-800">
                      We regularly accommodate projects in surrounding communities! Please reach out to our dispatch team directly to confirm technician availability.
                    </p>
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 px-3 py-1.5 rounded-lg shadow-sm transition-all"
                    >
                      <span>Call Dispatch: {settings.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Sample ZIP tips */}
            <div className="text-xs text-slate-500 pt-1">
              <span>Popular served ZIP codes: </span>
              <span className="font-mono text-slate-700">78701, 78704, 78731, 78749, 78613, 78660</span>
            </div>
          </div>

          {/* Communities List & Guarantee */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Primary Municipalities & Communities
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium text-slate-700">
                {settings.serviceCities.map((city, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{city}, TX</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed">
                Emergency dispatch is on call 24 hours a day, 7 days a week including federal holidays across all listed municipalities.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
