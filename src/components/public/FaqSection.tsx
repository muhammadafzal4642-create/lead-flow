import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { useLeadFlow } from '../../context/LeadFlowContext';

export const FaqSection: React.FC = () => {
  const { settings, openQuoteModal } = useLeadFlow();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does an HVAC diagnostic inspection cost?',
      a: 'Our comprehensive diagnostic fee is $89 for standard residential systems. A certified technician performs a full electrical, refrigerant, and mechanical inspection and provides a flat-rate written quote. If you proceed with the repair on the same visit, the $89 diagnostic fee is credited directly toward your total invoice.'
    },
    {
      q: 'How quickly can an ArcticFlow technician arrive at my home?',
      a: 'For urgent cooling and heating failures, we typically dispatch within 45 to 90 minutes. For scheduled maintenance and quote consultations, you can pick a convenient 4-hour morning, afternoon, or evening arrival window so you never have to wait around all day.'
    },
    {
      q: 'Should I repair or replace my existing air conditioning system?',
      a: 'A good rule of thumb is the "Rule of 5,000": multiply the age of your system by the repair cost. If the result exceeds $5,000 and the unit uses outdated R-22 Freon, replacement is generally the more economical investment. We provide transparent pros and cons without sales pressure.'
    },
    {
      q: 'Do you offer financing options for new heat pumps and AC systems?',
      a: 'Yes. We partner with established home-improvement lenders offering 0% APR promotional financing for 12 to 24 months for qualified homeowners, as well as extended low-monthly-payment options up to 84 months. We also handle local electric utility rebate filings.'
    },
    {
      q: 'How often should residential HVAC systems be serviced?',
      a: 'We recommend preventative service twice per year: an air conditioning tune-up in spring before peak heat, and a heating safety inspection in autumn before temperatures drop. Regular maintenance preserves energy efficiency and prevents up to 95% of catastrophic compressor burnouts.'
    },
    {
      q: 'What warranties are included with your repair work and installations?',
      a: 'All our repairs carry a full 1-year parts and labor guarantee. New full-system installations include a 10-year manufacturer equipment warranty and our ArcticFlow 2-year dedicated workmanship guarantee.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clear Answers to Your HVAC Questions
          </h2>
          <p className="text-base text-slate-600">
            Have questions before requesting an estimate? Here is what Central Texas homeowners ask us most often.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have a specific equipment question?</div>
              <div className="text-xs text-slate-600">Speak directly with an on-call service specialist today.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
            <button
              onClick={() => openQuoteModal()}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Request Free Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
