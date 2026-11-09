import { Lead, Appointment, HvacService, CompanySettings } from '../types';
import serviceAcRepairImg from '../assets/images/service_ac_repair_1794122698686.jpg';
import serviceAcInstallImg from '../assets/images/service_ac_install_1794122699222.jpg';
import serviceHeatingRepairImg from '../assets/images/service_heating_repair_1794122699482.jpg';
import heroHvacTechnicianImg from '../assets/images/hero_hvac_technician_1794122697811.jpg';
import serviceDuctCleaningImg from '../assets/images/service_duct_cleaning_1794122699591.jpg';

export const INITIAL_SERVICES: HvacService[] = [
  {
    id: 'srv-1',
    name: 'AC Repair',
    shortDesc: 'Rapid diagnostic and precision repair for all central AC brands and split systems.',
    fullDesc: 'Our certified technicians troubleshoot compressors, fans, refrigerant leaks, capacitors, and electrical contactors. We arrive with fully stocked trucks to resolve over 85% of cooling problems on the first visit.',
    benefits: [
      'Comprehensive 26-point diagnostic inspection',
      'Upfront transparent flat-rate repair pricing',
      'Genuine OEM replacement components',
      '1-year parts and labor warranty on repairs'
    ],
    startingPrice: 89,
    priceUnit: 'diagnostic fee (applied to repair)',
    turnaroundTime: 'Same-day service available',
    popular: true,
    image: serviceAcRepairImg
  },
  {
    id: 'srv-2',
    name: 'AC Installation',
    shortDesc: 'High-efficiency SEER2 heat pumps and central AC replacements tailored to your home layout.',
    fullDesc: 'Custom load calculation (Manual J) ensures precise sizing for optimal humidity removal and minimal electric bills. We carry top-tier manufacturers with up to 10-year manufacturer warranties and local utility rebate assistance.',
    benefits: [
      'Accurate Manual J sizing calculation',
      'High-efficiency systems up to 20+ SEER2',
      'Zero-mess installation guarantee with floor protection',
      'Financing available with low monthly payments'
    ],
    startingPrice: 3850,
    priceUnit: 'complete system installed',
    turnaroundTime: '1-2 business days for installation',
    popular: true,
    image: serviceAcInstallImg
  },
  {
    id: 'srv-3',
    name: 'Heating Repair',
    shortDesc: 'Gas furnace and heat pump diagnostic, igniter replacement, and safety inspections.',
    fullDesc: 'Keep your home safe and warm with our licensed heating specialists. We inspect heat exchangers for lethal carbon monoxide cracks, clean burners, calibrate thermostats, and replace worn blower motors.',
    benefits: [
      'Carbon monoxide safety check and combustion analysis',
      'Gas valve and electric heating element diagnostics',
      'Fast ignition and flame sensor troubleshooting',
      'Emergency heating dispatch in freezing temperatures'
    ],
    startingPrice: 89,
    priceUnit: 'diagnostic fee (applied to repair)',
    turnaroundTime: 'Same-day heating dispatch',
    popular: false,
    image: serviceHeatingRepairImg
  },
  {
    id: 'srv-4',
    name: 'HVAC Maintenance',
    shortDesc: 'Preventative multi-point tune-ups that prolong equipment lifespan and cut utility costs.',
    fullDesc: 'Seasonal tune-ups prevent 95% of unexpected summer and winter breakdowns. Includes condenser coil wash, electrical tightening, amperage testing, drain line flushing, and airflow velocity check.',
    benefits: [
      'Thorough 21-point seasonal inspection',
      'Chemical outdoor coil wash & condensate drain clearing',
      'Improves energy efficiency by up to 15%',
      'Maintains active manufacturer warranty compliance'
    ],
    startingPrice: 129,
    priceUnit: 'per system tune-up',
    turnaroundTime: 'Scheduled within 48 hours',
    popular: true,
    image: heroHvacTechnicianImg
  },
  {
    id: 'srv-5',
    name: 'Air Duct Cleaning',
    shortDesc: 'Negative-pressure HEPA extraction removes dust, allergens, pet dander, and mold spores.',
    fullDesc: 'Breathe cleaner indoor air and restore HVAC airflow balance. Our commercial vacuum truck and rotary whip agitation system sweeps every supply and return trunk line clean.',
    benefits: [
      'Commercial hospital-grade HEPA negative air system',
      'Whole-home supply and return vent sanitization',
      'Removes stubborn odor, pet hair, and drywall dust',
      'Includes before-and-after camera inspection'
    ],
    startingPrice: 349,
    priceUnit: 'single system whole-home',
    turnaroundTime: '3-4 hours completion time',
    popular: false,
    image: serviceDuctCleaningImg
  },
  {
    id: 'srv-6',
    name: 'Emergency HVAC Service',
    shortDesc: '24/7 on-call dispatch for severe leaks, burning odors, or zero heating during freezing snaps.',
    fullDesc: 'HVAC emergencies do not wait for business hours. Our dedicated emergency on-call technicians carry emergency parts inventory to get your heat or cooling restored fast without predatory price gouging.',
    benefits: [
      'Guaranteed rapid 60-to-90 minute emergency response',
      'Direct line to local on-call service technician',
      'No surprise after-hours pricing without upfront quote',
      'Temporary emergency portable units available if needed'
    ],
    startingPrice: 149,
    priceUnit: 'emergency dispatch diagnostic',
    turnaroundTime: 'Immediate priority dispatch',
    popular: false,
    image: serviceAcRepairImg
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    referenceCode: 'AF-8421',
    fullName: 'Robert Sterling',
    email: 'r.sterling@austinhomes.example',
    phone: '(512) 555-0143',
    serviceType: 'AC Repair',
    problemDescription: 'Upstairs AC unit running constantly but air coming through vents is barely cool (76°F when set to 70°F). Heard a buzzing noise outside earlier today.',
    propertyType: 'Single Family Home',
    urgency: 'Within 24-48 Hours',
    preferredDate: '2026-11-09',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    zipCode: '78749',
    address: '4208 Whispering Valley Dr, Austin, TX',
    status: 'New',
    estimatedValue: 280,
    internalNotes: [
      'Likely dual run capacitor failure or slow refrigerant leak based on phone symptoms.'
    ],
    activityLog: [
      {
        id: 'act-1',
        timestamp: '2026-11-07 18:42',
        action: 'Lead Created',
        actor: 'Website Form (Quote System)',
        note: 'Customer completed 4-step quote request'
      }
    ],
    createdAt: '2026-11-07T18:42:00Z',
    updatedAt: '2026-11-07T18:42:00Z'
  },
  {
    id: 'lead-102',
    referenceCode: 'AF-8419',
    fullName: 'Amanda Vance-Miller',
    email: 'amanda.vmiller@workplace.example',
    phone: '(512) 555-0922',
    serviceType: 'AC Installation',
    problemDescription: 'Current 14-year-old R-410A system failed twice this summer. Want a quote for a modern 4-ton variable speed heat pump with programmable smart thermostat.',
    propertyType: 'Single Family Home',
    urgency: 'This Week',
    preferredDate: '2026-11-10',
    preferredTime: 'Afternoon (12:00 PM - 4:00 PM)',
    zipCode: '78731',
    address: '6104 Balcones Pines Way, Austin, TX',
    status: 'Quote Sent',
    estimatedValue: 7450,
    internalNotes: [
      'Sent proposal for 18 SEER2 Inverter Heat Pump. Customer interested in Austin Energy rebate qualification.'
    ],
    activityLog: [
      {
        id: 'act-2',
        timestamp: '2026-11-06 14:10',
        action: 'Lead Created',
        actor: 'Website Form',
      },
      {
        id: 'act-3',
        timestamp: '2026-11-06 15:30',
        action: 'Contacted',
        actor: 'Elena Rostova (Dispatch)',
        note: 'Spoke with Amanda, performed initial phone sizing questionnaire'
      },
      {
        id: 'act-4',
        timestamp: '2026-11-07 09:15',
        action: 'Quote Sent',
        actor: 'Marcus Vance',
        note: 'Emailed official estimate #AF-Q781 for $7,450 installed'
      }
    ],
    createdAt: '2026-11-06T14:10:00Z',
    updatedAt: '2026-11-07T09:15:00Z'
  },
  {
    id: 'lead-103',
    referenceCode: 'AF-8415',
    fullName: 'Carlos Morales',
    email: 'carlos.m@cedarpark.example',
    phone: '(512) 555-3819',
    serviceType: 'Emergency HVAC Service',
    problemDescription: 'Water leaking through ceiling drywall directly beneath the attic air handler unit! Drain pan appears flooded with standing water.',
    propertyType: 'Single Family Home',
    urgency: 'Emergency - Today',
    preferredDate: '2026-11-08',
    preferredTime: 'Next Available (Emergency)',
    zipCode: '78613',
    address: '1411 Cypress Creek Terrace, Cedar Park, TX',
    status: 'Scheduled',
    estimatedValue: 240,
    internalNotes: [
      'Emergency service call booked. Tech instructed to bring nitrogen blowout tool and secondary float switch safety shutoff.'
    ],
    activityLog: [
      {
        id: 'act-5',
        timestamp: '2026-11-07 10:20',
        action: 'Lead Created',
        actor: 'Website Emergency Form',
        note: 'Urgent leak reported'
      },
      {
        id: 'act-6',
        timestamp: '2026-11-07 10:28',
        action: 'Scheduled',
        actor: 'Elena Rostova',
        note: 'Dispatched Senior Tech David Chen for immediate morning response'
      }
    ],
    createdAt: '2026-11-07T10:20:00Z',
    updatedAt: '2026-11-07T10:28:00Z'
  },
  {
    id: 'lead-104',
    referenceCode: 'AF-8408',
    fullName: 'Dr. Gregory House',
    email: 'ghouse@medicalsuites.example',
    phone: '(512) 555-7281',
    serviceType: 'Air Duct Cleaning',
    problemDescription: 'Commercial medical office suite with 10 examination rooms and reception area. Significant dust accumulation in supply diffusers; need certified HEPA sanitization.',
    propertyType: 'Commercial Property',
    urgency: 'Flexible / Planning',
    preferredDate: '2026-11-14',
    preferredTime: 'Late Afternoon (4:00 PM - 7:00 PM)',
    zipCode: '78705',
    address: '3200 Medical Arts Sq, Suite 210, Austin, TX',
    status: 'Contacted',
    estimatedValue: 950,
    internalNotes: [
      'Needs after-hours service so patients are not disrupted. Quoted commercial rate with antimicrobial fogging.'
    ],
    activityLog: [
      {
        id: 'act-7',
        timestamp: '2026-11-05 11:00',
        action: 'Lead Created',
        actor: 'Website Form'
      },
      {
        id: 'act-8',
        timestamp: '2026-11-05 13:45',
        action: 'Contacted',
        actor: 'Elena Rostova',
        note: 'Confirmed suite square footage (2,400 sq ft) and access code'
      }
    ],
    createdAt: '2026-11-05T11:00:00Z',
    updatedAt: '2026-11-05T13:45:00Z'
  },
  {
    id: 'lead-105',
    referenceCode: 'AF-8395',
    fullName: 'Hannah Peterson',
    email: 'hannah.p@pflugerville.example',
    phone: '(512) 555-8490',
    serviceType: 'HVAC Maintenance',
    problemDescription: 'Annual seasonal tune-up for dual AC and gas furnace units before winter season. Want to sign up for annual maintenance membership.',
    propertyType: 'Single Family Home',
    urgency: 'Within 24-48 Hours',
    preferredDate: '2026-11-09',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    zipCode: '78660',
    address: '908 Blackhawk Ridge Trail, Pflugerville, TX',
    status: 'Completed',
    estimatedValue: 198,
    internalNotes: [
      'Completed 21-point inspection on both units. Cleaned flame sensor and checked capacitor values. Customer enrolled in VIP Comfort Club.'
    ],
    activityLog: [
      {
        id: 'act-9',
        timestamp: '2026-11-03 09:20',
        action: 'Lead Created',
        actor: 'Website Form'
      },
      {
        id: 'act-10',
        timestamp: '2026-11-04 10:00',
        action: 'Scheduled',
        actor: 'Elena Rostova'
      },
      {
        id: 'act-11',
        timestamp: '2026-11-05 11:30',
        action: 'Completed',
        actor: 'David Chen (Field Tech)',
        note: 'Invoice paid in full, digital inspection sheet signed'
      }
    ],
    createdAt: '2026-11-03T09:20:00Z',
    updatedAt: '2026-11-05T11:30:00Z'
  },
  {
    id: 'lead-106',
    referenceCode: 'AF-8380',
    fullName: 'Trevor Bennett',
    email: 'tbennett@austinrealty.example',
    phone: '(512) 555-6677',
    serviceType: 'Heating Repair',
    problemDescription: 'Gas furnace makes loud clicking sound upon startup and shuts down after 30 seconds without blowing hot air. Error code LED blinking 3 times.',
    propertyType: 'Townhouse / Condo',
    urgency: 'This Week',
    preferredDate: '2026-11-11',
    preferredTime: 'Afternoon (12:00 PM - 4:00 PM)',
    zipCode: '78704',
    address: '1802 South Congress Ave, Unit B, Austin, TX',
    status: 'New',
    estimatedValue: 310,
    internalNotes: [
      'Blink code 3 typically indicates pressure switch failure or inducer draft blockage.'
    ],
    activityLog: [
      {
        id: 'act-12',
        timestamp: '2026-11-07 16:15',
        action: 'Lead Created',
        actor: 'Website Form',
        note: 'Customer enquiry received'
      }
    ],
    createdAt: '2026-11-07T16:15:00Z',
    updatedAt: '2026-11-07T16:15:00Z'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-201',
    leadId: 'lead-103',
    referenceCode: 'AF-8415',
    customerName: 'Carlos Morales',
    email: 'carlos.m@cedarpark.example',
    phone: '(512) 555-3819',
    serviceType: 'Emergency HVAC Service',
    date: '2026-11-08',
    timeWindow: 'Next Available (Emergency)',
    address: '1411 Cypress Creek Terrace, Cedar Park, TX',
    zipCode: '78613',
    assignedTechnician: 'David Chen',
    status: 'Scheduled',
    notes: 'Attic flood pan overflowing. Bring nitrogen tank and clear condensate drain line.',
    createdAt: '2026-11-07T10:28:00Z'
  },
  {
    id: 'apt-202',
    leadId: 'lead-101',
    referenceCode: 'AF-8421',
    customerName: 'Robert Sterling',
    email: 'r.sterling@austinhomes.example',
    phone: '(512) 555-0143',
    serviceType: 'AC Repair',
    date: '2026-11-09',
    timeWindow: 'Morning (8:00 AM - 12:00 PM)',
    address: '4208 Whispering Valley Dr, Austin, TX',
    zipCode: '78749',
    assignedTechnician: 'Marcus Vance',
    status: 'Scheduled',
    notes: 'Warm air diagnosis, test dual run capacitor & contactor amperage.',
    createdAt: '2026-11-07T19:00:00Z'
  },
  {
    id: 'apt-203',
    customerName: 'Rebecca Thorne',
    email: 'rebecca.thorne@domain.example',
    phone: '(512) 555-4421',
    serviceType: 'HVAC Maintenance',
    date: '2026-11-09',
    timeWindow: 'Afternoon (12:00 PM - 4:00 PM)',
    address: '2904 Westover Rd, Austin, TX',
    zipCode: '78703',
    assignedTechnician: 'David Chen',
    status: 'Scheduled',
    notes: 'Seasonal heat pump tune-up, filter replacement (16x25x4 MERV 11).',
    createdAt: '2026-11-06T11:15:00Z'
  },
  {
    id: 'apt-204',
    leadId: 'lead-105',
    referenceCode: 'AF-8395',
    customerName: 'Hannah Peterson',
    email: 'hannah.p@pflugerville.example',
    phone: '(512) 555-8490',
    serviceType: 'HVAC Maintenance',
    date: '2026-11-05',
    timeWindow: 'Morning (8:00 AM - 12:00 PM)',
    address: '908 Blackhawk Ridge Trail, Pflugerville, TX',
    zipCode: '78660',
    assignedTechnician: 'David Chen',
    status: 'Completed',
    notes: 'Full winter heating check completed. Cleaned flame sensors, checked heat exchanger.',
    createdAt: '2026-11-04T10:00:00Z'
  }
];

