'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { EmptyState } from '@/components/ui/EmptyState';
import { Trophy, Download, Calculator } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProgressChart } from '@/components/results/ProgressChart';

export default function ResultsPage() {
  const [activeSem, setActiveSem] = useState('Sem 5');
  const [dbMarks, setDbMarks] = useState<any[]>([]);
  const { user } = useAuth();
  
  const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'];

  const MOCK_GRADES = [
    { subject: 'Data Structures', mid1: 22, mid2: 24, assign: 5, external: 61, total: 91, grade: 'S', status: 'Pass' },
    { subject: 'Database Management', mid1: 20, mid2: 18, assign: 4, external: 55, total: 79, grade: 'A', status: 'Pass' },
    { subject: 'Computer Networks', mid1: 19, mid2: 21, assign: 5, external: 52, total: 77, grade: 'A', status: 'Pass' },
    { subject: 'Operating Systems', mid1: 23, mid2: 22, assign: 5, external: 58, total: 86, grade: 'A', status: 'Pass' },
    { subject: 'Theory of Computation', mid1: 18, mid2: 20, assign: 4, external: 48, total: 72, grade: 'B', status: 'Pass' }
  ];

  const finalMarks = dbMarks.length > 0 ? dbMarks : MOCK_GRADES;

  useEffect(() => {
    if (!user) return;
    
    const fetchGrades = async () => {
      const { data, error } = await supabase
        .from('grades')
        .select('*')
        .eq('student_id', user.id)
        .eq('semester', activeSem);
      
      if (!error && data) {
        setDbMarks(data);
      }
    };
    
    fetchGrades();
  }, [user, activeSem]);

  const hasResults = dbMarks.length > 0;

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
      <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight drop-shadow-sm">Academic Results</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
          <Button className="bg-primary hover:bg-secondary text-white font-bold h-11 px-6 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 w-full sm:w-auto">
            <Download className="w-5 h-5 mr-2" /> Download Report Card
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVars} className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide relative z-10">
        <div className="flex gap-2 bg-black/5 p-1.5 rounded-[16px] backdrop-blur-md">
          {semesters.map((sem, i) => (
            <motion.div
              key={sem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Button
                variant="ghost"
                onClick={() => setActiveSem(sem)}
                className={`rounded-[10px] font-bold transition-all duration-200 h-9 px-5 ${activeSem === sem ? 'bg-white text-foreground shadow-sm scale-100' : 'text-foreground/50 hover:text-foreground hover:bg-black/5'}`}
              >
                {sem}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-6">
          <Card className="premium-card">
            <CardHeader className="border-b border-border/40 py-4 bg-black/[0.02]">
              <CardTitle className="text-lg font-bold text-foreground">Marks Statement - {activeSem}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto min-h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40 bg-white/50">
                    <TableHead className="font-bold text-foreground whitespace-nowrap">Subject</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Mid-1</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Mid-2</TableHead>
                    <TableHead className="font-bold text-secondary text-center">Best</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Assgn</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Int Total</TableHead>
                    <TableHead className="font-bold text-foreground text-center">End Sem</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Total</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finalMarks.map((m, i) => {
                    const bestMid = Math.max(m.mid1 || 0, m.mid2 || 0);
                    return (
                      <motion.tr 
                        key={i} 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="border-border/40 hover:bg-black/5 transition-colors duration-150"
                      >
                        <TableCell className="font-bold text-foreground truncate max-w-[150px]">{m.subject}</TableCell>
                        <TableCell className={`text-center font-medium ${m.mid1 === bestMid ? 'text-secondary font-bold' : 'text-foreground'}`}>{m.mid1}</TableCell>
                        <TableCell className={`text-center font-medium ${m.mid2 === bestMid ? 'text-secondary font-bold' : 'text-foreground'}`}>{m.mid2}</TableCell>
                        <TableCell className="text-center font-bold text-secondary shadow-sm bg-secondary/5 rounded-md">{bestMid}</TableCell>
                        <TableCell className="text-center font-medium text-foreground">{m.assign}</TableCell>
                        <TableCell className="text-center font-bold text-foreground">{(m.mid1 + m.mid2) / 2 + (m.assign || 0)}</TableCell>
                        <TableCell className="text-center font-medium text-foreground">{m.external}</TableCell>
                        <TableCell className="text-center font-extrabold text-foreground">{m.total}</TableCell>
                        <TableCell className={`text-center font-bold ${m.status === 'Pass' ? 'text-green-600' : 'text-red-500'}`}>{m.grade}</TableCell>
                      </motion.tr>
                    );
                  })}
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-primary text-primary-foreground hover:bg-primary/95"
                  >
                    <TableCell colSpan={6} className="font-bold text-right text-white">Summary:</TableCell>
                    <TableCell colSpan={3} className="font-bold text-left text-secondary drop-shadow-sm">Current Semester Stats Available</TableCell>
                  </motion.tr>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVars} className="lg:col-span-1 space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}>
            <Card className="premium-card">
              <CardHeader className="border-b border-border/40 py-4 flex flex-row items-center gap-3 bg-black/[0.02]">
                <Calculator className="w-5 h-5 text-secondary" />
                <CardTitle className="text-lg font-bold text-foreground">Internal Calculator</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="bg-black/[0.02] p-4 rounded-xl border border-border/40 shadow-inner">
                  <h4 className="font-bold text-foreground text-sm mb-2 text-center tracking-wide">Computer Networks</h4>
                  <p className="text-xs text-foreground/70 font-semibold text-center mb-1">Best(12, 10) + Assgn(4) = <span className="font-bold text-foreground px-1 bg-white rounded shadow-sm">16</span></p>
                  <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-center animate-pulse shadow-sm">
                    <span className="text-sm font-bold text-red-600">Need 24 marks in End Sem</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-2"
          >
            <h3 className="font-bold text-[#12223f] text-sm px-1">CGPA Progress</h3>
            <ProgressChart />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
