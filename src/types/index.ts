export type LeadStatus = 'New' | 'Contacted' | 'Quote Sent' | 'Scheduled' | 'Completed' | 'Lost';

export type ServiceType = 
  | 'AC Repair' 
  | 'AC Installation' 
  | 'Heating Repair' 
  | 'HVAC Maintenance' 
  | 'Air Duct Cleaning' 
  | 'Emergency HVAC Service';

export type PropertyType = 'Single Family Home' | 'Townhouse / Condo' | 'Commercial Property' | 'Multi-Family / Rental';

export type UrgencyLevel = 'Emergency - Today' | 'Within 24-48 Hours' | 'This Week' | 'Flexible / Planning';

export type TimeWindow = 'Morning (8:00 AM - 12:00 PM)' | 'Afternoon (12:00 PM - 4:00 PM)' | 'Late Afternoon (4:00 PM - 7:00 PM)' | 'Next Available (Emergency)';

export interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  note?: string;
}

export interface Lead {
  id: string;
  referenceCode: string;
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
  status: LeadStatus;
  estimatedValue?: number;
  internalNotes: string[];
  activityLog: ActivityItem[];
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  leadId?: string;
  referenceCode?: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  date: string; // YYYY-MM-DD
  timeWindow: TimeWindow;
  address: string;
  zipCode: string;
  assignedTechnician: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface HvacService {
  id: string;
  name: ServiceType;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  startingPrice: number;
  priceUnit: string;
  turnaroundTime: string;
  popular?: boolean;
  image: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  officeAddress: string;
  licenseNumber: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergency: string;
  };
  serviceZipCodes: string[];
  serviceCities: string[];
  notifications: {
    smsAlerts: boolean;
    emailAlerts: boolean;
    soundAlerts: boolean;
  };
}
