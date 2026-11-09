import React, { useState, useEffect } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Home,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { ServiceType, PropertyType, UrgencyLevel, TimeWindow } from '../../types';

export const QuoteModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    closeQuoteModal, 
    selectedQuoteService, 
    submitQuoteRequest,
    setCurrentView,
    setAdminTab,
    services
  } = useLeadFlow();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'AC Repair' as ServiceType,
    problemDescription: '',
    propertyType: 'Single Family Home' as PropertyType,
    urgency: 'Within 24-48 Hours' as UrgencyLevel,
    preferredDate: '',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)' as TimeWindow,
    zipCode: '',
    address: '',
    privacyConsent: true
  });

  // Pre-fill default tomorrow date and selected service
  useEffect(() => {
    if (isQuoteModalOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().substring(0, 10);
      
      setFormData((prev) => ({
        ...prev,
        preferredDate: prev.preferredDate || dateStr,
        serviceType: selectedQuoteService || prev.serviceType || 'AC Repair'
      }));
      setStep(1);
      setSubmittedLead(null);
      setErrors({});
    }
  }, [isQuoteModalOpen, selectedQuoteService]);

  if (!isQuoteModalOpen) return null;

  // Validation routines per step
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please provide a 10-digit US telephone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.problemDescription.trim()) {
      errs.problemDescription = 'Please describe what you are experiencing with your HVAC unit.';
    } else if (formData.problemDescription.trim().length < 10) {
      errs.problemDescription = 'Please provide at least 10 characters so our technician can prepare.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred service date';
    }
    if (!formData.zipCode.trim()) {
      errs.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      errs.zipCode = 'Must be a 5-digit US ZIP code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as any);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      setErrors({ privacyConsent: 'You must accept the privacy policy to proceed.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = submitQuoteRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        problemDescription: formData.problemDescription,
        propertyType: formData.propertyType,
        urgency: formData.urgency,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        zipCode: formData.zipCode,
        address: formData.address
      });

      setIsSubmitting(false);
      setSubmittedLead(created);
    }, 450);
  };

  const handleGoToAdmin = () => {
    closeQuoteModal();
    setCurrentView('admin');
    setAdminTab('leads');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold tracking-widest text-blue-400 uppercase">
              ArcticFlow Estimate Dispatch
            </div>
            <h3 className="text-lg font-bold text-white">
              {submittedLead ? 'Enquiry Confirmed' : 'Request a Free HVAC Estimate'}
            </h3>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator (Hidden if submitted) */}
        {!submittedLead && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-blue-600 font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  1
                </span>
                <span className="hidden sm:inline">Contact</span>
              </div>
              <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-blue-600 font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <span className="hidden sm:inline">Service</span>
              </div>
              <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-blue-600 font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span className="hidden sm:inline">Schedule</span>
              </div>
              <div className="h-0.5 w-6 sm:w-12 bg-slate-200" />
              <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-blue-600 font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  4
                </span>
                <span className="hidden sm:inline">Confirm</span>
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submittedLead ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center space-y-6 py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                  Quote Request Dispatched
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Thank You, {submittedLead.fullName}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your HVAC enquiry has been registered in the ArcticFlow dispatch system under tracking reference:
                </p>
                <div className="inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-xl font-mono text-lg font-bold text-slate-900">
                  {submittedLead.referenceCode}
                </div>
              </div>

              {/* What happens next */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 max-w-lg mx-auto">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  What Happens Next:
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[10px]">1</div>
                    <span>Instant SMS confirmation sent to {submittedLead.phone}.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[10px]">2</div>
                    <span>Service dispatch confirms assigned technician window for {submittedLead.preferredDate}.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[10px]">3</div>
                    <span>Technician sends 30-minute GPS arrival notification prior to arrival.</span>
                  </div>
                </div>
              </div>

              {/* CONTRACTOR DEMO FEATURE: Direct Link to Contractor Dashboard */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGoToAdmin}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View This Lead in Contractor CRM Dashboard</span>
                </button>
                <button
                  onClick={closeQuoteModal}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP FORM */
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              
              {/* STEP 1: Customer Information */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Step 1: Your Contact Information</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Where should our technician reach you with quote details?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Full Name *</span>
                        {errors.fullName && <span className="text-rose-500 text-[11px] font-normal">{errors.fullName}</span>}
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Henderson"
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span>Phone Number *</span>
                          {errors.phone && <span className="text-rose-500 text-[11px] font-normal">{errors.phone}</span>}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(512) 555-0182"
                          className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                            errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-blue-600'
                          }`}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span>Email Address *</span>
                          {errors.email && <span className="text-rose-500 text-[11px] font-normal">{errors.email}</span>}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="j.henderson@example.com"
                          className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                            errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-blue-600'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Service Information */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Step 2: Service Requirements</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Tell us about your system and what symptoms you notice.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Primary HVAC Service</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} (from ${s.startingPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Property Type</label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option value="Single Family Home">Single Family Home</option>
                          <option value="Townhouse / Condo">Townhouse / Condo</option>
                          <option value="Commercial Property">Commercial Property</option>
                          <option value="Multi-Family / Rental">Multi-Family / Rental</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Urgency Level</label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value as UrgencyLevel })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option value="Emergency - Today">Emergency - Today</option>
                          <option value="Within 24-48 Hours">Within 24-48 Hours</option>
                          <option value="This Week">This Week</option>
                          <option value="Flexible / Planning">Flexible / Planning</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Describe Problem Symptoms *</span>
                        {errors.problemDescription && (
                          <span className="text-rose-500 text-[11px] font-normal">{errors.problemDescription}</span>
                        )}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.problemDescription}
                        onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                        placeholder="e.g. Unit makes a humming sound, fan is spinning but air coming from ceiling registers is room temperature..."
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                          errors.problemDescription ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Appointment Preferences */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Step 3: Scheduling & Location</h4>
                    <p className="text-xs text-slate-500 mt-0.5">When would you like our certified technician to visit?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span>Preferred Date *</span>
                          {errors.preferredDate && <span className="text-rose-500 text-[11px] font-normal">{errors.preferredDate}</span>}
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().substring(0, 10)}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Preferred Arrival Window</label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value as TimeWindow })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                          <option value="Late Afternoon (4:00 PM - 7:00 PM)">Late Afternoon (4:00 PM - 7:00 PM)</option>
                          <option value="Next Available (Emergency)">Next Available (Emergency)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                          <span>Property ZIP *</span>
                          {errors.zipCode && <span className="text-rose-500 text-[11px] font-normal">{errors.zipCode}</span>}
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/[^0-9]/g, '') })}
                          placeholder="e.g. 78749"
                          className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                            errors.zipCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-blue-600'
                          }`}
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Street Address (Optional)</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="e.g. 4208 Whispering Valley Dr"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Confirmation */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Step 4: Review Your Enquiry</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Please verify the details below before dispatching.</p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Service Category</span>
                      <span className="font-bold text-slate-900">{formData.serviceType}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Customer</span>
                      <span className="font-semibold text-slate-900">
                        {formData.fullName} ({formData.phone})
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Email</span>
                      <span className="text-slate-900">{formData.email}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Property / Urgency</span>
                      <span className="text-slate-900">
                        {formData.propertyType} · <strong className="text-blue-600">{formData.urgency}</strong>
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Requested Arrival</span>
                      <span className="text-slate-900">
                        {formData.preferredDate} ({formData.preferredTime})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location ZIP</span>
                      <span className="font-mono text-slate-900">{formData.zipCode}</span>
                    </div>

                    <div className="pt-2 text-slate-600 italic">
                      "{formData.problemDescription}"
                    </div>
                  </div>

                  {/* Privacy Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I authorize ArcticFlow to contact me via phone, email, or automated text regarding this estimate request. (Demo disclaimer: no marketing spam is ever sent).
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.privacyConsent}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">Step 1 of 4</span>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Enquiry...' : 'Confirm & Request Estimate'}</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
