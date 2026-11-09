import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Lead, 
  Appointment, 
  HvacService, 
  CompanySettings, 
  LeadStatus, 
  AppointmentStatus, 
  ServiceType,
  PropertyType,
  UrgencyLevel,
  TimeWindow,
  ActivityItem
} from '../types';
import { 
  INITIAL_LEADS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_SERVICES, 
  INITIAL_SETTINGS 
} from '../data/seedData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface NewQuotePayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  problemDescription: string;
  propertyType: PropertyType;
  urgency: UrgencyLevel;
  preferredDate: string;
  preferredTime: TimeWindow;
  zipCode: string;
  address?: string;
}

interface LeadFlowContextType {
  // Navigation & View State
  currentView: 'public' | 'admin';
  publicPage: 'home' | 'services' | 'about' | 'contact';
  adminTab: 'overview' | 'leads' | 'appointments' | 'services' | 'settings';
  setCurrentView: (view: 'public' | 'admin') => void;
  setPublicPage: (page: 'home' | 'services' | 'about' | 'contact') => void;
  setAdminTab: (tab: 'overview' | 'leads' | 'appointments' | 'services' | 'settings') => void;
  
  // Quote Modal
  isQuoteModalOpen: boolean;
  selectedQuoteService: ServiceType | null;
  openQuoteModal: (service?: ServiceType) => void;
  closeQuoteModal: () => void;
  lastCreatedLead: Lead | null;

  // Admin Auth (Demo)
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  requireAdminLogin: boolean;
  setRequireAdminLogin: (require: boolean) => void;

  // Data Store
  leads: Lead[];
  appointments: Appointment[];
  services: HvacService[];
  settings: CompanySettings;

  // Actions
  submitQuoteRequest: (payload: NewQuotePayload) => Lead;
  updateLeadStatus: (leadId: string, newStatus: LeadStatus, note?: string) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  deleteLead: (leadId: string) => void;
  addLeadNote: (leadId: string, noteText: string) => void;

  // Appointments Actions
  createAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  convertLeadToAppointment: (leadId: string, technician: string, date: string, time: TimeWindow) => Appointment | null;

  // Services & Settings
  updateService: (id: string, updates: Partial<HvacService>) => void;
  updateSettings: (updates: Partial<CompanySettings>) => void;

  // Demo Utility
  resetDemoData: () => void;
  exportDataJson: () => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

const STORAGE_KEY = 'leadflow_arcticflow_state_v2';
const AUTH_KEY = 'leadflow_admin_auth_v2';

const LeadFlowContext = createContext<LeadFlowContextType | undefined>(undefined);

export const LeadFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [publicPage, setPublicPage] = useState<'home' | 'services' | 'about' | 'contact'>('home');
  const [adminTab, setAdminTab] = useState<'overview' | 'leads' | 'appointments' | 'services' | 'settings'>('overview');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<ServiceType | null>(null);
  const [lastCreatedLead, setLastCreatedLead] = useState<Lead | null>(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [requireAdminLogin, setRequireAdminLogin] = useState(false);

  // Core Data
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_appointments`);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [services, setServices] = useState<HvacService[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
      if (saved) {
        const parsed: HvacService[] = JSON.parse(saved);
        const defaultMap = new Map(INITIAL_SERVICES.map((s) => [s.id, s.image]));
        return parsed.map((s) => ({
          ...s,
          // Replace any obsolete raw /src/ paths with the properly resolved bundled asset URL
          image: (!s.image || s.image.startsWith('/src/assets/')) 
            ? (defaultMap.get(s.id) || s.image) 
            : s.image
        }));
      }
      return INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(appointments));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [settings]);

  // Toast helper
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openQuoteModal = (service?: ServiceType) => {
    if (service) {
      setSelectedQuoteService(service);
    } else {
      setSelectedQuoteService(null);
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  // Auth
  const loginAdmin = (password: string): boolean => {
    // Demonstration password
    if (password === 'arcticflow2026' || password === 'admin' || password === 'demo') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      showToast('Welcome to LeadFlow Dashboard', 'Logged in as Demo Contractor Administrator');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
    setCurrentView('public');
    showToast('Signed Out', 'Demonstration admin session closed', 'info');
  };

  // Submit quote request from public website
  const submitQuoteRequest = (payload: NewQuotePayload): Lead => {
    const randomRef = `AF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestampStr = now.toISOString().replace('T', ' ').substring(0, 16);
    
    // Estimate ballpark value based on service
    const matchingService = services.find((s) => s.name === payload.serviceType);
    const estimatedVal = matchingService ? matchingService.startingPrice : 250;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      referenceCode: randomRef,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      serviceType: payload.serviceType,
      problemDescription: payload.problemDescription,
      propertyType: payload.propertyType,
      urgency: payload.urgency,
      preferredDate: payload.preferredDate,
      preferredTime: payload.preferredTime,
      zipCode: payload.zipCode,
      address: payload.address || `${payload.zipCode} Area Residence`,
      status: 'New',
      estimatedValue: estimatedVal,
      internalNotes: [
        `Automated lead intake: Requested ${payload.serviceType} (${payload.urgency}).`
      ],
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: timestampStr,
          action: 'Lead Created',
          actor: 'Website Form (Quote System)',
          note: `Customer submitted enquiry for ${payload.serviceType}.`
        }
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    setLeads((prev) => [newLead, ...prev]);
    setLastCreatedLead(newLead);
    showToast(
      'Quote Request Received!',
      `Reference #${randomRef} saved to Contractor LeadFlow CRM.`,
      'success'
    );

