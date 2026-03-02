import React from 'react';
import { MOCK_PAST_SUBMISSIONS } from '../../data/mockData';
import { FileText, Download } from 'lucide-react';
import { CustomCard, CustomButton } from '../../components/ui';
import { motion } from 'framer-motion';

const PastSubmissions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Archive & Feedback</h2>
        <p className="text-base font-medium text-[var(--text-muted)] mt-1.5">Review past proposals and institutional committee feedback.</p>
      </div>

      <motion.div
        className="space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {MOCK_PAST_SUBMISSIONS.map(sub => (
          <motion.div
            key={sub.id}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <CustomCard hoverEffect={true} className="p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[var(--text-main)] leading-tight">{sub.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset ${sub.status === 'Completed' ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 ring-emerald-500/20' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 ring-red-500/20'}`}>{sub.status}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] font-medium">Target Event: <span className="font-semibold text-[var(--text-main)]">{sub.event}</span></p>
                </div>
                <CustomButton variant="secondary" className="shrink-0 group"><Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Download PDF</CustomButton>
              </div>
              <div className="bg-gradient-to-br from-[var(--bg-muted)]/50 to-transparent p-5 rounded-lg border border-[var(--border-color)]">
                <h4 className="text-sm font-bold tracking-wide uppercase text-[var(--text-main)] mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-[var(--primary)]" />
                  Committee Feedback
                </h4>
                <p className="text-[15px] font-medium text-[var(--text-muted)] italic leading-relaxed">"{sub.feedback}"</p>
              </div>
            </CustomCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PastSubmissions;
