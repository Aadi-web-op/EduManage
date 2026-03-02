import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Input, Button } from '../../components/ui';
import { MOCK_TEAM } from '../../data/mockData';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' }
  ];

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8 relative z-10">
      <div className="flex flex-col md:flex-row gap-8">
        <Card hover={false} className="w-full md:w-64 shrink-0 p-4 h-fit border-none shadow-none bg-white/40 dark:bg-slate-900/20">
          <nav className="flex flex-col space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === tab.id
                    ? 'bg-[#6A89A7] text-white shadow-md shadow-[#6A89A7]/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <Card hover={false} className="p-8 space-y-6">
                  <h3 className="text-xl font-bold text-[#384959] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Profile Information</h3>
                  <div className="flex items-center gap-6">
                    <img src={MOCK_TEAM[0].avatar} alt="Profile" className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white dark:border-slate-700" />
                    <Button variant="secondary">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <Input label="Full Name" defaultValue="Dr. Sarah Chen" />
                    <Input label="Professional Title" defaultValue="Principal Investigator" />
                    <Input label="Email Address" defaultValue="s.chen@edumanage.edu" disabled />
                    <Input label="Department" defaultValue="Computer Science" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card hover={false} className="p-8 space-y-6">
                  <h3 className="text-xl font-bold text-[#384959] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Email Alerts', desc: 'Receive updates about your proposals via email.' },
                      { title: 'Application Deadlines', desc: 'Get reminded 48 hours before an event closes.' },
                      { title: 'New Event Matches', desc: 'Notify me when an event matches my profile.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20">
                        <div>
                          <p className="font-bold text-[#384959] dark:text-white">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#6A89A7]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card hover={false} className="p-8 space-y-6">
                  <h3 className="text-xl font-bold text-[#384959] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Password & Security</h3>
                  <div className="space-y-4 max-w-md">
                    <Input label="Current Password" type="password" placeholder="••••••••" />
                    <Input label="New Password" type="password" placeholder="••••••••" />
                    <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                    <div className="pt-4">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