    return newLead;
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus, note?: string) => {
    const now = new Date();
    const timestampStr = now.toISOString().replace('T', ' ').substring(0, 16);

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            timestamp: timestampStr,
            action: `Status Changed to ${newStatus}`,
            actor: 'Demo Dispatcher (Admin)',
            note: note || `Lead marked as ${newStatus}`
          };
          return {
            ...lead,
            status: newStatus,
            updatedAt: now.toISOString(),
            activityLog: [newActivity, ...lead.activityLog],
            internalNotes: note ? [note, ...lead.internalNotes] : lead.internalNotes
          };
        }
        return lead;
      })
    );
    showToast('Lead Status Updated', `Lead status changed to ${newStatus}`);
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead))
    );
    showToast('Lead Updated', 'Changes saved successfully');
  };

  const deleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    showToast('Lead Removed', 'Enquiry deleted from demo database', 'info');
  };

  const addLeadNote = (leadId: string, noteText: string) => {
    const now = new Date();
    const timestampStr = now.toISOString().replace('T', ' ').substring(0, 16);

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            timestamp: timestampStr,
            action: 'Internal Note Added',
            actor: 'Demo Administrator',
            note: noteText
          };
          return {
            ...lead,
            internalNotes: [noteText, ...lead.internalNotes],
            activityLog: [newActivity, ...lead.activityLog],
            updatedAt: now.toISOString()
          };
        }
        return lead;
      })
    );
    showToast('Note Added', 'Note recorded in lead file');
  };

  const createAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast('Appointment Scheduled', `Booked with ${data.customerName} on ${data.date}`);
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
    showToast('Appointment Updated', 'Changes saved successfully');
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    showToast('Appointment Cancelled', 'Appointment removed from schedule', 'info');
  };

  const convertLeadToAppointment = (
    leadId: string, 
    technician: string, 
    date: string, 
    time: TimeWindow
  ): Appointment | null => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      leadId: lead.id,
      referenceCode: lead.referenceCode,
      customerName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      serviceType: lead.serviceType,
      date,
      timeWindow: time,
      address: lead.address || `${lead.zipCode} Area Address`,
      zipCode: lead.zipCode,
      assignedTechnician: technician,
      status: 'Scheduled',
      notes: `Generated from Lead enquiry ${lead.referenceCode}. Issue: ${lead.problemDescription.substring(0, 100)}...`,
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newApt, ...prev]);
    updateLeadStatus(leadId, 'Scheduled', `Service visit scheduled for ${date} (${time}) with technician ${technician}.`);
    showToast('Lead Scheduled', `New appointment booked for ${lead.fullName}`);
    return newApt;
  };

  const updateService = (id: string, updates: Partial<HvacService>) => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...updates } : srv))
    );
    showToast('Service Updated', 'Public catalogue updated immediately');
  };

  const updateSettings = (updates: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showToast('Settings Saved', 'Company profile and preferences updated');
  };

  const resetDemoData = () => {
    setLeads(INITIAL_LEADS);
    setAppointments(INITIAL_APPOINTMENTS);
    setServices(INITIAL_SERVICES);
    setSettings(INITIAL_SETTINGS);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_leads`);
      localStorage.removeItem(`${STORAGE_KEY}_appointments`);
      localStorage.removeItem(`${STORAGE_KEY}_services`);
      localStorage.removeItem(`${STORAGE_KEY}_settings`);
    } catch {}
    showToast('Demo Data Reset', 'Fresh HVAC leads and schedules restored', 'info');
  };

  const exportDataJson = () => {
    const dataToExport = {
      exportTimestamp: new Date().toISOString(),
      company: settings.companyName,
      leads,
      appointments,
      services,
      settings
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `arcticflow-leadflow-export-${new Date().toISOString().substring(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Data Exported', 'Downloaded leads and schedules JSON file');
  };

  return (
    <LeadFlowContext.Provider
      value={{
        currentView,
        publicPage,
        adminTab,
        setCurrentView,
        setPublicPage,
        setAdminTab,
        isQuoteModalOpen,
        selectedQuoteService,
        openQuoteModal,
        closeQuoteModal,
        lastCreatedLead,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        requireAdminLogin,
        setRequireAdminLogin,
        leads,
        appointments,
        services,
        settings,
        submitQuoteRequest,
        updateLeadStatus,
        updateLead,
        deleteLead,
        addLeadNote,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        convertLeadToAppointment,
        updateService,
        updateSettings,
        resetDemoData,
        exportDataJson,
        toasts,
        dismissToast,
        showToast
      }}
    >
      {children}
    </LeadFlowContext.Provider>
  );
};

export const useLeadFlow = (): LeadFlowContextType => {
  const context = useContext(LeadFlowContext);
  if (!context) {
    throw new Error('useLeadFlow must be used within a LeadFlowProvider');
  }
  return context;
};
