import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { DollarSign, UserCheck, Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { openQuoteModal } = useLeadFlow();

  const reasons = [
    {
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
      title: 'Upfront Flat-Rate Pricing',
      description: 'You approve the exact written quote before our technicians touch a single bolt. No ambiguous hourly rates or hidden after-hours markup.'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      title: 'Licensed NATE-Certified Techs',
      description: 'Rigorous ongoing manufacturer training across Daikin, Carrier, Lennox, Bosch, and Trane systems ensures precision diagnostics every time.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      title: 'Clean Home Protocol',
      description: 'Technicians always wear sanitary shoe booties, lay protective work floor runners, and leave your mechanical room cleaner than they found it.'
    },
    {
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      title: 'Fully Stocked Mobile Fleet',
      description: 'Our service vans carry hundreds of universal capacitors, contactors, fan motors, and pressure switches to complete over 85% of repairs immediately.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: '1-Year Parts & Labor Guarantee',
      description: 'If a component we installed fails within 365 days, we replace it at zero charge to you—no arguments, no service call fee.'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              The ArcticFlow Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Heating & Cooling Done With Integrity and Craftsmanship
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              When your air conditioner quits during a 100°F summer afternoon or your furnace won’t ignite during an icy cold front, you need a dependable contractor who respects your time, home, and budget.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              We built our local reputation on honest advice: if a system only needs a $180 capacitor, we’ll never try to push a $8,000 replacement.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
              >
                <span>Request a Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200 ${
                  idx === 4 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
