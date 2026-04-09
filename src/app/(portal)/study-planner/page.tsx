'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  MoreHorizontal,
  Flame,
  Target,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  category: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finish OS Deadlock Notes', category: 'Operating Systems', deadline: 'Today, 5:00 PM', priority: 'high', completed: false },
    { id: '2', title: 'Data Structures MCQ Practice', category: 'Algorithms', deadline: 'Tomorrow', priority: 'medium', completed: true },
    { id: '3', title: 'Submit Networking Assignment', category: 'Computer Networks', deadline: 'In 2 days', priority: 'high', completed: false },
    { id: '4', title: 'Read Chapter 4: Database Indexing', category: 'DBMS', deadline: 'Friday', priority: 'low', completed: false },
  ]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stats = [
    { label: 'Weekly Goal', value: '85%', icon: <Target className="w-5 h-5 text-secondary" /> },
    { label: 'Study Streak', value: '12 Days', icon: <Flame className="w-5 h-5 text-red-500" /> },
    { label: 'Points', value: '2,450', icon: <Trophy className="w-5 h-5 text-secondary" /> },
  ];

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-6 pb-12"
    >
      {/* Header section */}
      <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <h1 className="text-[28px] font-bold text-foreground tracking-tight flex items-center gap-3">
             Study Planner
             <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-secondary/20">Productivity Mode</span>
          </h1>
          <p className="text-sm font-semibold text-foreground/40 mt-1 uppercase tracking-widest pl-1">Organize your academic goals with AI insights</p>
        </div>
        <Button className="bg-primary hover:bg-secondary text-white font-bold h-11 px-6 rounded-xl shadow-lg transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" /> Add New Goal
        </Button>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={itemVars} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="premium-card bg-white/60">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-border/40 flex items-center justify-center shadow-inner">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Left column - Tasks */}
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-6">
          <Card className="premium-card overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-black/[0.02] flex flex-row items-center justify-between py-5">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                Active Study Tasks
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs font-bold rounded-lg text-foreground/40">All</Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-bold rounded-lg text-foreground/40">Pending</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/20">
                {tasks.map((task) => (
                  <div key={task.id} className="p-5 flex items-center justify-between group hover:bg-black/[0.01] transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <button 
                        className={cn(
                          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                          task.completed ? "bg-secondary border-secondary" : "border-border/40 hover:border-secondary"
                        )}
                        onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                      >
                        {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                      <div className="min-w-0">
                        <h4 className={cn(
                          "font-bold text-sm truncate",
                          task.completed ? "text-foreground/30 line-through" : "text-foreground"
                        )}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-foreground/40 uppercase bg-black/5 px-2 py-0.5 rounded shadow-sm">{task.category}</span>
                          <span className="text-[10px] font-bold text-foreground/40 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-secondary" /> {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded-full",
                         task.priority === 'high' ? "bg-red-500/10 text-red-500" :
                         task.priority === 'medium' ? "bg-secondary/10 text-secondary" : "bg-gray-100 text-gray-400"
                       )}>
                         {task.priority}
                       </span>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/20 group-hover:text-foreground/60">
                         <MoreHorizontal className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right column - Progress & Schedule */}
        <motion.div variants={itemVars} className="space-y-6">
          <Card className="premium-card p-6 bg-primary text-white overflow-hidden relative shadow-2xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 rounded-none" />
             <h3 className="text-md font-extrabold uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-secondary" />
                Next Deadline
             </h3>
             <div className="p-4 bg-white/10 rounded-2xl border border-white/10 mb-5 shadow-inner">
                <h4 className="text-xl font-black mb-1">Networking Project</h4>
                <p className="text-xs text-white/60 font-medium">Due in 46 hours • Submits to Canvas</p>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                   <span>Project Ready</span>
                   <span className="text-secondary">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-white/20" />
             </div>
             <Button className="w-full mt-6 bg-secondary hover:bg-white hover:text-secondary text-white font-bold h-11 tracking-wide shadow-lg border-none">
                Start Working
             </Button>
          </Card>

          <Card className="premium-card">
            <CardHeader className="border-b border-border/40 bg-black/[0.01] py-4">
              <CardTitle className="text-sm font-extrabold uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                Schedule Mockup
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
               {[
                 { time: '10:00 AM', title: 'Data Structures Lab', type: 'Offline' },
                 { time: '02:00 PM', title: 'Math Consultation', type: 'Online' },
                 { time: '07:00 PM', title: 'AI Quiz Session', type: 'Virtual' }
               ].map((slot, i) => (
                 <div key={i} className="flex gap-4 items-start relative pb-4 last:pb-0">
                    <div className="text-[10px] font-black text-foreground/30 uppercase mt-1 w-14 shrink-0">{slot.time}</div>
                    <div className="shrink-0 w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/10 mt-1.5" />
                    <div className="flex-1 min-w-0">
                       <h5 className="text-sm font-bold text-foreground leading-tight">{slot.title}</h5>
                       <span className="text-[10px] font-bold text-foreground/40 uppercase">{slot.type}</span>
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
