import React, { useState } from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wrench, 
  Settings, 
  Globe, 
  LogOut, 
  PlusCircle, 
  Flame, 
  RefreshCw,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { AdminLoginModal } from './AdminLoginModal';
import { DashboardOverview } from './DashboardOverview';
import { LeadManagement } from './LeadManagement';
import { AppointmentManagement } from './AppointmentManagement';
import { ServiceManagement } from './ServiceManagement';
import { SettingsPage } from './SettingsPage';

export const AdminLayout: React.FC = () => {
  const { 
    adminTab, 
    setAdminTab, 
    setCurrentView, 
    leads, 
    appointments, 
    settings, 
    isAdminAuthenticated, 
    logoutAdmin,
    resetDemoData
  } = useLeadFlow();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <AdminLoginModal />;
  }

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const upcomingAptsCount = appointments.filter((a) => a.status === 'Scheduled').length;

  const handleTabChange = (tab: any) => {
    setAdminTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Flame className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">ArcticFlow CRM</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 text-slate-400 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 z-30`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-800 hidden md:flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  ArcticFlow
                </span>
                <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase block">
                  Contractor CRM
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => handleTabChange('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'leads'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads & Enquiries</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 rounded-full font-bold text-[10px] tabular-nums">
                  {newLeadsCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'appointments'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Appointments</span>
              </div>
              {upcomingAptsCount > 0 && (
                <span className="px-2 py-0.5 bg-slate-800 text-blue-400 border border-blue-500/30 rounded-full font-bold text-[10px] tabular-nums">
                  {upcomingAptsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'services'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Services & Pricing</span>
              </div>
            </button>

            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                adminTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Company Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setCurrentView('public')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Switch to Public Site</span>
          </button>

          <button
            onClick={resetDemoData}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Records</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>ArcticFlow Contractor Portal</span>
              <span>/</span>
              <span className="capitalize text-slate-900 font-bold">{adminTab}</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight capitalize mt-0.5">
              {adminTab === 'overview' && 'Executive Dashboard Overview'}
              {adminTab === 'leads' && 'Customer Enquiries & Sales Leads'}
              {adminTab === 'appointments' && 'Technician Dispatch & Appointments'}
              {adminTab === 'services' && 'HVAC Service Catalogue & Pricing'}
              {adminTab === 'settings' && 'Demonstration Business Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Preview Live Website</span>
            </button>
          </div>
        </header>

        {/* Tab View Body */}
        <div className="p-6 flex-1">
          {adminTab === 'overview' && <DashboardOverview />}
          {adminTab === 'leads' && <LeadManagement />}
          {adminTab === 'appointments' && <AppointmentManagement />}
          {adminTab === 'services' && <ServiceManagement />}
          {adminTab === 'settings' && <SettingsPage />}
        </div>
      </main>

    </div>
  );
};
