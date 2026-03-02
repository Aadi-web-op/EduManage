import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, MoreVertical } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { MOCK_PROPOSALS } from '../../data/mockData';

export default function ProposalsList() {
  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#384959] dark:text-white tracking-tight">Active Submissions</h2>
      </div>

      <div className="space-y-6">
        {MOCK_PROPOSALS.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover={true} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500">{proposal.id}</span>
                  <Badge variant={
                    proposal.status === 'Accepted' ? 'success' :
                      proposal.status === 'Rejected' ? 'danger' : 'warning'
                  }>
                    {proposal.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-[#384959] dark:text-white mb-1">{proposal.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                  <Rocket size={16} className="text-[#6A89A7]" /> {proposal.event}
                </p>
              </div>

              <div className="w-full md:w-64">
                <div className="flex justify-between text-sm mb-2 font-bold text-[#384959] dark:text-slate-300">
                  <span>Progress</span>
                  <span>{proposal.progress}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/50 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${proposal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${proposal.status === 'Accepted' ? 'bg-[#88BDF2]' :
                      proposal.status === 'Rejected' ? 'bg-rose-500' : 'bg-[#6A89A7]'
                      }`}
                  />
                </div>
              </div>

              <Button variant="ghost" className="shrink-0 w-12 h-12 rounded-full !p-0"><MoreVertical size={20} /></Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}