export const INITIAL_SETTINGS: CompanySettings = {
  companyName: 'ArcticFlow Heating & Cooling',
  tagline: 'Reliable Heating & Cooling Solutions for Your Home.',
  phone: '(512) 234-HEAT',
  emergencyPhone: '(512) 555-0199',
  email: 'dispatch@arcticflow-demo.com',
  officeAddress: '4820 Innovation Parkway, Suite 110, Austin, TX 78744',
  licenseNumber: 'TACLA# 48291E (Master HVAC Contractor - Demo)',
  businessHours: {
    weekdays: '7:00 AM - 7:00 PM',
    saturday: '8:00 AM - 4:00 PM',
    sunday: 'Emergency Dispatch Only',
    emergency: '24 Hours / 7 Days a Week'
  },
  serviceZipCodes: [
    '78701', '78702', '78703', '78704', '78705', '78731', '78745', '78749', 
    '78750', '78759', '78613', '78641', '78660', '78664', '78681', '78610'
  ],
  serviceCities: [
    'Austin', 'Round Rock', 'Cedar Park', 'Pflugerville', 'Georgetown', 'Buda', 'Kyle', 'Lakeway'
  ],
  notifications: {
    smsAlerts: true,
    emailAlerts: true,
    soundAlerts: true
  }
};
