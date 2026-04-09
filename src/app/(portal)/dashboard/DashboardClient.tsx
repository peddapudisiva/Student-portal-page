'use client';

import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TodayTimetable } from '@/components/dashboard/TodayTimetable';
import { AnnouncementsFeed } from '@/components/dashboard/AnnouncementsFeed';
import { StreakTracker } from '@/components/dashboard/StreakTracker';
import { CalendarCheck, ClipboardList, GraduationCap, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardClient() {
  const quickActions = [
    { label: 'Attendance', icon: CalendarCheck, href: '/attendance' },
    { label: 'Assignment', icon: ClipboardList, href: '/assignments' },
    { label: 'Results', icon: GraduationCap, href: '/results' },
    { label: 'Pay Fees', icon: CreditCard, href: '/fees' },
  ];

  const containerAnimations = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const childAnimations = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={containerAnimations}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      <motion.div variants={childAnimations}>
        <WelcomeCard />
      </motion.div>
      
      <motion.div variants={childAnimations}>
        <StatsCards />
      </motion.div>
      
      <motion.div variants={childAnimations} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link 
            key={i} 
            href={action.href}
            className="flex h-[80px] premium-card hover:-translate-y-1 hover:shadow-lg hover:border-secondary text-foreground/80 hover:text-secondary transition-all duration-200 flex-col justify-center items-center gap-2"
          >
            <action.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold tracking-wide">{action.label}</span>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={childAnimations} className="lg:col-span-2 space-y-6">
          <TodayTimetable />
          <StreakTracker />
        </motion.div>
        
        <motion.div variants={childAnimations} className="lg:col-span-1 h-full">
          <AnnouncementsFeed />
        </motion.div>
      </div>
    </motion.div>
  );
}
