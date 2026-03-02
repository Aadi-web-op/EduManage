export const MOCK_EVENTS = [
  { id: 1, title: 'Quantum Computing Symposium 2026', category: 'Research', status: 'Open', deadline: '2026-04-15', applicants: 142, description: 'Seeking groundbreaking proposals in quantum algorithm optimization and hardware scaling.' },
  { id: 2, title: 'Global AI Ethics Hackathon', category: 'Hackathon', status: 'Closing Soon', deadline: '2026-03-05', applicants: 89, description: 'Develop frameworks and technical solutions for unbiased AI decision-making systems.' },
  { id: 3, title: 'Sustainable Urban Tech Grant', category: 'Grant', status: 'Open', deadline: '2026-05-01', applicants: 56, description: 'Funding innovative proposals for smart city infrastructure and green energy integration.' },
  { id: 4, title: 'FinTech Innovation Lab Cohort', category: 'Incubator', status: 'Closed', deadline: '2026-01-20', applicants: 320, description: 'Intensive 12-week program for disruptive financial technology startups.' },
  { id: 5, title: 'Bio-Informatics Research Fellowship', category: 'Fellowship', status: 'Open', deadline: '2026-06-10', applicants: 24, description: 'Advanced fellowship for computational biology and genome data analysis.' },
];

export const MOCK_PROPOSALS = [
  { id: 'P-2041', event: 'Quantum Computing Symposium', title: 'Error Mitigation in NISQ Devices', status: 'Under Review', submittedAt: '2026-02-28', progress: 60 },
  { id: 'P-1982', event: 'Sustainable Urban Tech', title: 'IoT Driven Waste Management', status: 'Accepted', submittedAt: '2025-11-15', progress: 100 },
  { id: 'P-1855', event: 'FinTech Innovation', title: 'Decentralized Micro-Lending', status: 'Rejected', submittedAt: '2025-10-01', progress: 100 },
];

export const MOCK_TEAM = [
  { id: 1, name: 'Dr. Sarah Chen', role: 'Principal Investigator', email: 's.chen@edumanage.edu', department: 'Computer Science', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 2, name: 'Alex Rivera', role: 'Lead Engineer', email: 'a.rivera@edumanage.edu', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: 3, name: 'Elena Rostova', role: 'Data Scientist', email: 'e.rostova@edumanage.edu', department: 'Mathematics', avatar: 'https://i.pravatar.cc/150?u=elena' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Proposal Accepted', message: 'Your proposal "IoT Driven Waste Management" has been accepted.', time: '2h ago', read: false },
  { id: 2, title: 'Event Closing Soon', message: 'Global AI Ethics Hackathon closes in 2 days.', time: '5h ago', read: false },
  { id: 3, title: 'New Event Match', message: 'A new grant matching your research profile was posted.', time: '1d ago', read: true }
];