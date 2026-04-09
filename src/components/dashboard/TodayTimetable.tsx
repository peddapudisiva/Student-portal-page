import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function TodayTimetable() {
  const periods = [
    { time: '09:00 AM - 09:50 AM', subject: 'Data Structures', faculty: 'Dr. Ramesh', status: 'completed' },
    { time: '10:00 AM - 10:50 AM', subject: 'Operating Systems', faculty: 'Prof. Srinivas', status: 'current' },
    { time: '11:00 AM - 11:50 AM', subject: 'Computer Networks', faculty: 'Dr. Lakshmi', status: 'upcoming' },
    { time: '12:00 PM - 12:50 PM', subject: 'Database Management', faculty: 'Prof. Kumar', status: 'upcoming' }
  ];

  return (
    <Card className="premium-card">
      <CardHeader className="pb-3 border-b border-[#e2e8f0]">
        <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-secondary" />
          Today's Timetable
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {periods.length === 0 ? (
            <div className="p-6 text-center text-primary/60 font-medium">
              No more classes today.
            </div>
          ) : (
            periods.map((p, i) => (
              <div 
                key={i} 
                className={`p-4 border-b border-border/50 last:border-0 flex items-start justify-between transition-colors ${p.status === 'current' ? 'bg-secondary/10 border-l-4 border-l-secondary' : ''}`}
              >
                <div>
                  <h4 className={`font-bold text-[15px] ${p.status === 'current' ? 'text-secondary' : 'text-primary'}`}>
                    {p.subject}
                  </h4>
                  <p className="text-sm text-primary/70 font-medium mt-1">{p.faculty}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary/80 block mb-1">{p.time}</span>
                  {p.status === 'current' && (
                    <Badge className="bg-secondary hover:bg-secondary text-white text-[10px] rounded-[4px] px-2 py-0 shadow-sm">Ongoing</Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
