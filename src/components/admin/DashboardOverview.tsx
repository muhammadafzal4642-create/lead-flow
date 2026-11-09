import React from 'react';
import { useLeadFlow } from '../../context/LeadFlowContext';
import { 
  Users, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { leads, appointments, setAdminTab, services } = useLeadFlow();

  // Metrics computation
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const pendingLeads = leads.filter((l) => l.status === 'Contacted' || l.status === 'Quote Sent').length;
  const scheduledLeads = leads.filter((l) => l.status === 'Scheduled').length;
  const completedLeads = leads.filter((l) => l.status === 'Completed').length;
  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

  // Status distribution
  const statusCounts = {
    New: leads.filter((l) => l.status === 'New').length,
    Contacted: leads.filter((l) => l.status === 'Contacted').length,
    'Quote Sent': leads.filter((l) => l.status === 'Quote Sent').length,
    Scheduled: leads.filter((l) => l.status === 'Scheduled').length,
    Completed: leads.filter((l) => l.status === 'Completed').length,
    Lost: leads.filter((l) => l.status === 'Lost').length
  };

  // Service distribution
  const serviceCounts: Record<string, number> = {};
  leads.forEach((l) => {
    serviceCounts[l.serviceType] = (serviceCounts[l.serviceType] || 0) + 1;
  });

  // Recent activity stream across all leads
  const allActivities = leads
    .flatMap((l) =>
      l.activityLog.map((act) => ({
        ...act,
        leadName: l.fullName,
        leadId: l.id,
        ref: l.referenceCode,
        service: l.serviceType
      }))
    )
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Demonstration Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Demonstration Sample Data Active:</strong> All metrics, pipeline calculations, and appointment queues reflect seeded demo scenarios for prospective client demonstration.
          </span>
        </div>
        <button
          onClick={() => setAdminTab('leads')}
          className="font-bold text-blue-700 hover:text-blue-900 underline whitespace-nowrap"
        >
          Manage All Inbound Leads →
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Enquiries</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {totalLeads}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Captured via Website Funnel</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>New Enquiries</span>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 tabular-nums">
            {newLeads}
          </div>
          <div className="text-[11px] text-slate-500">
            Awaiting dispatcher first contact
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Active Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">
            Estimated repair & install value
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Scheduled Service</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600 tabular-nums">
            {scheduledLeads}
          </div>
          <div className="text-[11px] text-slate-500">
            Appointments booked with tech
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Enquiries Over Time Visual Chart (SVG Bar/Trend chart) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enquiries Over Time</h3>
              <p className="text-xs text-slate-500">Recent 7-day intake volume from website quote forms</p>
            </div>
            <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
              Daily Volume
            </div>
          </div>

          {/* SVG Bar Chart with values */}
          <div className="pt-4">
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-slate-200 pb-2">
              {[
                { day: 'Mon', count: 3, label: '3 leads' },
                { day: 'Tue', count: 5, label: '5 leads' },
                { day: 'Wed', count: 4, label: '4 leads' },
                { day: 'Thu', count: 7, label: '7 leads' },
                { day: 'Fri', count: 6, label: '6 leads' },
                { day: 'Sat', count: 8, label: '8 leads' },
                { day: 'Today', count: Math.max(newLeads + 2, 6), label: 'Live today', highlight: true }
              ].map((item, idx) => {
                const maxCount = 10;
                const heightPct = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[11px] font-bold text-slate-600 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.count}
                    </span>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg h-36 flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          item.highlight
                            ? 'bg-gradient-to-t from-blue-700 to-sky-500'
                            : 'bg-blue-600/70 group-hover:bg-blue-600'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${item.highlight ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Peak intake: Saturday & Sunday emergency cooling calls</span>
            <span className="text-emerald-600 font-semibold">+42% vs previous period</span>
          </div>
        </div>

        {/* Lead Status Distribution (Donut Breakdown) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Lead Status Pipeline</h3>
            <p className="text-xs text-slate-500">Distribution across active conversion stages</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { status: 'New', count: statusCounts.New, color: 'bg-amber-400' },
              { status: 'Contacted', count: statusCounts.Contacted, color: 'bg-sky-500' },
              { status: 'Quote Sent', count: statusCounts['Quote Sent'], color: 'bg-indigo-500' },
              { status: 'Scheduled', count: statusCounts.Scheduled, color: 'bg-blue-600' },
              { status: 'Completed', count: statusCounts.Completed, color: 'bg-emerald-500' },
              { status: 'Lost', count: statusCounts.Lost, color: 'bg-slate-400' }
            ].map((s) => {
              const pct = totalLeads > 0 ? Math.round((s.count / totalLeads) * 100) : 0;
              return (
                <div key={s.status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{s.status}</span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {s.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full ${s.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Conversion target: 70%+ of Contacted leads converted to Scheduled.
          </div>
        </div>

      </div>

      {/* Bottom Section: Service Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Service Request Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Service Request Demand</h3>
          <p className="text-xs text-slate-500">Breakdown of customer service requests</p>

          <div className="space-y-3.5 pt-2">
            {services.map((srv) => {
              const count = serviceCounts[srv.name] || 0;
              const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div key={srv.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{srv.name}</span>
                    <span className="font-mono text-slate-500 tabular-nums">{count} enquiries</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(pct, count > 0 ? 15 : 0)}%` }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Lead Activity Feed</h3>
            <button
              onClick={() => setAdminTab('leads')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All Leads →
            </button>
          </div>

          <div className="space-y-3">
            {allActivities.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No recent activities recorded.</p>
            ) : (
              allActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{act.leadName}</span>
                      <span className="font-mono text-[11px] text-slate-500 font-normal">
                        ({act.ref})
                      </span>
                    </div>
                    <div className="text-slate-600">
                      <span className="font-semibold text-blue-600">{act.action}</span>
                      {act.note && <span className="text-slate-500"> — "{act.note}"</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono block">{act.timestamp}</span>
                    <span className="text-[10px] text-slate-500 block">{act.actor}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
