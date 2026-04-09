'use client';

import { useState } from 'react';
import { AttendanceGauge } from '@/components/attendance/AttendanceGauge';
import { LeaveForm } from '@/components/attendance/LeaveForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar as CalendarIcon, List } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttendancePage() {
  const [view, setView] = useState<'table' | 'calendar'>('table');

  const subjects = [
    { name: 'Data Structures', total: 40, present: 32, absent: 8, percentage: 80 },
    { name: 'Operating Systems', total: 38, present: 28, absent: 10, percentage: 73 },
    { name: 'Computer Networks', total: 35, present: 32, absent: 3, percentage: 91 },
    { name: 'Database Management', total: 42, present: 38, absent: 4, percentage: 90 },
  ];

  const overallPercentage = 83;
  const overallAttended = 130;
  const overallTotal = 155;

  const lowAttendanceSubjects = subjects.filter((s) => s.percentage < 75);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      <motion.div variants={itemVars} className="flex justify-between items-center relative z-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight drop-shadow-sm">My Attendance</h1>
        <div className="bg-black/5 p-1.5 flex gap-1 rounded-xl backdrop-blur-md">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('table')}
            className={`h-9 font-bold rounded-lg transition-all duration-200 ${view === 'table' ? 'bg-white text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground hover:bg-black/5'}`}
          >
            <List className="w-4 h-4 mr-2" /> Table
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('calendar')}
            className={`h-9 font-bold rounded-lg transition-all duration-200 ${view === 'calendar' ? 'bg-white text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground hover:bg-black/5'}`}
          >
            <CalendarIcon className="w-4 h-4 mr-2" /> Calendar
          </Button>
        </div>
      </motion.div>

      {lowAttendanceSubjects.length > 0 && (
        <motion.div 
          variants={itemVars}
          className="bg-[#ef4444] text-white p-4 rounded-[8px] flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow duration-150"
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-white/90 animate-pulse" />
          <div>
            <h4 className="font-bold">Attendance Warning</h4>
            <p className="text-sm font-medium text-white/90">
              Your attendance in {lowAttendanceSubjects.map(s => s.name).join(', ')} is below 75%. You may be detained from exams.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVars} className="lg:col-span-1 space-y-6 flex flex-col">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            className="h-[280px]"
          >
             <AttendanceGauge percentage={overallPercentage} attended={overallAttended} total={overallTotal} />
          </motion.div>
          <motion.div variants={itemVars}>
             <LeaveForm />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVars} className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {view === 'table' ? (
              <motion.div
                key="table"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="premium-card h-full">
                  <CardHeader className="border-b border-border/40 pb-4 bg-black/[0.02]">
                    <CardTitle className="text-lg font-bold text-foreground">Subject-wise Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-white/50">
                        <TableRow className="border-border/40">
                          <TableHead className="font-bold text-foreground">Subject</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Total</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Present</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Absent</TableHead>
                          <TableHead className="font-bold text-foreground text-right">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.map((sub, i) => (
                          <motion.tr 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className="border-border/40 hover:bg-black/5 cursor-pointer transition-colors duration-150"
                          >
                            <TableCell className="font-bold text-foreground">{sub.name}</TableCell>
                            <TableCell className="text-center text-foreground font-medium">{sub.total}</TableCell>
                            <TableCell className="text-center text-green-600 font-bold">{sub.present}</TableCell>
                            <TableCell className="text-center text-red-500 font-bold">{sub.absent}</TableCell>
                            <TableCell className="text-right">
                              <span className={`font-bold px-3 py-1 rounded-full text-xs tracking-wide transition-colors duration-150 shadow-inner ${sub.percentage >= 75 ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-600'}`}>
                                {sub.percentage}%
                              </span>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="premium-card h-full">
                  <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center justify-between bg-black/[0.02]">
                    <CardTitle className="text-lg font-bold text-foreground">October 2026</CardTitle>
                    <div className="flex gap-3 text-xs font-bold text-foreground/70 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></span> Present</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></span> Absent</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300 shadow-sm"></span> Holiday</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center font-bold text-xs text-foreground/50 uppercase tracking-wide">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3">
                      {/* Empty days for formatting */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-10"></div>
                      ))}
                      {/* Actual dates */}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const date = i + 1;
                        let statusColor = "bg-white border-border/40 text-foreground shadow-sm";
                        
                        // Fake logic for visual representation
                        if (date % 7 === 3 || date % 7 === 4) { // Sunday/Saturday mocks
                          statusColor = "bg-secondary/5 border-transparent text-secondary/50";
                        } else if ([5, 12, 18].includes(date)) {
                          statusColor = "bg-red-500/10 border-transparent text-red-600 font-extrabold";
                        } else if (date < 24) {
                          statusColor = "bg-green-500/10 border-transparent text-green-700";
                        } else if (date === 24) {
                          statusColor = "bg-secondary border-transparent text-white animate-pulse shadow-md";
                        }

                        return (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.01 }}
                            key={date} 
                            className={`h-11 sm:h-12 border rounded-[12px] flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-110 transition-transform ${statusColor}`}
                          >
                            {date}
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
