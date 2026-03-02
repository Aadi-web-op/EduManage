import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';

export const Button = React.forwardRef(({ children, variant = 'primary', size = 'md', className = '', isLoading, ...props }, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-[12px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";

  const variants = {
    primary: "bg-[#384959] text-white hover:bg-[#6A89A7] shadow-lg shadow-[#384959]/25 focus:ring-[#384959]",
    secondary: "bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 focus:ring-slate-500 backdrop-blur-sm border border-slate-200 dark:border-slate-700",
    ghost: "text-[#384959] hover:bg-[#384959]/10 dark:text-slate-300 dark:hover:bg-white/5",
    danger: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:bg-rose-500/20 dark:hover:bg-rose-500/30"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
});
Button.displayName = "Button";

export const Input = ({ label, error, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <input
      className={`w-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[12px] px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A89A7]/50 focus:border-[#6A89A7] transition-all ${error ? 'border-rose-500 focus:ring-rose-500/50' : ''}`}
      {...props}
    />
    {error && <span className="text-xs text-rose-500">{error}</span>}
  </div>
);

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20",
    primary: "bg-[#BDDDFC]/40 text-[#384959] dark:bg-[#384959]/40 dark:text-[#BDDDFC] border-[#88BDF2]/30"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Card = ({ children, className = '', hover = true, onClick }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.05, borderColor: isDark ? '#fff' : '#000' } : {}}
      whileTap={hover ? { scale: 0.95, rotateZ: 1.7 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative box-border border border-white dark:border-white/10 backdrop-blur-md rounded-[17px] shadow-[12px_17px_51px_rgba(0,0,0,0.12)] dark:shadow-[12px_17px_51px_rgba(0,0,0,0.4)] overflow-hidden ${hover ? 'cursor-pointer' : ''} ${isDark ? 'bg-[rgba(30,30,30,0.58)]' : 'bg-[rgba(255,255,255,0.7)]'
        } ${className}`}
    >
      {children}
    </motion.div>
  );
};