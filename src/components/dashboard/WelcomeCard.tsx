import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';

export function WelcomeCard() {
  const { profile } = useAuth();
  
  const displayName = profile?.full_name || "Student";
  const rollNumber = profile?.roll_number || "---";
  const course = profile?.course || "B.Tech CSE";
  const yearSem = profile?.year_sem || "Year ---";

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="p-8 premium-card flex items-center justify-between relative overflow-hidden border-t-4 border-t-primary">
      <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="flex items-center gap-6 relative z-10">
        <Avatar className="w-[64px] h-[64px] border-2 border-white shadow-lg">
          <AvatarImage src={profile?.avatar_url || "/placeholder-avatar.jpg"} alt={displayName} />
          <AvatarFallback className="bg-primary text-white">
            {displayName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-[26px] font-bold text-foreground tracking-tight">Good Morning, {displayName}</h2>
          <p className="text-[14px] text-foreground/60 font-medium mt-1 uppercase tracking-wider">
            {rollNumber} <span className="mx-2 text-border">•</span> {course} <span className="mx-2 text-border">•</span> {yearSem}
          </p>
        </div>
      </div>
      <div className="hidden md:block text-right relative z-10">
        <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-1">{currentDate.split(',')[0]}</p>
        <p className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{currentDate.split(',').slice(1).join(',').trim()}</p>
      </div>
    </Card>
  );
}
