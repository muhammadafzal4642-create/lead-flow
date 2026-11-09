import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { ShieldCheck, HeartHandshake, Award, CheckCircle2, User, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openQuoteModal } = useLeadFlow();

  const team = [
    {
      name: 'Marcus Vance',
      role: 'Founder & Master HVAC Contractor',
      credentials: '22 Years Experience · NATE Certified #89124 · TACLA Master License',
      bio: 'Marcus began in commercial refrigeration before founding ArcticFlow to bring high-standard engineering and transparent customer service to residential homeowners.',
      isDemo: true
    },
    {
      name: 'Elena Rostova',
      role: 'Operations & Dispatch Director',
      credentials: 'HVAC Dispatch & Fleet Logistics · Customer Advocacy Specialist',
      bio: 'Elena coordinates emergency technician routing and ensures our customers receive prompt arrival updates and transparent quote confirmations.',
      isDemo: true
    },
    {
      name: 'David Chen',
      role: 'Senior Field Technician & Heat Pump Specialist',
      credentials: 'Inverter Diagnostics Specialist · EPA Universal Certified',
      bio: 'Specializing in complex inverter and variable-speed system diagnostics, Dave is known across Central Texas for solving stubborn intermittent electrical faults.',
      isDemo: true
    },
    {
      name: 'Sarah Jenkins',
      role: 'Customer Service & Comfort Advisor',
      credentials: 'Indoor Air Quality Specialist · Rebate Program Coordinator',
      bio: 'Sarah helps homeowners navigate utility energy rebates, financing programs, and custom filtration solutions for asthma and allergen reduction.',
      isDemo: true
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              About ArcticFlow Heating & Cooling
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Built on Craftsmanship, Honesty & Respect for Your Home
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We founded ArcticFlow on a straightforward principle: treat every customer's home with the same precision, honesty, and care we would expect for our own families.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Our Philosophy
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why We Refuse High-Pressure Sales Tactics
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Too many homeowners experience HVAC service as an ordeal: an expensive surprise bill, a rushed technician who refuses to explain what went wrong, or a pushy sales pitch insisting a minor electrical part requires an entire $10,000 replacement.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              At ArcticFlow, our technicians are certified problem-solvers, not commissioned salespeople. We provide photos of broken components, digital gauge readings, and honest options before asking for your authorization.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors"
              >
                Schedule with Our Team
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Our 4 Core Values
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">1. Total Transparency</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Written flat-rate pricing upfront. No hidden travel surcharges or surprise billing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">2. Respect for Your Living Space</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Shoe covers, heavy floor runners, and a clean workspace guarantee every single time.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">3. Technical Precision</h4>
                  <p className="text-xs text-slate-600 mt-0.5">NATE-certified diagnostics adhering to manufacturer electrical specifications.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">4. Community Accountability</h4>
                  <p className="text-xs text-slate-600 mt-0.5">We live and raise our families in the Central Texas communities we serve.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Professional Service Approach: 21-point protocol */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              The ArcticFlow Protocol
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Stage Diagnostic Workflow
            </h2>
            <p className="text-base text-slate-600">
              How we inspect, troubleshoot, and guarantee every residential HVAC system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-blue-600">Stage 01</div>
              <h3 className="text-base font-bold text-slate-900">Arrival & Home Protection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technician arrives in uniform with photo ID, dons protective boot covers, and inspects the indoor thermostat and filter.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-blue-600">Stage 02</div>
              <h3 className="text-base font-bold text-slate-900">Comprehensive Diagnostics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We test compressor amperage, capacitor capacitance, static air pressure, refrigerant subcooling/superheat, and electrical contacts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-blue-600">Stage 03</div>
              <h3 className="text-base font-bold text-slate-900">Digital Estimate Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You receive a clear breakdown on our tablet with photos and options. Nothing begins without your explicit signed approval.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-blue-600">Stage 04</div>
              <h3 className="text-base font-bold text-slate-900">Precision Repair & Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                OEM parts installed, system tested across a full cooling/heating cycle, and verified for peak thermal delta and airflow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with Clearly Identified Demo Profiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-3 mb-14">
          <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Leadership & Technicians
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet the Demonstration Team
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            (The team profiles below are realistic demonstration personas created to show prospective contractor clients how staff expertise is highlighted on a LeadFlow website.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                  <div className="text-xs text-blue-600 font-semibold mt-0.5">{member.role}</div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {member.credentials}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Demo Team Profile</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
