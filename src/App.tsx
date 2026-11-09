import React from 'react';
import { LeadFlowProvider, useLeadFlow } from './context/LeadFlowContext';
import { DemoPresentationBanner } from './components/common/DemoPresentationBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { ServiceHighlights } from './components/public/ServiceHighlights';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { ServiceAreaSection } from './components/public/ServiceAreaSection';
import { FaqSection } from './components/public/FaqSection';
import { Footer } from './components/public/Footer';
import { ServicesPage } from './components/public/ServicesPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage } from './components/public/ContactPage';
import { QuoteModal } from './components/public/QuoteModal';
import { AdminLayout } from './components/admin/AdminLayout';

const AppContent: React.FC = () => {
  const { currentView, publicPage } = useLeadFlow();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Demonstration Presentation Banner */}
      <DemoPresentationBanner />

      {/* Main Switcher: Public Website vs Demonstration Contractor CRM */}
      {currentView === 'public' ? (
        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1">
            {publicPage === 'home' && (
              <>
                <Hero />
                <ServiceHighlights />
                <WhyChooseUs />
                <ServiceAreaSection />
                <FaqSection />
              </>
            )}

            {publicPage === 'services' && <ServicesPage />}
            {publicPage === 'about' && <AboutPage />}
            {publicPage === 'contact' && <ContactPage />}
          </main>

          <Footer />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <AdminLayout />
        </div>
      )}

      {/* Universal Multi-Step Quote System Modal */}
      <QuoteModal />

      {/* Tactile System Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LeadFlowProvider>
      <AppContent />
    </LeadFlowProvider>
  );
}
