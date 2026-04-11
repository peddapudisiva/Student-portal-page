'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { EmptyState } from '@/components/ui/EmptyState';
import { ClipboardList, Archive } from 'lucide-react';

export default function AssignmentsPage() {
  const [tab, setTab] = useState<'pending' | 'submitted'>('pending');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const { user } = useAuth();
  const [dbAssignments, setDbAssignments] = useState<{ pending: Assignment[], submitted: Assignment[] }>({
    pending: [],
    submitted: []
  });

interface Assignment {
  id: string;
  subject: string;
  title: string;
  status: 'pending' | 'submitted';
  due?: string;
  deadline?: string;
  urgent?: boolean;
  submitted_on?: string;
  submittedOn?: string;
  grade?: string;
}

  useEffect(() => {
    if (!user) return;

    const fetchAssignments = async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('student_id', user.id);

      if (!error && data) {
        setDbAssignments({
          pending: (data as Assignment[]).filter(a => a.status === 'pending'),
          submitted: (data as Assignment[]).filter(a => a.status === 'submitted')
        });
      }
    };

    fetchAssignments();
  }, [user]);

  const MOCK_ASSIGNMENTS = {
    pending: [
      { id: 'm1', subject: 'Machine Learning', title: 'Neural Networks Implementation', due: 'Oct 25, 2026', urgent: true, status: 'pending' },
      { id: 'm2', subject: 'Cyber Security', title: 'Network Vulnerability Report', due: 'Oct 28, 2026', urgent: false, status: 'pending' },
      { id: 'm3', subject: 'Compiler Design', title: 'Lexical Analyzer Construction', due: 'Nov 02, 2026', urgent: false, status: 'pending' }
    ],
    submitted: [
      { id: 'm4', subject: 'Software Engineering', title: 'SRS Document - Hospital Mgmt', submitted_on: 'Oct 10, 2026', grade: 'A+', status: 'submitted' },
      { id: 'm5', subject: 'Cloud Computing', title: 'AWS EC2 Deployment Guide', submitted_on: 'Oct 05, 2026', grade: 'A', status: 'submitted' }
    ]
  };

  const displayAssignments = (dbAssignments.pending.length > 0 || dbAssignments.submitted.length > 0) 
    ? dbAssignments 
    : MOCK_ASSIGNMENTS;

  const hasPending = displayAssignments.pending.length > 0;
  const hasSubmitted = displayAssignments.submitted.length > 0;

  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight drop-shadow-sm">My Assignments</h1>
        <div className="bg-black/5 p-1.5 flex gap-1 rounded-xl backdrop-blur-md">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTab('pending')}
            className={`h-9 font-bold rounded-lg transition-all duration-200 ${tab === 'pending' ? 'bg-white text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground hover:bg-black/5'}`}
          >
            Pending
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTab('submitted')}
            className={`h-9 font-bold rounded-lg transition-all duration-200 ${tab === 'submitted' ? 'bg-white text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground hover:bg-black/5'}`}
          >
            Submitted
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'pending' ? (
          <motion.div key="pending" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
            {hasPending ? (
              displayAssignments.pending.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className={`premium-card transition-all duration-300 hover:shadow-xl ${item.urgent ? 'border-l-[6px] border-l-red-500' : 'border-l-[6px] border-l-transparent'} overflow-hidden relative`}>
                    {uploadingId === item.id && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0 pointer-events-none"></div>
                    )}
                    <CardContent className="p-7 flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-black/5 text-foreground/80 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide shadow-inner">{item.subject}</span>
                          {item.urgent && <span className="bg-red-500/10 text-red-600 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"><Clock className="w-3.5 h-3.5"/> Urgent</span>}
                        </div>
                        <h3 className="text-xl font-bold text-foreground leading-snug">{item.title}</h3>
                        <p className="text-sm font-semibold text-red-500 mt-2 uppercase tracking-wide flex items-center gap-2">Due Date <span className="text-foreground border-l border-border pl-2 py-0.5">{item.due || item.deadline}</span></p>
                      </div>
                      {uploadingId === item.id ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full md:w-96 border-2 border-dashed border-secondary bg-secondary/5 p-6 rounded-2xl text-center shadow-inner relative z-20 bg-white/90">
                          <UploadCloud className="w-10 h-10 text-secondary mx-auto mb-3" />
                          <p className="text-sm font-bold text-secondary mb-4 drop-shadow-sm">Drag & Drop or Click to Upload PDF</p>
                          <Input type="file" className="text-xs bg-white text-foreground" />
                          <div className="flex justify-end gap-3 mt-4">
                            <Button variant="ghost" size="sm" onClick={() => setUploadingId(null)} className="h-9 hover:bg-black/5 rounded-lg text-foreground/50 hover:text-foreground">Cancel</Button>
                            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white h-9 font-bold px-6 rounded-lg shadow-md hover:-translate-y-0.5 transition-transform">Submit</Button>
                          </div>
                        </motion.div>
                      ) : (
                        <Button onClick={() => setUploadingId(item.id)} className="bg-primary hover:bg-primary/90 text-white font-bold whitespace-nowrap rounded-full px-6 h-12 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                          <UploadCloud className="w-5 h-5 mr-2" /> Upload Work
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <EmptyState 
                icon={ClipboardList}
                title="No Pending Assignments"
                description="You've completed all your current tasks. Great job staying on top of your work!"
              />
            )}
          </motion.div>
        ) : (
          <motion.div key="submitted" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {hasSubmitted ? (
              displayAssignments.submitted.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="premium-card opacity-80 hover:opacity-100 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="bg-black/5 text-foreground/80 text-[11px] font-bold px-3 py-1.5 rounded-full inline-block mb-3 shadow-inner tracking-wide">{item.subject}</div>
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm font-semibold text-foreground/50 mt-2 uppercase tracking-wide">Submitted on {item.submitted_on || item.submittedOn}</p>
                      </div>
                      <div className="flex items-center gap-6 text-right bg-black/[0.02] p-4 rounded-2xl border border-border/30 shadow-inner">
                        <div>
                          <p className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest mb-1">Grade</p>
                          <p className="text-3xl font-extrabold text-secondary drop-shadow-sm">{item.grade}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-green-500 drop-shadow-sm" />
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <EmptyState 
                icon={Archive}
                title="No Submitted Work"
                description="Items you submit will appear here once they are processed by your instructors."
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
