import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { AppContext } from '../../contexts/AppContext';
import { MOCK_TEAM } from '../../data/mockData';

export default function Login() {
  const { login } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#F8F9FA] dark:bg-[#0d1117] text-[#384959]">
      {/* Animated Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#BDDDFC] dark:bg-[#6A89A7]/40 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#88BDF2] dark:bg-[#88BDF2]/30 mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#6A89A7] dark:bg-[#384959]/60 mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-60 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-[1000px] m-auto relative z-10 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-4 rounded-[32px] border border-white/60 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
        >
          {/* Login Graphic / Branding Side */}
          <div className="hidden md:flex flex-col justify-center h-full bg-gradient-to-br from-[#384959] to-[#6A89A7] rounded-[24px] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#88BDF2]/20 rounded-full blur-[40px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-xl">
                <Zap size={32} className="text-[#BDDDFC] fill-current" />
              </div>
              <h2 className="text-4xl font-extrabold mb-4 leading-tight">Empowering<br />Academic Innovation</h2>
              <p className="text-[#BDDDFC] font-medium text-lg max-w-sm mb-auto">Manage proposals, coordinate teams, and track research grants in one beautifully unified platform.</p>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {MOCK_TEAM.map(m => (
                    <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-2 border-[#384959]" alt="user" />
                  ))}
                </div>
                <p className="text-sm text-[#BDDDFC] font-medium">Join 2,000+ researchers</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-[#384959] dark:text-white tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500 font-medium">Log in to your institution portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Input label="Institutional Email" type="email" defaultValue="leader@university.edu" required />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <a href="#" className="text-xs text-[#6A89A7] font-bold hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[12px] px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6A89A7]/50 focus:border-[#6A89A7] transition-all"
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full !py-3 !rounded-[14px]" size="lg" isLoading={isLoading}>
                  Access Portal
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
