import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AppContext } from '../../contexts/AppContext';
import { AnimatedBackToTop } from '../ui/animated';
import DashboardEvents from '../../pages/Dashboard/Events';
import ProposalsList from '../../pages/Dashboard/MyProposals';
import TeamManager from '../../pages/Dashboard/TeamManagement';
import SettingsView from '../../pages/Dashboard/Settings';

export default function DashboardLayout() {
  const { currentView } = useContext(AppContext);
  const [showBTT, setShowBTT] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) {
      setShowBTT(true);
    } else {
      setShowBTT(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA] dark:bg-[#0d1117] transition-colors duration-500 relative">
      {/* Animated Gradient Background Elements for Dashboard */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#BDDDFC]/40 dark:bg-[#6A89A7]/10 mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#88BDF2]/30 dark:bg-[#88BDF2]/5 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative pl-0 md:pl-[80px] pb-[88px] md:pb-0 z-10">
        <Topbar />
        <main id="main-scroll-container" onScroll={handleScroll} className="flex-1 overflow-y-auto custom-scrollbar relative pb-20 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'events' && <DashboardEvents />}
              {currentView === 'proposals' && <ProposalsList />}
              {currentView === 'team' && <TeamManager />}
              {currentView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {showBTT && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-8 right-10 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 dark:border-white/10 pr-2 pl-4"
            >
              <AnimatedBackToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
