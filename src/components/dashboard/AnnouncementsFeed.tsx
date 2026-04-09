import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function AnnouncementsFeed() {
  const notices = [
    { title: 'Mid-1 Examination Schedule Released', date: 'Oct 12, 2026', category: 'Academic', urgent: true },
    { title: 'Hackathon Registration Opens Tomorrow', date: 'Oct 11, 2026', category: 'Events', urgent: false },
    { title: 'Last date to pay Semester 5 Fee', date: 'Oct 10, 2026', category: 'Fee', urgent: true },
    { title: 'Campus Placement Prep Session', date: 'Oct 09, 2026', category: 'Placement', urgent: false },
    { title: 'Library Book Return Reminder', date: 'Oct 08, 2026', category: 'General', urgent: false }
  ];

  return (
    <Card className="premium-card">
      <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-primary">Announcements</CardTitle>
        <Link href="/notifications" className="text-sm font-bold text-secondary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {notices.map((n, i) => (
            <div 
              key={i} 
              className={`p-4 border-b border-border/40 last:border-0 hover:bg-black/5 transition-colors cursor-pointer ${n.urgent ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={`rounded-[4px] text-[10px] ${n.urgent ? 'bg-red-500/10 text-red-500 border-none' : 'text-primary/70 bg-black/5 border-border/50'}`}>
                  {n.category}
                </Badge>
                <span className="text-[11px] font-bold text-primary/50">{n.date}</span>
              </div>
              <h4 className="font-bold text-primary text-[14px] leading-snug">{n.title}</h4>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
