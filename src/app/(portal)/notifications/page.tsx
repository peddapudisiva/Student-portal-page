'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  BookOpen, 
  CreditCard, 
  AlertTriangle, 
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type NotificationType = 'academic' | 'finance' | 'general' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  link?: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'academic',
      title: 'New Grade Posted',
      message: 'Your grade for "Data Structures Assignment 2" has been published.',
      time: '2 hours ago',
      unread: true,
      link: '/results'
    },
    {
      id: '2',
      type: 'finance',
      title: 'Fee Payment Reminder',
      message: 'Semester 5 tuition fee payment of ₹40,000 is due by Oct 20th.',
      time: '5 hours ago',
      unread: true,
      link: '/fees'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Attendance Alert',
      message: 'Your attendance in "Operating Systems" has dropped to 73%.',
      time: '1 day ago',
      unread: false,
      link: '/attendance'
    },
    {
      id: '4',
      type: 'general',
      title: 'Campus Event',
      message: 'The Annual Tech Symposium is scheduled for next Friday at 10 AM.',
      time: '2 days ago',
      unread: false
    },
    {
      id: '5',
      type: 'academic',
      title: 'Timetable Change',
      message: 'Monday morning lecture shifted from Room 302 to the Seminar Hall.',
      time: '3 days ago',
      unread: false,
      link: '/timetable'
    }
  ]);

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.type === filter);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'academic': return <BookOpen className="w-5 h-5 text-secondary" />;
      case 'finance': return <CreditCard className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-foreground/40" />;
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-6 pb-12 max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <h1 className="text-[28px] font-bold text-foreground tracking-tight flex items-center gap-3">
            <Bell className="w-7 h-7 text-secondary" />
            Notifications
          </h1>
          <p className="text-sm font-semibold text-foreground/40 mt-1 uppercase tracking-widest pl-10">
            Stay updated with your campus life
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllRead}
            className="text-foreground/60 hover:text-secondary hover:bg-secondary/5 font-bold rounded-lg px-4"
          >
            <CheckCheck className="w-4 h-4 mr-2" /> Mark all read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-foreground/60 hover:text-red-500 hover:bg-red-500/5 font-bold rounded-lg px-4"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Clear all
          </Button>
        </div>
      </div>

      <div className="flex gap-2 bg-black/5 p-1.5 rounded-[16px] backdrop-blur-md w-fit relative z-10">
        {(['all', 'academic', 'finance', 'warning', 'general'] as const).map((type) => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(type)}
            className={cn(
              "rounded-[10px] font-bold transition-all duration-200 h-9 px-4 capitalize",
              filter === type 
                ? "bg-white text-foreground shadow-sm" 
                : "text-foreground/50 hover:text-foreground hover:bg-black/5"
            )}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="space-y-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                variants={itemVars}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="group"
              >
                <Card 
                  onClick={() => toggleExpand(n.id)}
                  className={cn(
                    "premium-card transition-all duration-300 hover:shadow-xl hover:translate-x-1 border-l-4 overflow-hidden cursor-pointer",
                    n.unread ? "bg-white/95" : "bg-white/60 opacity-80",
                    n.unread ? "border-l-secondary" : "border-l-transparent",
                    expandedId === n.id && "ring-2 ring-secondary/20 shadow-2xl translate-x-1"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="p-5 flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform",
                        n.unread ? "bg-secondary/10" : "bg-black/5"
                      )}>
                        {getIcon(n.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={cn(
                            "font-bold text-md leading-tight truncate",
                            n.unread ? "text-foreground" : "text-foreground/70"
                          )}>
                            {n.title}
                            {n.unread && (
                              <span className="ml-2 w-2 h-2 bg-secondary rounded-full inline-block align-middle" />
                            )}
                          </h3>
                          <span className="text-[11px] font-bold text-foreground/40 whitespace-nowrap ml-4 leading-tight">
                            {n.time}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm leading-relaxed",
                          n.unread ? "font-semibold text-foreground/80" : "font-medium text-foreground/50",
                          expandedId !== n.id && "truncate"
                        )}>
                          {n.message}
                        </p>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500"
                           onClick={(e) => deleteNotification(e, n.id)}
                         >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                         <div 
                           className={cn(
                             "h-8 w-8 rounded-full flex items-center justify-center transition-transform",
                             expandedId === n.id ? "rotate-90 text-secondary bg-secondary/10" : "text-foreground/40"
                           )}
                         >
                           <ChevronRight className="w-4 h-4" />
                         </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === n.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-black/[0.02] border-t border-border/40"
                        >
                          <div className="p-5 pt-0 space-y-4">
                            <div className="mt-4 p-4 bg-white/50 rounded-xl border border-border/40 text-sm font-medium text-foreground/70 leading-relaxed shadow-inner">
                              Additional details for this notification go here. This is where the student can see full context, links, or attached documents related to the alert.
                            </div>
                            <div className="flex gap-3">
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (n.link) router.push(n.link);
                                }}
                                className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg shadow-md h-9 px-6 text-xs uppercase tracking-wider transition-all active:scale-95"
                              >
                                View Full Details
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedId(null);
                                }}
                                className="border-border/40 hover:bg-black/5 font-bold rounded-lg h-9 px-6 text-xs uppercase tracking-wider"
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 bg-black/5 rounded-[24px] border border-dashed border-border/40"
            >
              <Bell className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
              <p className="text-foreground/40 font-bold">No notifications found in this category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
