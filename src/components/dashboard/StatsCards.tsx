'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';

export function StatsCards() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Attendance %', value: profile?.attendance_percent ? `${profile.attendance_percent}%` : '--%', highlight: true },
    { label: 'CGPA', value: profile?.gpa ? profile.gpa.toString() : '--', highlight: false },
    { label: 'Pending Assignments', value: '3', highlight: false },
    { label: 'Days to Next Exam', value: '14', highlight: true }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={item}>
          <Card className="bg-primary/95 backdrop-blur-xl border-none text-white overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative h-full">
            <CardContent className="p-6 flex flex-col justify-center h-full relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <p className="text-sm text-white/70 font-medium mb-1 z-10">{stat.label}</p>
              <h3 className="text-3xl font-bold text-secondary z-10 group-hover:scale-105 transform origin-left transition-transform duration-150">{stat.value}</h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
