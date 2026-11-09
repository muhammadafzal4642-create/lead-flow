import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Edit3, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  X, 
  Check, 
  Clock, 
  User, 
  FileText,
  AlertCircle,
  ArrowUpDown
} from 'lucide-react';
import { Lead, LeadStatus, ServiceType, PropertyType, UrgencyLevel, TimeWindow } from '../../types';

export const LeadManagement: React.FC = () => {
  const { 
    leads, 
    updateLeadStatus, 
    updateLead, 
    deleteLead, 
    addLeadNote, 
    convertLeadToAppointment,
    submitQuoteRequest,
    services
  } = useLeadFlow();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'name' | 'value'>('date_desc');

  // Detail Modal / Drawer state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Edit Lead Modal
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Schedule Appointment Modal from Lead
  const [schedulingLead, setSchedulingLead] = useState<Lead | null>(null);
  const [techToAssign, setTechToAssign] = useState('David Chen');
  const [aptDate, setAptDate] = useState('');
  const [aptTime, setAptTime] = useState<TimeWindow>('Morning (8:00 AM - 12:00 PM)');

  // Manual New Lead Modal
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'AC Repair' as ServiceType,
    problemDescription: '',
    propertyType: 'Single Family Home' as PropertyType,
    urgency: 'Within 24-48 Hours' as UrgencyLevel,
    preferredDate: new Date(Date.now() + 86400000).toISOString().substring(0, 10),
    preferredTime: 'Morning (8:00 AM - 12:00 PM)' as TimeWindow,
    zipCode: '78749',
    address: ''
  });

  // Filtered & Sorted Leads
  const filteredLeads = leads
    .filter((lead) => {
      const matchSearch =
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.zipCode.includes(searchTerm);

      const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchService = serviceFilter === 'All' || lead.serviceType === serviceFilter;

      return matchSearch && matchStatus && matchService;
    })
    .sort((a, b) => {
      if (sortBy === 'date_desc') return b.createdAt.localeCompare(a.createdAt);
      if (sortBy === 'date_asc') return a.createdAt.localeCompare(b.createdAt);
      if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
      if (sortBy === 'value') return (b.estimatedValue || 0) - (a.estimatedValue || 0);
      return 0;
    });

  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Quote Sent':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Lost':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;
    addLeadNote(selectedLead.id, newNoteText.trim());
    // update local reference in modal
    const updated = leads.find((l) => l.id === selectedLead.id);
    if (updated) {
      setSelectedLead({
        ...updated,
        internalNotes: [newNoteText.trim(), ...updated.internalNotes]
      });
    }
    setNewNoteText('');
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingLead || !aptDate) return;
    convertLeadToAppointment(schedulingLead.id, techToAssign, aptDate, aptTime);
    setSchedulingLead(null);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuoteRequest(newLeadForm);
    setIsNewLeadModalOpen(false);
    setNewLeadForm({
      fullName: '',
      phone: '',
      email: '',
      serviceType: 'AC Repair',
      problemDescription: '',
      propertyType: 'Single Family Home',
      urgency: 'Within 24-48 Hours',
      preferredDate: new Date(Date.now() + 86400000).toISOString().substring(0, 10),
      preferredTime: 'Morning (8:00 AM - 12:00 PM)',
      zipCode: '78749',
      address: ''
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Control Bar: Search, Filters, Add Lead */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, phone, or ref..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses ({leads.length})</option>
            <option value="New">New ({leads.filter((l) => l.status === 'New').length})</option>
            <option value="Contacted">Contacted</option>
            <option value="Quote Sent">Quote Sent</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Services</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="name">Customer Name</option>
            <option value="value">Est. Value (High to Low)</option>
          </select>

          {/* Manual Lead Button */}
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Leads Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Service Requested</th>
                <th className="py-3.5 px-4">Enquiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No leads found matching current search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Reference */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {lead.referenceCode}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        {lead.propertyType} · {lead.zipCode}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 font-medium">{lead.phone}</div>
                      <div className="text-slate-500 text-[11px] truncate max-w-[150px]">
                        {lead.email}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{lead.serviceType}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <span className="font-medium text-blue-600">{lead.urgency}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {lead.createdAt.substring(0, 10)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadgeStyle(
                          lead.status
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quote Sent">Quote Sent</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          title="View Complete Lead Details"
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setSchedulingLead(lead);
                            setAptDate(lead.preferredDate || new Date().toISOString().substring(0, 10));
                            setAptTime(lead.preferredTime || 'Morning (8:00 AM - 12:00 PM)');
                          }}
                          title="Convert to Scheduled Appointment"
                          className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditingLead(lead)}
                          title="Edit Lead Information"
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(lead.id)}
                          title="Delete Lead"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div>
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                    Lead File: {selectedLead.referenceCode}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedLead.fullName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Lead Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      updateLeadStatus(selectedLead.id, e.target.value as LeadStatus);
                      setSelectedLead({ ...selectedLead, status: e.target.value as LeadStatus });
                    }}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border ${getStatusBadgeStyle(selectedLead.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSchedulingLead(selectedLead);
                    setAptDate(selectedLead.preferredDate || new Date().toISOString().substring(0, 10));
                    setAptTime(selectedLead.preferredTime || 'Morning (8:00 AM - 12:00 PM)');
                  }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Convert to Appointment
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 space-y-6 text-xs">
                
                {/* Contact & Location Block */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[11px] font-semibold">Phone</span>
                    <a href={`tel:${selectedLead.phone}`} className="block font-bold text-blue-600 hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[11px] font-semibold">Email</span>
                    <a href={`mailto:${selectedLead.email}`} className="block font-bold text-blue-600 hover:underline truncate">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[11px] font-semibold">Property</span>
                    <span className="block font-medium text-slate-900">{selectedLead.propertyType}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[11px] font-semibold">Address / ZIP</span>
                    <span className="block font-medium text-slate-900">{selectedLead.address || selectedLead.zipCode}</span>
                  </div>
                </div>

                {/* Service Requirement Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Service Requirements & Issue Description
                  </h4>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Service Category:</span>
                      <span className="font-bold text-slate-900">{selectedLead.serviceType}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Urgency:</span>
                      <span className="font-bold text-rose-600">{selectedLead.urgency}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Preferred Window:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedLead.preferredDate} ({selectedLead.preferredTime})
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-slate-500 block mb-1">Customer Problem Description:</span>
                      <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed font-normal">
                        "{selectedLead.problemDescription}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Internal Contractor Notes Logger */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Internal Dispatch Notes
                  </h4>
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add internal dispatch note (e.g. Quoted $220 capacitor replacement)..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                    >
                      Post Note
                    </button>
                  </form>

                  <div className="space-y-2 pt-2">
                    {selectedLead.internalNotes.length === 0 ? (
                      <p className="text-slate-400 italic">No notes logged yet.</p>
                    ) : (
                      selectedLead.internalNotes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700 leading-relaxed">
                          {note}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Activity History Timeline */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Audit & Activity History
                  </h4>
                  <div className="space-y-2">
                    {selectedLead.activityLog.map((act) => (
                      <div key={act.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between text-[11px]">
                        <div>
                          <span className="font-semibold text-slate-900">{act.action}</span>
                          {act.note && <p className="text-slate-600 mt-0.5">{act.note}</p>}
                        </div>
                        <div className="text-right text-slate-400 font-mono">
                          {act.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Created: {selectedLead.createdAt}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold text-xs"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONVERT TO APPOINTMENT MODAL */}
      {schedulingLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase">Dispatch Scheduling</div>
                <h3 className="text-lg font-bold text-white">Book Appointment with Tech</h3>
              </div>
              <button onClick={() => setSchedulingLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-900 block">{schedulingLead.fullName} ({schedulingLead.phone})</span>
                <span className="text-slate-600 block">{schedulingLead.serviceType} · {schedulingLead.zipCode}</span>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Assign Field Technician *</label>
                <select
                  value={techToAssign}
                  onChange={(e) => setTechToAssign(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                >
                  <option value="David Chen">David Chen (Senior Inverter & Heat Pump Tech)</option>
                  <option value="Marcus Vance">Marcus Vance (Master HVAC Contractor)</option>
                  <option value="Elena Rostova">Elena Rostova (Field Supervisor)</option>
                  <option value="On-Call Tech Team">On-Call Immediate Dispatch Crew</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Arrival Window *</label>
                  <select
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value as TimeWindow)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM - 7:00 PM)">Late Afternoon (4:00 PM - 7:00 PM)</option>
                    <option value="Next Available (Emergency)">Next Available (Emergency)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSchedulingLead(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Confirm & Schedule Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Edit Lead: {editingLead.referenceCode}</h3>
              <button onClick={() => setEditingLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateLead(editingLead.id, editingLead);
                setEditingLead(null);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editingLead.fullName}
                  onChange={(e) => setEditingLead({ ...editingLead, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={editingLead.email}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Service Type</label>
                  <select
                    value={editingLead.serviceType}
                    onChange={(e) => setEditingLead({ ...editingLead, serviceType: e.target.value as ServiceType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Est. Value ($ USD)</label>
                  <input
                    type="number"
                    value={editingLead.estimatedValue || 0}
                    onChange={(e) => setEditingLead({ ...editingLead, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently delete this lead from the demo CRM?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteLead(deleteConfirmId);
                  setDeleteConfirmId(null);
                  if (selectedLead?.id === deleteConfirmId) setSelectedLead(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL INBOUND LEAD CREATION MODAL */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase">Manual Call-In Entry</span>
                <h3 className="text-base font-bold text-white">Create New HVAC Enquiry</h3>
              </div>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  placeholder="e.g. William Patterson"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="(512) 555-0199"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="w.patterson@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Service Category</label>
                  <select
                    value={newLeadForm.serviceType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceType: e.target.value as ServiceType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Urgency</label>
                  <select
                    value={newLeadForm.urgency}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, urgency: e.target.value as UrgencyLevel })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Emergency - Today">Emergency - Today</option>
                    <option value="Within 24-48 Hours">Within 24-48 Hours</option>
                    <option value="This Week">This Week</option>
                    <option value="Flexible / Planning">Flexible / Planning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Notes / Symptoms *</label>
                <textarea
                  rows={3}
                  required
                  value={newLeadForm.problemDescription}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, problemDescription: e.target.value })}
                  placeholder="Notes from customer phone call..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Property ZIP</label>
                  <input
                    type="text"
                    value={newLeadForm.zipCode}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, zipCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Address (Optional)</label>
                  <input
                    type="text"
                    value={newLeadForm.address}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Save Inbound Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
