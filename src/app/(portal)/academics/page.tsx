'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Folder, FileText, ArrowLeft, Download, Eye, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AcademicsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { id: '1', name: 'Data Structures', code: 'CS301', materialsCount: 12 },
    { id: '2', name: 'Operating Systems', code: 'CS302', materialsCount: 8 },
    { id: '3', name: 'Computer Networks', code: 'CS303', materialsCount: 15 },
    { id: '4', name: 'Database Management', code: 'CS304', materialsCount: 10 },
  ];

  const materials = [
    { id: '1', title: 'Unit 1: Array and Linked Lists', type: 'PDF', size: '2.4 MB', date: 'Oct 01, 2026' },
    { id: '2', title: 'Unit 2: Stacks and Queues', type: 'PDF', size: '1.8 MB', date: 'Oct 05, 2026' },
    { id: '3', title: 'Assignment 1 Reference Material', type: 'PDF', size: '3.1 MB', date: 'Oct 10, 2026' },
    { id: '4', title: 'Unit 3: Trees and Graphs', type: 'PDF', size: '4.5 MB', date: 'Oct 12, 2026' },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight drop-shadow-sm">Academic Materials</h1>
        {selectedSubject && (
          <Button 
            variant="outline"
            onClick={() => setSelectedSubject(null)}
            className="font-bold text-foreground border-border hover:border-secondary hover:text-secondary shadow-sm rounded-full bg-white/50 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedSubject ? (
          <motion.div 
            key="subjects"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {subjects.length > 0 ? (
              subjects.map((sub, i) => (
                <motion.div 
                  key={sub.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedSubject(sub.name)}
                >
                  <Card className="premium-card cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 h-full overflow-hidden relative group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-black/5 to-transparent rounded-full flex items-center justify-center mb-5 shadow-inner">
                        <Folder className="w-8 h-8 text-secondary fill-secondary/20 drop-shadow-sm" />
                      </div>
                      <h3 className="font-bold text-[#12223f] mb-1 group-hover:text-secondary transition-colors text-lg">{sub.name}</h3>
                      <p className="text-xs font-bold text-[#12223f]/40 tracking-widest uppercase mb-1">{sub.code}</p>
                      <div className="mt-4 bg-[#c8900a]/10 text-[#c8900a] text-xs font-bold px-5 py-2 rounded-full shadow-sm border border-[#c8900a]/10">
                        {sub.materialsCount} Materials
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-10">
                <EmptyState 
                  icon={GraduationCap}
                  title="No Enrolled Subjects"
                  description="You haven't been enrolled in any subjects yet. Once your curriculum is set, your study materials will appear here."
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="materials"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground border-b border-border/40 pb-4 mb-6">
              {selectedSubject}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((mat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={mat.id}
                >
                  <Card className="premium-card hover:border-secondary/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-red-500/10 rounded-[12px] flex items-center justify-center shrink-0 shadow-sm">
                          <FileText className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground leading-snug">{mat.title}</h4>
                          <p className="text-xs font-semibold text-foreground/50 mt-1 uppercase tracking-wide">
                            {mat.type} • {mat.size} • Added {mat.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-foreground/50 hover:text-secondary hover:bg-secondary/10 rounded-full">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-foreground/50 hover:text-secondary hover:bg-secondary/10 rounded-full">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
