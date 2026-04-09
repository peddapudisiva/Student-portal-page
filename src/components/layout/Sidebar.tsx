'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  GraduationCap,
  CalendarDays,
  CreditCard,
  Bell,
  MessageSquare,
  Bot,
  ListTodo,
  Trophy,
  User,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Academics', path: '/academics', icon: BookOpen },
  { name: 'Assignments', path: '/assignments', icon: ClipboardList },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Results', path: '/results', icon: GraduationCap },
  { name: 'Timetable', path: '/timetable', icon: CalendarDays },
  { name: 'Fees', path: '/fees', icon: CreditCard },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'AI Tutor', path: '/ai-tutor', icon: Bot, isNew: true },
  { name: 'Study Planner', path: '/study-planner', icon: ListTodo, isNew: true },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { name: 'Profile', path: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  
  const displayName = profile?.full_name || "Student";
  const rollNumber = profile?.roll_number || "---";

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-[260px] bg-primary/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[24px] text-white overflow-y-auto flex flex-col z-50 premium-sidebar">
      <div className="p-8 border-b border-white/10 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl rounded-none"></div>
        <div className="w-16 h-16 bg-secondary text-white flex items-center justify-center rounded-[12px] shadow-[0_4px_20px_rgba(59,130,246,0.4)] font-bold text-xl mb-4 relative z-10">
          IXL
        </div>
        <h1 className="text-[20px] font-bold tracking-tight text-center">
          Student Portal
        </h1>
        <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold">
          Integrated School
        </p>
      </div>

      <div className="p-6 border-b border-white/10 flex items-center gap-4 relative z-10">
        <Avatar className="w-12 h-12 border-2 border-secondary shadow-lg">
          <AvatarImage src={profile?.avatar_url || "/placeholder-avatar.jpg"} alt={displayName} />
          <AvatarFallback className="bg-primary text-white">
            {displayName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{displayName}</span>
          <span className="text-xs text-white/60">{rollNumber}</span>
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-6 py-3.5 mx-4 mb-1 text-sm font-semibold transition-all duration-200 ease-in-out rounded-[12px]',
                isActive
                  ? 'bg-secondary text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {item.isNew && (
                <span className="text-[10px] font-bold uppercase bg-[#c8900a] text-white px-1.5 py-0.5 rounded-[4px]">
                  New
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <Link
          href="/login"
          className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 rounded-[8px]"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
