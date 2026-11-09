import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { ArrowRight, Check, Zap, Wrench, ThermometerSnowflake, Flame, Wind, Siren } from 'lucide-react';
import { ServiceType } from '../../types';

export const ServiceHighlights: React.FC = () => {
  const { services, openQuoteModal, setPublicPage } = useLeadFlow();

  const getServiceIcon = (name: ServiceType) => {
    switch (name) {
      case 'AC Repair':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'AC Installation':
        return <ThermometerSnowflake className="w-5 h-5 text-sky-600" />;
      case 'Heating Repair':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'HVAC Maintenance':
        return <Zap className="w-5 h-5 text-emerald-600" />;
      case 'Air Duct Cleaning':
        return <Wind className="w-5 h-5 text-teal-600" />;
      case 'Emergency HVAC Service':
        return <Siren className="w-5 h-5 text-rose-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Complete Heating & Cooling Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Expert HVAC Craftsmanship For Every Season
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From emergency repairs in peak summer heatwaves to precision installations of high-efficiency heat pumps, our licensed technicians keep your home comfortable and energy-efficient.
          </p>
        </div>

        {/* 6-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Badge if popular */}
                {srv.popular && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    Most Requested
                  </div>
                )}

                {/* Starting Price Overlay */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs text-slate-200">Starting from </span>
                  <span className="text-lg font-extrabold tabular-nums">${srv.startingPrice}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      {getServiceIcon(srv.name)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {srv.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {srv.shortDesc}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 border-t border-slate-100 pt-3">
                    {srv.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal(srv.name)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-900 hover:text-white bg-slate-100 hover:bg-blue-600 rounded-xl transition-all group/btn"
                  >
                    <span>Request {srv.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full catalogue link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setPublicPage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Explore In-Depth Services & Equipment Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
