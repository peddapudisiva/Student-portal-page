'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileSpreadsheet,
  Calendar,
  MessageSquare,
  Bell,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';

const STAFF_NAV_ITEMS = [
  { name: 'Faculty Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
  { name: 'My Classes', path: '/staff/classes', icon: Users },
  { name: 'Mark Attendance', path: '/staff/attendance', icon: CheckSquare },
  { name: 'Grade Entry', path: '/staff/grades', icon: FileSpreadsheet },
  { name: 'Schedule', path: '/staff/schedule', icon: Calendar },
  { name: 'Staff Messages', path: '/staff/messages', icon: MessageSquare },
  { name: 'Notifications', path: '/staff/notifications', icon: Bell },
  { name: 'My Profile', path: '/staff/profile', icon: User },
];

export function StaffSidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  
  const displayName = profile?.full_name || "Faculty Member";
  const facultyId = profile?.employee_id || "---";

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-[260px] bg-slate-900/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[24px] text-white overflow-y-auto flex flex-col z-50 premium-sidebar">
      <div className="p-8 border-b border-white/10 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl rounded-none"></div>
        <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-[12px] shadow-[0_4px_20px_rgba(37,99,235,0.4)] font-bold text-xl mb-4 relative z-10">
          IXL
        </div>
        <h1 className="text-[20px] font-bold tracking-tight text-center">
          Faculty Hub
        </h1>
        <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-bold">
          Admin Interface
        </p>
      </div>

      <div className="p-6 border-b border-white/10 flex items-center gap-4 relative z-10">
        <Avatar className="w-12 h-12 border-2 border-blue-500 shadow-lg">
          <AvatarImage src={profile?.avatar_url || "/placeholder-faculty.jpg"} alt={displayName} />
          <AvatarFallback className="bg-blue-600 text-white">
            {displayName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold truncate max-w-[140px]">{displayName}</span>
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{facultyId}</span>
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col">
        {STAFF_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-6 py-3.5 mx-4 mb-1 text-sm font-semibold transition-all duration-200 ease-in-out rounded-[12px]',
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 rounded-[8px]"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit Faculty Hub</span>
        </button>
      </div>
    </aside>
  );
}
