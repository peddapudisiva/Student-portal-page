'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

export function ProgressChart() {
  const data = [
    { sem: 'Sem 1', cgpa: 8.2, sgpa: 8.2, rank: 12 },
    { sem: 'Sem 2', cgpa: 8.5, sgpa: 8.8, rank: 8 },
    { sem: 'Sem 3', cgpa: 8.4, sgpa: 8.2, rank: 15 },
    { sem: 'Sem 4', cgpa: 8.7, sgpa: 9.1, rank: 4 },
    { sem: 'Sem 5', cgpa: 8.8, sgpa: 8.9, rank: 3 },
  ];

  return (
    <Card className="bg-white border-[#e2e8f0] pt-6">
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="sem" axisLine={false} tickLine={false} tick={{ fill: '#12223f', fontSize: 12, fontWeight: 'bold' }} dy={10} />
              <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#12223f', fontSize: 12, fontWeight: 'bold' }} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#12223f', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold' }}
                itemStyle={{ color: '#c8900a' }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} (SGPA: ${props.payload.sgpa}, Rank: ${props.payload.rank})`, 'CGPA'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="cgpa" 
                stroke="#c8900a" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#12223f', strokeWidth: 2, stroke: '#c8900a' }} 
                activeDot={{ r: 6, fill: '#12223f', stroke: '#c8900a' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
