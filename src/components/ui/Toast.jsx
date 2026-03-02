import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[200] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="pointer-events-auto flex items-center p-4 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 border min-w-[320px] bg-[var(--bg-card)]/90 backdrop-blur-md border-[var(--border-color)]"
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mr-3 shrink-0" /> :
            toast.type === 'error' ? <XCircle className="w-5 h-5 text-[var(--alert)] mr-3 shrink-0" /> :
              <AlertCircle className="w-5 h-5 text-[var(--primary)] mr-3 shrink-0" />}
          <p className="text-sm font-semibold text-[var(--text-main)] flex-1 leading-tight">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="ml-4 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1 rounded-full hover:bg-[var(--bg-muted)]">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ToastContainer;
