import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// eslint-disable-next-line no-unused-vars
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-[var(--border-color)] rounded-lg bg-[var(--bg-muted)]">
    <div className="rounded-full bg-[var(--bg-card)] p-4 mb-4 shadow-sm border border-[var(--border-color)]">
      <Icon className="w-8 h-8 text-[var(--text-muted)]" />
    </div>
    <h3 className="text-lg font-semibold text-[var(--text-main)] mb-1">{title}</h3>
    <p className="text-sm text-[var(--text-muted)] max-w-sm mb-6 leading-relaxed">{description}</p>
    {action}
  </div>
);

export const SkeletonEventCard = () => (
  <div className="rounded border border-[var(--border-color)] bg-[var(--bg-card)] p-5 h-[210px] flex flex-col justify-between shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="w-20 h-6 bg-[var(--bg-muted)] rounded animate-pulse" />
      <div className="w-16 h-5 bg-[var(--bg-muted)] rounded-full animate-pulse" />
    </div>
    <div className="w-3/4 h-6 bg-[var(--bg-muted)] rounded animate-pulse mb-6" />

    <div className="space-y-3 mt-auto">
      <div className="w-full h-4 bg-[var(--bg-muted)] rounded animate-pulse" />
      <div className="w-5/6 h-4 bg-[var(--bg-muted)] rounded animate-pulse" />
    </div>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B1215]/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} rounded bg-[var(--bg-card)] shadow-2xl border border-[var(--border-color)] overflow-hidden flex flex-col max-h-[90vh]`}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-muted)] px-6 py-4">
              <h3 className="text-lg font-semibold text-[var(--text-main)]">{title}</h3>
              <button type="button" onClick={onClose} className="rounded p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 overflow-y-auto flex-1 bg-[var(--bg-warm)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};