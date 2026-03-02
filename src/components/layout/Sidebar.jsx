import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, FileText, Users, Settings, LogOut, Zap } from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';

export const Sidebar = () => {
    const { currentView, setView, logout } = useContext(AppContext);
    const [isCollapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        { id: 'events', label: 'Live Events', icon: Rocket },
        { id: 'proposals', label: 'My Proposals', icon: FileText },
        { id: 'team', label: 'Team Management', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.aside
            onMouseEnter={() => !isMobile && setCollapsed(false)}
            onMouseLeave={() => !isMobile && setCollapsed(true)}
            initial={false}
            animate={{ width: isMobile ? '100%' : (isCollapsed ? 80 : 280) }}
            className="fixed max-md:bottom-0 max-md:top-auto max-md:left-0 max-md:!w-full max-md:h-[88px] max-md:flex-row md:top-0 md:left-0 z-50 flex flex-col md:h-screen bg-white/60 dark:bg-[#1a1c23]/80 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/40 dark:border-white/5 transition-all duration-400 ease-out shadow-[0_-12px_51px_rgba(0,0,0,0.05)] md:shadow-[12px_0_51px_rgba(0,0,0,0.05)]"
        >
            <div className="hidden md:flex items-center p-6 h-24 overflow-hidden shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#384959] to-[#6A89A7] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#6A89A7]/30">
                    <Zap size={20} className="fill-current" />
                </div>
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-4 font-bold text-2xl tracking-tight text-[#384959] dark:text-white whitespace-nowrap"
                        >
                            EduManage<span className="text-[#88BDF2]">.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex-1 max-md:flex max-md:flex-row max-md:items-center max-md:justify-around max-md:px-2 px-4 py-2 md:py-6 space-y-0 md:space-y-3 overflow-y-auto max-md:overflow-x-auto max-md:overflow-y-hidden custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`flex items-center max-md:justify-center max-md:w-auto w-full px-3 py-3.5 rounded-[14px] transition-all duration-300 relative overflow-hidden group ${isActive
                                ? 'bg-white max-md:bg-[#BDDDFC]/20 dark:bg-white/10 text-[#384959] dark:text-white shadow-sm max-md:shadow-none border border-white/60 dark:border-white/5 max-md:border-transparent'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-[#BDDDFC]/20 dark:hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {isActive && (
                                <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#88BDF2]" />
                            )}

                            <div className="shrink-0 flex items-center justify-center w-8">
                                <item.icon size={22} className={`${isActive ? 'stroke-[2.5px] text-[#6A89A7]' : 'stroke-2 group-hover:text-[#6A89A7] transition-colors'}`} />
                            </div>

                            <AnimatePresence mode="wait">
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="ml-4 font-semibold whitespace-nowrap hidden md:inline-block"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    );
                })}
            </div>

            <div className="max-md:hidden p-4 border-t border-white/40 dark:border-white/5">
                <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-3.5 rounded-[14px] text-slate-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors group overflow-hidden"
                >
                    <div className="shrink-0 flex items-center justify-center w-8">
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="ml-4 font-semibold whitespace-nowrap"
                            >
                                Sign Out
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    );
};
