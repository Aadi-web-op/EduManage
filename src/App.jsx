import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ThemeContext } from './contexts/ThemeContext';
import { AppContext } from './contexts/AppContext';
import { MOCK_NOTIFICATIONS, MOCK_TEAM } from './data/mockData';
import Login from './pages/Auth/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import { ApplicationWizard } from './components/shared/ApplicationWizard';

export default function App() {
  // Set default to false (Light Mode initially)
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [teamMembers, setTeamMembers] = useState(MOCK_TEAM);

  const addTeamMember = (member) => {
    setTeamMembers([...teamMembers, { ...member, id: Date.now() }]);
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  // Apply theme to document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('events');
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AppContext.Provider value={{
        user: isAuthenticated ? {} : null, login, logout,
        currentView, setView: setCurrentView, notifications, markAllRead,
        selectedEvent, setSelectedEvent, teamMembers, addTeamMember, removeTeamMember
      }}>
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div key="login" className="h-full" exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}>
              <Login />
            </motion.div>
          ) : (
            <motion.div key="dashboard" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <DashboardLayout />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render Modal at the absolute root to completely avoid stacking context traps */}
        <AnimatePresence>
          {selectedEvent && (
            <ApplicationWizard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          )}
        </AnimatePresence>
        <Analytics />
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}