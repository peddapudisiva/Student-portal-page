'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function TopBar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  // Simple title generator from path
  const getTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    const path = pathname.split('/')[1] || '';
    if (!path) return 'Student Portal';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  const displayName = profile?.full_name || 'Student';

  return (
    <header className="sticky top-0 z-40 w-full h-[80px] bg-background/70 backdrop-blur-xl border-b border-border/40 px-8 flex items-center justify-between transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Mobile menu - hidden on desktop */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5 text-foreground" />
        </Button>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground tracking-tight">{getTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-foreground/70 hover:text-secondary transition-all duration-150 p-2 hover:bg-black/5 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-red-500/50">
            3
          </span>
        </button>
        <Link 
          href="/profile" 
          className="flex items-center gap-3 p-1.5 pl-4 bg-white/50 border border-border/50 rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-white hover:border-secondary/30 transition-all cursor-pointer group"
        >
          <span className="text-sm font-semibold text-foreground hidden sm:block">
            {displayName}
          </span>
          <Avatar className="w-9 h-9 border border-white shadow-sm group-hover:scale-105 transition-transform">
            <AvatarImage src={profile?.avatar_url || "/placeholder-avatar.jpg"} alt="Student" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
