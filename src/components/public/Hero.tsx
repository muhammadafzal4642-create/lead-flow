import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Phone, CalendarCheck, ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';
import heroHvacTechnicianImg from '../../assets/images/hero_hvac_technician_1794122697811.jpg';

export const Hero: React.FC = () => {
  const { openQuoteModal, settings } = useLeadFlow();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900/50 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context kicker: unboxed clean text separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span>Licensed HVAC Contractor</span>
              <span aria-hidden="true">·</span>
              <span>TACLA# 48291E</span>
              <span aria-hidden="true">·</span>
              <span>Serving Greater Austin & Central Texas</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Reliable Heating & Cooling Solutions for Your Home.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Professional HVAC installation, repair and maintenance services designed to keep your home comfortable throughout the year. Experienced technicians, upfront flat-rate pricing, and prompt response times.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero overtime diagnostic surprises</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-day diagnostic dispatch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fully stocked service vehicles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean home floor runner guarantee</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Request a Free Estimate</span>
              </button>

              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              >
                <Phone className="w-5 h-5 text-blue-400" />
                <span>Call Our Team: {settings.phone}</span>
              </a>
            </div>

            {/* Emergency status banner */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>On-Call Techs Available Now · Average Dispatch Time: 45–60 Minutes</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Photography with Floating Proof Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-800">
              <img
                src={heroHvacTechnicianImg}
                alt="Licensed ArcticFlow HVAC Technician testing central cooling condenser unit"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const fallback = '/assets/images/hero_hvac_technician_1794122697811.jpg';
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom Scrim Content */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                      Certified Field Service
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Master Technician On-Site Diagnostics
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300">Diagnostic Fee</div>
                    <div className="text-base font-extrabold text-emerald-400 tabular-nums">
                      $89 <span className="text-xs font-normal text-slate-300">waived w/ repair</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust tag pill */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-blue-600 text-white px-3.5 py-1.5 rounded-lg shadow-lg text-xs font-bold border border-blue-400/40">
              <Award className="w-4 h-4" />
              <span>NATE Certified</span>
            </div>
          </div>

        </div>

        {/* 4-Item Trust Proof Grid Strip Below Split */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/30 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Licensed & Insured</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                Full commercial general liability & bonded protection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/30 text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Same-Day Dispatch</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                Rapid arrival for cooling & heating emergencies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/30 text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Flat-Rate Pricing</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                Transparent quote before any repair work commences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/30 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Satisfaction</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                1-year warranty on all replacement parts & labor.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
