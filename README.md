# LeadFlow — Premium HVAC Website & Contractor Lead Management System

> **Tagline:** *Turn Every Enquiry Into an Opportunity.*  
> **Demo Company:** ArcticFlow Heating & Cooling (Austin & Central Texas)  
> **Industry:** Residential & Commercial HVAC Services

---

## 1. Project Overview & Pitch Purpose

**LeadFlow** is an agency-grade demonstration platform designed to present to prospective HVAC business owners and home-service contractors. It proves how a professional, conversion-focused website paired with an integrated lead intake and dispatch dashboard solves three major contractor pain points:

1. **Lost Inbound Phone Calls & Leads:** Homeowners with broken AC systems often call after hours or leave unorganized voicemails. LeadFlow captures them via a frictionless 4-step quote workflow.
2. **Transparent Diagnostic Expectations:** Upfront flat-rate pricing and clearly communicated diagnostic fee credits build trust and reduce customer price shopping.
3. **Dispatch & Appointment Organization:** Inquiries immediately feed into a contractor CRM with status pipelines (`New` → `Contacted` → `Quote Sent` → `Scheduled` → `Completed`) and calendar scheduling.

---

## 2. Demonstration Credentials & Access

- **Public Website URL:** Available via root preview.
- **Contractor Admin Portal:** Accessible via the **"Contractor Dashboard"** tab in the top presentation banner or navigation link.
- **Demo Password:** `arcticflow2026` (A **"One-Click Instant Demo Login"** button is also built-in for fast sales presentations).

---

## 3. Public Website Features

- **Top Bar Contract Compliant Header:** Clean 1-line brand wordmark (`ArcticFlow`), 4 single-line links (`Home`, `Services`, `About`, `Contact`), and 1 primary CTA (`Request a Free Estimate`) alongside clickable phone links (`(512) 234-HEAT`).
- **High-Impact Hero Section:** High-resolution commercial photography of a licensed technician testing a central heat pump unit, trust markers (NATE-Certified, TACLA# 48291E, 1-year guarantee), and emergency dispatch notice.
- **6 Core HVAC Service Cards:**
  1. *AC Repair* ($89 Diagnostic)
  2. *AC Installation & Heat Pumps* ($3,850+ SEER2 Systems)
  3. *Heating Repair & Furnace Safety* ($89 Diagnostic)
  4. *HVAC Preventive Maintenance* ($129 Tune-Up)
  5. *Air Duct Cleaning & HEPA Sanitization* ($349 Whole-Home)
  6. *24/7 Emergency HVAC Service* (Priority Rapid Dispatch)
- **Why Choose Us Section:** Focuses on real contractor standards (Upfront flat-rate pricing, 60-minute emergency arrival, clean-home bootie protocol, fully equipped mobile fleet).
- **Interactive Service Area ZIP Checker:** Enter any 5-digit US ZIP code (e.g., `78749`, `78704`, `78613`) to verify instant coverage.
- **Comprehensive FAQ Section:** Accordion covering diagnostics, repair vs. replacement rules of thumb, warranty terms, and financing.
- **Full Dedicated Pages:**
  - `/services`: In-depth breakdown with equipment specifications and guarantees.
  - `/about`: Company philosophy, 4-stage diagnostic protocol, and demo team profiles.
  - `/contact`: Direct inquiry form, operating hours, emergency line, and vector coverage map.

---

## 4. Multi-Step Quote Request System

A 4-step guided intake form engineered to maximize conversion on both mobile and desktop:
- **Step 1 — Customer Info:** Full Name, Validated Email, 10-Digit Phone Number.
- **Step 2 — Service Details:** Primary Category, Property Type, Urgency Level (`Emergency - Today`, `Within 24-48 Hours`, `This Week`, `Flexible`), Problem Symptoms.
- **Step 3 — Scheduling & Location:** Date picker (disallows past dates), 4-Hour Time Window, 5-Digit ZIP code, Street Address.
- **Step 4 — Review & Privacy Consent:** Summary preview, TCPA-compliant messaging consent, submission.
- **Instant Client Wow Factor:** Upon submission, a success card presents a unique reference number (e.g. `AF-8422`) with an explicit button: **"View This Lead in Contractor CRM Dashboard"**, allowing prospective clients to see their enquiry land in real time!

---

## 5. Contractor Demonstration CRM & Dispatch Console

- **Executive Overview:**
  - KPI metric cards: Total Enquiries, New Enquiries, Pipeline Value ($ USD), Scheduled Appointments.
  - Interactive SVG visual charts:
    - *Enquiries Over Time* (7-day intake volume)
    - *Lead Status Pipeline* (Donut percentage breakdown)
    - *Service Request Demand* (Horizontal progress breakdown)
  - Live activity feed showing status changes and time-stamped actions.
- **Lead Management Table:**
  - Search by customer name, phone, email, reference code, or ZIP.
  - Filter by status (`New`, `Contacted`, `Quote Sent`, `Scheduled`, `Completed`, `Lost`) and service category.
  - Quick inline status switcher.
  - Slide-Over Lead Detail Drawer: Full customer profile, click-to-call/email, problem description, internal notes logger, activity audit trail.
  - 1-Click "Convert Lead to Appointment" modal assigning technician, date, and arrival window.
  - Manual Inbound Lead Modal for phone-in inquiries.
- **Appointment Management:**
  - Toggle between **List View** and **Interactive Calendar Month Grid**.
  - Track technician assignment (David Chen, Marcus Vance, Elena Rostova).
  - Create, reschedule, cancel, or mark appointments completed.
- **Services Catalogue Editor:**
  - Edit starting prices, turnaround guarantees, and short/full descriptions with instant updates reflected across the public website.
- **Settings & Demo Utilities:**
  - Manage company contact info, emergency numbers, business hours, and covered ZIP codes.
  - Notification toggles for dispatchers.
  - Demo Presentation Tools: "Inject Realistic Test Lead", "Export Leads to JSON", and "Reset All Demo Records".

---

## 6. Storage Architecture & Production Database Guidance

### Current Demonstration Storage Engine
For immediate, zero-friction client presentations without external database configuration, this demo uses a reactive, client-persisted storage engine with `localStorage` synchronization.

- **Strengths:** Zero latency, works offline, preserves edits across page refreshes, and includes demo reset and JSON export capabilities.
- **Limitation Note for Clients:** Local storage is scoped to the current browser and is not a multi-user production database.

### Production Database Migration (For Real Client Implementations)
When delivering a paid project for a live HVAC company:
1. **Relational Database:** Provision **PostgreSQL** (via Supabase or Google Cloud SQL) with tables for `leads`, `appointments`, `technicians`, and `audit_logs`.
2. **Authentication:** Implement Firebase Auth or Supabase Auth with Role-Based Access Control (RBAC: `Dispatcher`, `Technician`, `Owner`).
3. **SMS & Email Gateway:** Connect Twilio for automated SMS dispatch notifications to on-call technicians, and SendGrid/Postmark for instant estimate confirmations.

---

## 7. Local Development & Deployment

### Running Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Linting
```bash
npm run lint
npm run build
```

---

© ArcticFlow Heating & Cooling — Built with the LeadFlow Architecture.
