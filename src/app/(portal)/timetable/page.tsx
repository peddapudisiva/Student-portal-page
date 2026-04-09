'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimetablePage() {
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  
  const currentDayIndex = 1; // Tue mocked
  const currentPeriodIndex = 1; // 10:00 AM mocked

  const schedule = [
    [{ sub: 'DS', fac: 'DR', room: 'A-201', color: 'bg-blue-50 text-blue-900 border-blue-200' }, { sub: 'OS', fac: 'PS', room: 'A-202', color: 'bg-green-50 text-green-900 border-green-200' }, { sub: 'CN', fac: 'DL', room: 'A-203', color: 'bg-purple-50 text-purple-900 border-purple-200' }, { sub: 'DBMS', fac: 'PK', room: 'A-101', color: 'bg-pink-50 text-pink-900 border-pink-200' }, null, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }],
    [{ sub: 'CN', fac: 'DL', room: 'A-203', color: 'bg-purple-50 text-purple-900 border-purple-200' }, { sub: 'OS', fac: 'PS', room: 'A-202', color: 'bg-green-50 text-green-900 border-green-200' }, { sub: 'DS', fac: 'DR', room: 'A-201', color: 'bg-blue-50 text-blue-900 border-blue-200' }, { sub: 'DBMS', fac: 'PK', room: 'A-101', color: 'bg-pink-50 text-pink-900 border-pink-200' }, null, { sub: 'PE', fac: 'PT', room: 'Ground', color: 'bg-orange-50 text-orange-900 border-orange-200' }, { sub: 'SE', fac: 'RK', room: 'A-301', color: 'bg-teal-50 text-teal-900 border-teal-200' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }],
    [{ sub: 'DS', fac: 'DR', room: 'A-201', color: 'bg-blue-50 text-blue-900 border-blue-200' }, { sub: 'OS', fac: 'PS', room: 'A-202', color: 'bg-green-50 text-green-900 border-green-200' }, { sub: 'CN', fac: 'DL', room: 'A-203', color: 'bg-purple-50 text-purple-900 border-purple-200' }, { sub: 'DBMS', fac: 'PK', room: 'A-101', color: 'bg-pink-50 text-pink-900 border-pink-200' }, null, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }],
    [{ sub: 'CN', fac: 'DL', room: 'A-203', color: 'bg-purple-50 text-purple-900 border-purple-200' }, { sub: 'OS', fac: 'PS', room: 'A-202', color: 'bg-green-50 text-green-900 border-green-200' }, { sub: 'DS', fac: 'DR', room: 'A-201', color: 'bg-blue-50 text-blue-900 border-blue-200' }, { sub: 'DBMS', fac: 'PK', room: 'A-101', color: 'bg-pink-50 text-pink-900 border-pink-200' }, null, { sub: 'PE', fac: 'PT', room: 'Ground', color: 'bg-orange-50 text-orange-900 border-orange-200' }, { sub: 'SE', fac: 'RK', room: 'A-301', color: 'bg-teal-50 text-teal-900 border-teal-200' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }],
    [{ sub: 'DBMS', fac: 'PK', room: 'A-101', color: 'bg-pink-50 text-pink-900 border-pink-200' }, { sub: 'CN', fac: 'DL', room: 'A-203', color: 'bg-purple-50 text-purple-900 border-purple-200' }, { sub: 'OS', fac: 'PS', room: 'A-202', color: 'bg-green-50 text-green-900 border-green-200' }, { sub: 'DS', fac: 'DR', room: 'A-201', color: 'bg-blue-50 text-blue-900 border-blue-200' }, null, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LAB', fac: 'DR', room: 'LAB-1', color: 'bg-slate-100 text-slate-900 border-slate-300' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }],
    [{ sub: 'SE', fac: 'RK', room: 'A-301', color: 'bg-teal-50 text-teal-900 border-teal-200' }, { sub: 'SE', fac: 'RK', room: 'A-301', color: 'bg-teal-50 text-teal-900 border-teal-200' }, { sub: 'PE', fac: 'PT', room: 'Ground', color: 'bg-orange-50 text-orange-900 border-orange-200' }, { sub: 'LIB', fac: 'Lib', room: 'Library', color: 'bg-gray-50 text-gray-900 border-gray-200' }, null, null, null, null],
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-[#12223f]">Class Timetable</h1>
        <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-1 flex gap-1 shadow-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('weekly')}
            className={`h-8 font-bold transition-colors duration-150 ${view === 'weekly' ? 'bg-[#12223f] text-white hover:bg-[#12223f]' : 'text-[#12223f]/60 hover:text-[#12223f]'}`}
          >
            <Calendar className="w-4 h-4 mr-2" /> Weekly
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('daily')}
            className={`h-8 font-bold transition-colors duration-150 ${view === 'daily' ? 'bg-[#12223f] text-white hover:bg-[#12223f]' : 'text-[#12223f]/60 hover:text-[#12223f]'}`}
          >
            <List className="w-4 h-4 mr-2" /> Daily
          </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'weekly' ? (
          <motion.div
            key="weekly"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Card className="bg-white border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0 overflow-x-auto relative">
                <table className="w-full min-w-[800px] border-collapse relative">
                  <thead>
                    <tr>
                      <th className="border-b border-r border-[#e2e8f0] bg-[#f7f8fb] p-3 text-[#12223f] font-bold w-16 sticky left-0 z-20">Time</th>
                      {days.map((day, i) => (
                        <th key={day} className={`border-b border-r border-[#e2e8f0] p-3 font-bold text-center ${i === currentDayIndex ? 'bg-[#c8900a]/20 text-[#12223f]' : 'bg-[#f7f8fb] text-[#12223f]'}`}>
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((time, tIndex) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: tIndex * 0.05 }}
                        key={time}
                      >
                        <td className="border-b border-r border-[#e2e8f0] bg-[#f7f8fb] p-2 text-xs font-bold text-[#12223f]/70 text-center sticky left-0 z-10 whitespace-nowrap">
                          {time}
                        </td>
                        {days.map((_, dIndex) => {
                          const block = schedule[dIndex][tIndex];
                          if (tIndex === 4) {
                            if (dIndex === 0) {
                              return (
                                <td key={dIndex} colSpan={6} className="border-b border-r border-[#e2e8f0] bg-gray-100 p-2 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                  Lunch Break
                                </td>
                              );
                            }
                            return null;
                          }

                          const isCurrent = dIndex === currentDayIndex && tIndex === currentPeriodIndex;
                          const isToday = dIndex === currentDayIndex;

                          return (
                            <td key={dIndex} className={`border-b border-r border-[#e2e8f0] p-2 align-top transition-colors ${isToday ? 'bg-[#c8900a]/5' : ''}`}>
                              {block ? (
                                <motion.div 
                                  whileHover={{ scale: 1.05, zIndex: 30 }}
                                  transition={{ duration: 0.15 }}
                                  title={`${block.sub} - ${block.fac} | Room: ${block.room}`} 
                                  className={`border rounded-[6px] p-2 flex flex-col items-center justify-center h-16 w-full cursor-help ${block.color} ${isCurrent ? 'ring-2 ring-[#c8900a] animate-pulse shadow-md relative z-10' : 'hover:opacity-90'}`}
                                >
                                  <span className="font-bold text-sm leading-none mb-1">{block.sub}</span>
                                  <span className="text-[10px] font-medium opacity-80 leading-none">{block.room}</span>
                                </motion.div>
                              ) : (
                                <div className="h-16 w-full border border-dashed border-transparent rounded-[6px]" />
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="daily"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white border-[#e2e8f0] shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e2e8f0] before:to-transparent">
                  {times.map((time, idx) => {
                    const block = schedule[currentDayIndex][idx];
                    const isCurrent = idx === currentPeriodIndex;
                    const isLunch = idx === 4;

                    if (isLunch) {
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={time} 
                          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            ☕
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 border border-gray-200 p-4 rounded-[8px] flex justify-between items-center shadow-sm">
                            <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Lunch Break</span>
                            <span className="text-xs font-bold text-gray-400">{time}</span>
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={time} 
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${isCurrent ? 'bg-[#c8900a] animate-pulse' : 'bg-[#12223f]'}`}>
                          <div className={`w-3 h-3 rounded-full ${isCurrent ? 'bg-white' : 'bg-[#c8900a]'}`}></div>
                        </div>
                        <div 
                          className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-[8px] shadow-sm transition-transform duration-150 hover:scale-[1.02] ${block ? block.color.replace('border-', 'border-l-4 border-l-') : 'bg-gray-50 border border-gray-200'}`}
                        >
                          {block ? (
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-lg mb-1">{block.sub}</h4>
                                <p className="text-sm opacity-80 font-medium">Faculty: {block.fac}</p>
                                <p className="text-xs opacity-70 mt-1 font-bold">Room {block.room}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded-[4px]">{time}</span>
                                {isCurrent && <span className="block text-[10px] font-bold text-[#c8900a] uppercase tracking-wider mt-2">Active Now</span>}
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center h-full">
                              <span className="font-bold text-gray-400 text-sm">Free Period</span>
                              <span className="text-xs font-bold text-gray-400">{time}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.p variants={itemVars} className="text-center text-xs font-bold text-[#12223f]/50 py-4">
        Hover over any subject block to view classroom details and full names.
      </motion.p>
    </motion.div>
  );
}
