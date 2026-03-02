import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { MOCK_TEAM } from '../../data/mockData';

export const Topbar = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const { currentView, notifications, markAllRead } = useContext(AppContext);
    const [showNotifications, setShowNotifications] = useState(false);

    const breadcrumbs = {
        events: 'Live Events',
        proposals: 'My Proposals',
        team: 'Team Management',
        settings: 'Platform Settings'
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-24 sticky top-0 z-40 flex items-center justify-between px-10">
            <div>
                <h1 className="text-3xl font-extrabold text-[#384959] dark:text-white capitalize tracking-tight">
                    {breadcrumbs[currentView]}
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#6A89A7] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search platform..."
                        className="w-72 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A89A7]/50 dark:text-white transition-all shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3 relative">
                    <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-[#6A89A7] rounded-full transition-all shadow-sm hover:scale-105 active:scale-95">
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative w-10 h-10 flex items-center justify-center bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-[#6A89A7] rounded-full transition-all shadow-sm hover:scale-105 active:scale-95"
                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                            )}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-2xl rounded-2xl overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                        <h3 className="font-bold text-[#384959] dark:text-white">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button onClick={markAllRead} className="text-xs text-[#6A89A7] hover:underline font-medium">Mark all read</button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                        {notifications.map(notif => (
                                            <div key={notif.id} className={`p-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${!notif.read ? 'bg-[#BDDDFC]/20 dark:bg-[#6A89A7]/10' : ''}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className={`text-sm ${!notif.read ? 'font-bold text-[#384959] dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>{notif.title}</h4>
                                                    <span className="text-[10px] text-slate-400">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notif.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-8 w-px bg-slate-300/50 dark:bg-slate-700 mx-2"></div>

                    <div className="flex items-center gap-3 cursor-pointer pl-2 hover:opacity-80 transition-opacity">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#384959] dark:text-white leading-none">Dr. Sarah Chen</p>
                            <p className="text-[11px] font-semibold text-[#6A89A7] mt-1">Team Leader</p>
                        </div>
                        <div className="relative">
                            <img src={MOCK_TEAM[0].avatar} alt="Profile" className="w-11 h-11 rounded-[14px] border-2 border-white dark:border-slate-700 object-cover shadow-md" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#88BDF2] rounded-full border-2 border-white dark:border-slate-900"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
