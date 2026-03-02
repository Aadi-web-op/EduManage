import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { AnimatedApplyButton } from '../../components/ui/animated';
import { AppContext } from '../../contexts/AppContext';
import { MOCK_EVENTS } from '../../data/mockData';

export default function DashboardEvents() {
  const { setSelectedEvent } = useContext(AppContext);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchCategory = filterCategory === 'All' || event.category === filterCategory;
    const matchStatus = filterStatus === 'All' || event.status === filterStatus;
    return matchCategory && matchStatus;
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-4 md:p-10 max-w-[1400px] mx-auto space-y-6 md:space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-[#6A89A7] font-bold tracking-wide uppercase text-sm mb-2">Platform Hub</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#384959] dark:text-white tracking-tight leading-tight">Discover Opportunities</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-md font-medium text-[#384959] dark:text-white border-slate-200 dark:border-slate-700">
                {filterCategory === 'All' ? 'All Categories' : filterCategory}
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-md border-slate-200 dark:bg-slate-900/95 dark:border-slate-700">
              <DropdownMenuItem onClick={() => setFilterCategory('All')}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Research')}>Research</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Hackathon')}>Hackathon</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Grant')}>Grant</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Incubator')}>Incubator</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Fellowship')}>Fellowship</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-md font-medium text-[#384959] dark:text-white border-slate-200 dark:border-slate-700">
                {filterStatus === 'All' ? 'All Statuses' : filterStatus}
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white/95 backdrop-blur-md border-slate-200 dark:bg-slate-900/95 dark:border-slate-700">
              <DropdownMenuItem onClick={() => setFilterStatus('All')}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Open')}>Open</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Closing Soon')}>Closing Soon</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('Closed')}>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div key={event.id} layout variants={item} initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="h-full">
              <Card className="h-full flex flex-col group" hover={true}>

                {/* Inspiration Palette Top Border */}
                <div className="flex h-2.5 w-full">
                  <div className="flex-1 bg-[#384959] transition-all duration-300 group-hover:flex-[2]"></div>
                  <div className="flex-1 bg-[#6A89A7] transition-all duration-300 group-hover:flex-[2]"></div>
                  <div className="flex-1 bg-[#88BDF2] transition-all duration-300 group-hover:flex-[2]"></div>
                  <div className="flex-1 bg-[#BDDDFC] transition-all duration-300 group-hover:flex-[2]"></div>
                  <div className="flex-1 bg-[#e0f0ff] transition-all duration-300 group-hover:flex-[2]"></div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-5">
                    <Badge variant="primary">{event.category}</Badge>
                    <Badge variant={event.status === 'Open' ? 'success' : event.status === 'Closed' ? 'default' : 'warning'}>
                      {event.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-[#384959] dark:text-white mb-3 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-[#6A89A7] font-semibold mt-auto mb-4">
                    <Calendar size={16} />
                    <span>Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="px-7 pb-6 w-full flex justify-center">
                  <AnimatedApplyButton
                    disabled={event.status === 'Closed'}
                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                  >
                    {event.status === 'Closed' ? 'CLOSED' : 'APPLY NOW'}
                  </AnimatedApplyButton>
                </div>

                {/* Inspiration Stats Footer */}
                <div className="h-14 w-full bg-white/50 dark:bg-black/20 backdrop-blur-sm border-t border-white/40 dark:border-white/5 flex items-center justify-between px-7">
                  <span className="text-[#888] font-semibold text-sm">{event.applicants} Submissions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" className="fill-[#bebebe] scale-125 group-hover:fill-[#6A89A7] transition-colors">
                    <path d="M4 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S5.5 9.83 5.5 9 4.83 7.5 4 7.5zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5z" />
                  </svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-bold">No events match your criteria.</p>
            <Button variant="ghost" className="mt-4" onClick={() => { setFilterCategory('All'); setFilterStatus('All'); }}>Clear Filters</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
