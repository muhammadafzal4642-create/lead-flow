import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Bell, 
  Save, 
  RefreshCw, 
  Download, 
  Plus, 
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    resetDemoData, 
    exportDataJson, 
    submitQuoteRequest,
    showToast 
  } = useLeadFlow();

  const [form, setForm] = useState({ ...settings });
  const [newZipInput, setNewZipInput] = useState('');
  const [newCityInput, setNewCityInput] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const handleAddZip = () => {
    const clean = newZipInput.trim();
    if (!clean || form.serviceZipCodes.includes(clean)) return;
    setForm({
      ...form,
      serviceZipCodes: [...form.serviceZipCodes, clean]
    });
    setNewZipInput('');
  };

  const handleRemoveZip = (zipToRemove: string) => {
    setForm({
      ...form,
      serviceZipCodes: form.serviceZipCodes.filter((z) => z !== zipToRemove)
    });
  };

  const handleAddCity = () => {
    const clean = newCityInput.trim();
    if (!clean || form.serviceCities.includes(clean)) return;
    setForm({
      ...form,
      serviceCities: [...form.serviceCities, clean]
    });
    setNewCityInput('');
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setForm({
      ...form,
      serviceCities: form.serviceCities.filter((c) => c !== cityToRemove)
    });
  };

  // Seed sample prospective customer
  const handleSeedQuickCustomer = () => {
    const sampleNames = ['Jessica Miller', 'David Kowalski', 'Thomas Shelby', 'Samantha Reed', 'Brian O\'Connor'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const sampleIssues = [
      'AC condenser fan humming loudly and breaker tripped twice this morning.',
      'Heat pump blowing cold air in heating mode, emergency defrost cycle indicator blinking.',
      'Requesting complete system quote for 2,200 sq ft two-story home replacement.',
      'Water dripping through ceiling plenum above hallway closet.'
    ];
    const randomIssue = sampleIssues[Math.floor(Math.random() * sampleIssues.length)];
    
    submitQuoteRequest({
      fullName: randomName,
      email: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
      phone: `(512) 555-0${Math.floor(100 + Math.random() * 900)}`,
      serviceType: 'AC Repair',
      problemDescription: randomIssue,
      propertyType: 'Single Family Home',
      urgency: 'Within 24-48 Hours',
      preferredDate: new Date(Date.now() + 86400000).toISOString().substring(0, 10),
      preferredTime: 'Morning (8:00 AM - 12:00 PM)',
      zipCode: '78749'
    });
    showToast('Sample Lead Created', `Injected realistic test enquiry for ${randomName}`);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Company Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              HVAC Company Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">State License Registration</label>
              <input
                type="text"
                value={form.licenseNumber}
                onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Facility / Dispatch Address</label>
              <input
                type="text"
                value={form.officeAddress}
                onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Operating Hours */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Dispatch Phone Numbers & Operating Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Main Office Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">24/7 Emergency Line</label>
              <input
                type="text"
                value={form.emergencyPhone}
                onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-rose-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Dispatch Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Monday - Friday Hours</label>
              <input
                type="text"
                value={form.businessHours.weekdays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessHours: { ...form.businessHours, weekdays: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Saturday Hours</label>
              <input
                type="text"
                value={form.businessHours.saturday}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessHours: { ...form.businessHours, saturday: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Sunday Coverage</label>
              <input
                type="text"
                value={form.businessHours.sunday}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessHours: { ...form.businessHours, sunday: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Service Territory Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Service Areas (Validated by Instant ZIP Checker)
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={5}
                value={newZipInput}
                onChange={(e) => setNewZipInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Add 5-digit ZIP (e.g. 78759)"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs max-w-xs"
              />
              <button
                type="button"
                onClick={handleAddZip}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                + Add ZIP
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {form.serviceZipCodes.map((zip) => (
                <span
                  key={zip}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800"
                >
                  <span>{zip}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveZip(zip)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Dispatcher Alerts & Notifications
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.notifications.smsAlerts}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notifications: { ...form.notifications, smsAlerts: e.target.checked }
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-900 block">Instant SMS Dispatcher Alerts</span>
                <span className="text-slate-500">Sends text alert to on-call dispatcher whenever an emergency lead arrives.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.notifications.emailAlerts}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notifications: { ...form.notifications, emailAlerts: e.target.checked }
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-900 block">Email Quote Lead Notifications</span>
                <span className="text-slate-500">Receives full lead breakdown with customer problem description.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Company Settings</span>
          </button>
        </div>
      </form>

      {/* DEMO PRESENTATION POWER TOOLS */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-5">
        <div>
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            Pitch Presentation Utilities
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Demonstration Data & Presentation Controls
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Use these controls during your contractor sales demonstration to quickly reset test data, inject live enquiries, or download lead exports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleSeedQuickCustomer}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inject Realistic Test Lead</span>
          </button>

          <button
            onClick={exportDataJson}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Leads to JSON</span>
          </button>

          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-bold border border-rose-800/40 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Demo Records</span>
          </button>
        </div>
      </div>

    </div>
  );
};
