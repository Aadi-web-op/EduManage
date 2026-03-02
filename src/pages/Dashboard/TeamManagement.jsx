import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreVertical, Shield, Trash2, X, ChevronDown } from 'lucide-react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { AppContext } from '../../contexts/AppContext';

export default function TeamManager() {
  const { teamMembers, addTeamMember, removeTeamMember } = React.useContext(AppContext);
  const [isAdding, setIsAdding] = React.useState(false);
  const [newMember, setNewMember] = React.useState({ name: '', email: '', role: '', department: 'Engineering' });

  const handleAddSubmit = () => {
    if (newMember.name && newMember.email && newMember.role) {
      addTeamMember({
        ...newMember,
        avatar: `https://i.pravatar.cc/150?u=${newMember.email}`
      });
      setNewMember({ name: '', email: '', role: '', department: 'Engineering' });
      setIsAdding(false);
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#384959] dark:text-white tracking-tight">Team Roster</h2>
        </div>
        <Button onClick={() => setIsAdding(true)} className="w-full md:w-auto"><Plus size={18} /> Add Member</Button>
      </div>

      <Card hover={false} className="overflow-hidden !p-0">
        <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-white/50 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs font-bold text-[#384959] dark:text-slate-400 uppercase tracking-wider">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-3">Department</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-white/40 dark:divide-slate-800/50">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:grid md:grid-cols-12 gap-4 p-5 md:items-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors group cursor-pointer relative"
            >
              <div className="md:col-span-5 flex items-center gap-5">
                <div className="relative">
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-white dark:border-slate-700" />
                  {member.role?.includes('Principal') && (
                    <div className="absolute -bottom-2 -right-2 bg-[#88BDF2] text-[#384959] p-1 rounded-lg shadow-sm border-2 border-white dark:border-slate-900">
                      <Shield size={12} className="fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-bold text-[#384959] dark:text-white">{member.name}</p>
                  <p className="text-sm text-slate-500 font-medium">{member.email}</p>
                </div>
              </div>
              <div className="md:col-span-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300"><span className="md:hidden text-xs text-slate-400 uppercase mr-2">Role:</span>{member.role}</span>
              </div>
              <div className="md:col-span-3">
                <Badge variant="primary">{member.department}</Badge>
              </div>
              <div className="absolute top-4 right-4 md:static md:col-span-1 flex justify-end">
                <Button variant="danger" size="sm" className="opacity-100 md:opacity-0 group-hover:opacity-100" onClick={() => removeTeamMember(member.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#384959] dark:text-white">Add New Member</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <Input
                  label="Name"
                  placeholder="e.g. Jane Doe"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <Input
                  label="Email"
                  placeholder="jane@example.com"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
                <Input
                  label="Role"
                  placeholder="e.g. Senior Researcher"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                />
                <div className="space-y-1.5 flex flex-col items-start w-full">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" className="w-full justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-normal text-slate-900 dark:text-white px-4 py-2.5 h-[42px]">
                        {newMember.department}
                        <ChevronDown size={16} className="text-slate-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[380px] bg-white/95 backdrop-blur-md border border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 absolute -translate-y-2">
                      <DropdownMenuItem onClick={() => setNewMember({ ...newMember, department: 'Engineering' })}>Engineering</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewMember({ ...newMember, department: 'Research' })}>Research</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewMember({ ...newMember, department: 'Design' })}>Design</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewMember({ ...newMember, department: 'Operations' })}>Operations</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
                <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={handleAddSubmit}>Add Member</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
