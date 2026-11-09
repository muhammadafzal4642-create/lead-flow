import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ServiceType } from '../../types';

export const ContactPage: React.FC = () => {
  const { settings, submitQuoteRequest, showToast, openQuoteModal } = useLeadFlow();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'AC Repair' as ServiceType,
    message: '',
    zipCode: '78749'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      showToast('Missing Fields', 'Please complete all required fields.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      submitQuoteRequest({
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType,
        problemDescription: form.message,
        propertyType: 'Single Family Home',
        urgency: 'Within 24-48 Hours',
        preferredDate: new Date(Date.now() + 86400000).toISOString().substring(0, 10),
        preferredTime: 'Morning (8:00 AM - 12:00 PM)',
        zipCode: form.zipCode
      });

      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Contact & Dispatch
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Get in Touch with ArcticFlow
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Have an urgent HVAC inquiry or need to discuss equipment options? Reach out to our Central Texas dispatch office or complete our direct message form below.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Demonstration Disclaimer Bar */}
        <div className="mb-12 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Demonstration Notice:</strong> The contact details, address, and phone numbers below are realistic sample values configured for this LeadFlow website demo. Submitting the form below will save a live lead to the demonstration contractor dashboard!
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Send Our Team a Message</h2>
              <p className="text-xs text-slate-500 mt-1">
                Typical reply time during business hours: under 30 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">Thank You! Message Dispatched.</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been submitted and registered in the contractor LeadFlow CRM. Our service coordinator is reviewing your request.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        serviceType: 'AC Repair',
                        message: '',
                        zipCode: '78749'
                      });
                    }}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sarah Mitchell"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(512) 555-0100"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Service Category</label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value as ServiceType })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="AC Repair">AC Repair</option>
                      <option value="AC Installation">AC Installation</option>
                      <option value="Heating Repair">Heating Repair</option>
                      <option value="HVAC Maintenance">HVAC Maintenance</option>
                      <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                      <option value="Emergency HVAC Service">Emergency HVAC Service</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">How Can We Help? *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your heating, cooling, or duct system issue..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Need instant scheduling? Try the{' '}
                    <button
                      type="button"
                      onClick={() => openQuoteModal(form.serviceType)}
                      className="text-blue-600 font-semibold underline"
                    >
                      Multi-Step Quote Form
                    </button>
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5">
              <h3 className="text-base font-bold text-slate-900">
                Dispatch Headquarters
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Office & Facility</span>
                    <span>{settings.officeAddress}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">(Fictional Demo Address)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Primary Phone</span>
                    <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} className="text-blue-600 hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">24/7 Emergency Dispatch</span>
                    <a href={`tel:${settings.emergencyPhone.replace(/[^0-9]/g, '')}`} className="text-rose-600 hover:underline">
                      {settings.emergencyPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Customer Support</span>
                    <span>{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Business Hours</span>
                    <span>Mon - Fri: {settings.businessHours.weekdays}</span>
                    <span className="block">Sat: {settings.businessHours.saturday}</span>
                    <span className="block font-medium text-emerald-700">Sun: {settings.businessHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Map Representation */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
                <span>Central Texas Dispatch Zone Map</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Mobile Fleet Active
                </span>
              </div>
              <div className="relative h-64 bg-slate-100 flex items-center justify-center p-4">
                {/* Clean SVG Vector Map Grid */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 400 240">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Rivers / Highways */}
                  <path d="M 50 20 Q 150 120 350 220" fill="none" stroke="#93c5fd" strokeWidth="4" />
                  <path d="M 20 180 Q 200 130 380 60" fill="none" stroke="#cbd5e1" strokeWidth="3" />
                  {/* Service zone radius circles */}
                  <circle cx="200" cy="120" r="85" fill="#3b82f6" fillOpacity="0.12" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="200" cy="120" r="45" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2" />
                  {/* Headquarters Pin */}
                  <circle cx="200" cy="120" r="7" fill="#dc2626" />
                  <circle cx="200" cy="120" r="14" fill="#dc2626" fillOpacity="0.25" />
                  {/* Satellites */}
                  <circle cx="150" cy="90" r="4" fill="#2563eb" />
                  <circle cx="260" cy="150" r="4" fill="#2563eb" />
                  <circle cx="240" cy="80" r="4" fill="#2563eb" />
                </svg>

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200 text-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="font-bold">Main Dispatch Center</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">30-Mile Immediate Radius</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
