import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, UploadCloud, AlertCircle, FileCheck, FileText } from 'lucide-react';
import { Button, Input, Badge } from '../ui';
import { AnimatedSubmitButton } from '../ui/animated';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AppContext } from '../../contexts/AppContext';

export const WizardStepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex items-center justify-center w-full mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center relative">
                        <motion.div
                            initial={false}
                            animate={{
                                backgroundColor: currentStep > index + 1 ? '#6A89A7' : currentStep === index + 1 ? '#88BDF2' : 'transparent',
                                borderColor: currentStep >= index + 1 ? (currentStep > index + 1 ? '#6A89A7' : '#88BDF2') : '#cbd5e1',
                                color: currentStep >= index + 1 ? '#fff' : '#94a3b8'
                            }}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold z-10 bg-white dark:bg-slate-900 transition-colors duration-300`}
                        >
                            {currentStep > index + 1 ? <Check size={20} /> : index + 1}
                        </motion.div>
                        <span className={`absolute -bottom-6 text-xs font-bold whitespace-nowrap ${currentStep === index + 1 ? 'text-[#6A89A7]' : 'text-slate-500'}`}>
                            {['Project Info', 'Team Details', 'Uploads', 'Review'][index]}
                        </span>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className="flex-1 h-0.5 mx-2 bg-slate-200 dark:bg-slate-800 relative z-0 mt-[-24px]">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-[#6A89A7]"
                                initial={{ width: '0%' }}
                                animate={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export const ApplicationWizard = ({ event, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [direction, setDirection] = useState(1);
    const totalSteps = 4;
    const { isDark } = useContext(ThemeContext);
    const { teamMembers } = useContext(AppContext);

    const handlePrev = () => changeStep(Math.max(step - 1, 1));

    const changeStep = (newStep) => {
        setDirection(newStep > step ? 1 : -1);
        setStep(newStep);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: 99999 }}
        >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                className={`relative w-full max-w-3xl backdrop-blur-xl border rounded-[24px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${isDark ? 'bg-[rgba(30,30,30,0.85)] border-white/10' : 'bg-[rgba(255,255,255,0.95)] border-white/60'
                    }`}
            >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-white/20 dark:border-white/5 flex items-center justify-between shrink-0 bg-white/50 dark:bg-black/20">
                    <div>
                        <h2 className="text-2xl font-bold text-[#384959] dark:text-white">Submit Proposal</h2>
                        <p className="text-slate-500 text-sm mt-1">Applying for: <span className="font-semibold text-[#6A89A7]">{event?.title}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <WizardStepIndicator currentStep={step} totalSteps={totalSteps} />

                    <div className="relative min-h-[350px] mt-8 overflow-hidden px-1">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                className="absolute inset-0 w-full"
                            >
                                {step === 1 && (
                                    <div className="space-y-5">
                                        <Input label="Project Title" placeholder="e.g., Quantum Error Correction Framework" />
                                        <Input label="Team/Organization Name" placeholder="e.g., Nexus Research Lab" />
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Executive Summary</label>
                                            <textarea
                                                rows={4}
                                                className="w-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[12px] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6A89A7]/50 focus:border-[#6A89A7] transition-all resize-none"
                                                placeholder="Briefly describe the problem and your proposed solution..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold text-[#384959] dark:text-white">Project Team</h3>
                                                <p className="text-sm text-slate-500">Manage members for this specific proposal.</p>
                                            </div>
                                            <Button variant="secondary" size="sm"><Plus size={16} /> Add Member</Button>
                                        </div>
                                        <div className="space-y-3">
                                            {teamMembers.map(member => (
                                                <div key={member.id} className="flex items-center justify-between p-4 rounded-[14px] border border-white/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <img src={member.avatar} alt="" className="w-10 h-10 rounded-xl" />
                                                        <div>
                                                            <p className="text-sm font-bold text-[#384959] dark:text-white">{member.name}</p>
                                                            <p className="text-xs text-slate-500">{member.role}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="primary">{member.department}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6 h-full flex flex-col justify-center">
                                        <div className="border-2 border-dashed border-[#6A89A7]/30 dark:border-[#6A89A7]/20 rounded-[20px] p-10 flex flex-col items-center justify-center text-center hover:bg-[#6A89A7]/5 transition-colors cursor-pointer group bg-white/40 dark:bg-black/20">
                                            <div className="w-16 h-16 bg-[#BDDDFC]/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <UploadCloud size={32} className="text-[#6A89A7]" />
                                            </div>
                                            <h4 className="text-base font-bold text-[#384959] dark:text-white mb-1">Upload Proposal Document</h4>
                                            <p className="text-sm text-slate-500 mb-4">Drag and drop your PDF here, or click to browse.</p>
                                            <Button variant="secondary" size="sm">Select File</Button>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-[#BDDDFC]/30 rounded-[14px] text-[#384959] dark:text-[#BDDDFC]">
                                            <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                            <p className="text-sm font-medium">Ensure your document follows the formatting guidelines specified in the event details. Maximum file size: 50MB.</p>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-[#BDDDFC]/40 text-[#6A89A7] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#6A89A7]/20 shadow-lg shadow-[#6A89A7]/10">
                                                <FileCheck size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#384959] dark:text-white">Ready to Submit</h3>
                                            <p className="text-slate-500 text-sm">Please review your information before final submission.</p>
                                        </div>

                                        <div className="space-y-4 bg-white/50 dark:bg-slate-900/50 p-6 rounded-[20px] border border-white/60 dark:border-slate-800 shadow-sm">
                                            <div className="grid grid-cols-3 gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                                                <div className="col-span-1 text-sm font-semibold text-slate-500">Event</div>
                                                <div className="col-span-2 text-sm font-bold text-[#384959] dark:text-white">{event?.title}</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                                                <div className="col-span-1 text-sm font-semibold text-slate-500">Project Title</div>
                                                <div className="col-span-2 text-sm font-bold text-[#384959] dark:text-white">Quantum Error Correction Framework</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                                                <div className="col-span-1 text-sm font-semibold text-slate-500">Team Size</div>
                                                <div className="col-span-2 text-sm font-bold text-[#384959] dark:text-white">3 Members</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-1 text-sm font-semibold text-slate-500">Document</div>
                                                <div className="col-span-2 flex items-center gap-2 text-sm font-bold text-[#6A89A7]">
                                                    <FileText size={16} /> proposal_draft_v2.pdf
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-5 border-t border-white/20 dark:border-white/5 bg-white/50 dark:bg-black/20 flex justify-between items-center shrink-0">
                    <Button variant="ghost" onClick={handlePrev} disabled={step === 1 || isSubmitting}>
                        Back
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>Save Draft</Button>
                        {step < totalSteps ? (
                            <Button onClick={() => changeStep(step + 1)}>Continue to {['Team', 'Uploads', 'Review'][step - 1]}</Button>
                        ) : (
                            <AnimatedSubmitButton onClick={handleSubmit} isLoading={isSubmitting}>
                                Submit Proposal
                            </AnimatedSubmitButton>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
