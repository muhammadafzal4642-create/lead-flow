import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Wrench } from 'lucide-react';
import { ServiceType } from '../../types';

export const ServicesPage: React.FC = () => {
  const { services, openQuoteModal } = useLeadFlow();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
              <span>Licensed HVAC Services</span>
              <span aria-hidden="true">·</span>
              <span>All Makes & Models</span>
              <span aria-hidden="true">·</span>
              <span>Central Texas</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Residential & Commercial HVAC Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent, upfront flat-rate pricing. Whether you need an emergency refrigerant repair, a whole-home heat pump replacement, or annual seasonal tune-ups, ArcticFlow technicians arrive equipped to solve your climate needs.
            </p>
          </div>
        </div>
      </div>

      {/* Services List Detailed Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {services.map((srv, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={srv.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Section */}
              <div className={`lg:col-span-5 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
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
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md">
                    Starting from ${srv.startingPrice}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`lg:col-span-7 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <div className="space-y-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {srv.turnaroundTime}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {srv.name}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {srv.fullDesc}
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {srv.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500">Service Investment</span>
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                      ${srv.startingPrice}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        {srv.priceUnit}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal(srv.name)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all"
                  >
                    <span>Request {srv.name} Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Guarantee Banner */}
      <div className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-700 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our 100% "Fixed Right or It's Free" Guarantee
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            If our repair fails to solve your heating or cooling issue during the warranty period, we will return and resolve it with zero diagnostic or service charges.
          </p>
          <div>
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
            >
              Get Started with a Free Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
