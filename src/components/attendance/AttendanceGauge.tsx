'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

export function AttendanceGauge({ percentage, attended, total }: { percentage: number, attended: number, total: number }) {
  const data = [
    { name: 'Attended', value: percentage },
    { name: 'Missed', value: 100 - percentage },
  ];

  let color = '#c8900a'; // gold for >=75%
  if (percentage < 75 && percentage >= 65) color = '#f59e0b'; // amber
  if (percentage < 65) color = '#ef4444'; // red

  return (
    <Card className="bg-white border-[#e2e8f0] flex flex-col items-center justify-center p-6 h-full">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#12223f]">{percentage}%</span>
        </div>
      </div>
      <p className="text-sm font-bold text-[#12223f]/70 mt-4 text-center">
        {attended} classes attended out of {total} total
      </p>
    </Card>
  );
}
