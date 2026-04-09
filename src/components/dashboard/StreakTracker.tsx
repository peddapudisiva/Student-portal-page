import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export function StreakTracker() {
  const streak = 4;
  const history = [true, true, true, true, false, true, true].reverse(); // last 7 days
  const message = streak >= 3 ? "You're on fire! Keep it up." : "Good start! Keep learning.";

  return (
    <Card className="bg-primary/95 backdrop-blur-xl border-none shadow-lg text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl rounded-none"></div>
      <div className="absolute -right-10 -top-10 opacity-10">
        <Flame className="w-40 h-40" />
      </div>
      <CardContent className="p-6 relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-secondary flex items-center gap-2 mb-1 drop-shadow-md">
            <Flame className="w-5 h-5" fill="currentColor" />
            {streak} Day Streak
          </h3>
          <p className="text-sm font-bold text-white/80">You have studied {streak} days in a row.</p>
          <p className="text-xs font-medium text-white/60 mt-1">{message}</p>
        </div>
        
        <div className="flex gap-2">
          {history.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm ${active ? 'bg-secondary text-white' : 'bg-white/10 text-white/40'}`}
              >
                {/* Visual purely decorative dots for the prompt rule */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
