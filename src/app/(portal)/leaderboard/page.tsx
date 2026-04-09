'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Search, 
  TrendingUp, 
  Award,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Ranking {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: number;
  trend: 'up' | 'down' | 'stable';
  isMe?: boolean;
}

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const topThree: Ranking[] = [
    { rank: 1, name: 'Emma Wilson', avatar: '', points: 5420, level: 32, trend: 'stable' },
    { rank: 2, name: 'Liam Garcia', avatar: '', points: 4980, level: 29, trend: 'up' },
    { rank: 3, name: 'Sophia Chen', avatar: '', points: 4750, level: 28, trend: 'down' },
  ];

  const rankings: Ranking[] = [
    { rank: 4, name: 'Noah Brown', avatar: '', points: 4200, level: 25, trend: 'up' },
    { rank: 5, name: 'Ava Martinez', avatar: '', points: 3950, level: 24, trend: 'stable' },
    { rank: 6, name: 'John Doe', avatar: '', points: 3820, level: 23, trend: 'up', isMe: true },
    { rank: 7, name: 'Isabella Taylor', avatar: '', points: 3600, level: 22, trend: 'down' },
    { rank: 8, name: 'Ethan Miller', avatar: '', points: 3450, level: 21, trend: 'stable' },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 pb-12 max-w-5xl mx-auto"
    >
      {/* Header section */}
      <motion.div variants={itemVars} className="text-center space-y-2 relative z-10">
        <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center justify-center gap-4">
          <Trophy className="w-10 h-10 text-[#c8900a]" />
          Campus Leaderboard
        </h1>
        <p className="text-sm font-bold text-foreground/40 uppercase tracking-[0.3em]">Excellence and Achievement Rankings</p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end px-4 relative z-10">
        {/* Silver - Rank 2 */}
        <motion.div 
          variants={itemVars} 
          whileHover={{ y: -10 }}
          className="order-2 md:order-1"
        >
          <Card className="premium-card bg-white/40 border-none shadow-xl pt-12 pb-8 flex flex-col items-center relative overflow-hidden group">
            <div className="absolute top-0 w-full h-1 bg-[#adb5bd]" />
            <div className="absolute top-4 left-4 text-3xl font-black text-[#adb5bd]/20 group-hover:text-[#adb5bd]/40 transition-colors">#2</div>
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 border-[#adb5bd] shadow-2xl scale-100 group-hover:scale-110 transition-transform">
                <AvatarFallback className="bg-white font-bold text-[#adb5bd]">LG</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#adb5bd] flex items-center justify-center shadow-lg border-2 border-white">
                <Medal className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground">{topThree[1].name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#adb5bd]">Level {topThree[1].level}</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{topThree[1].points} XP</span>
            </div>
          </Card>
        </motion.div>

        {/* Gold - Rank 1 */}
        <motion.div 
          variants={itemVars} 
          whileHover={{ y: -15 }}
          className="order-1 md:order-2"
        >
          <Card className="premium-card bg-white/80 border-none shadow-2xl pt-16 pb-12 flex flex-col items-center relative overflow-hidden scale-105 group">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-[#c8900a] to-[#f3bc3c]" />
            <div className="absolute top-6 left-6 text-5xl font-black text-[#c8900a]/10 group-hover:text-[#c8900a]/20 transition-colors">#1</div>
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-xl animate-pulse" />
              <Avatar className="w-28 h-28 border-4 border-[#c8900a] shadow-[0_0_30px_rgba(200,144,10,0.3)] group-hover:scale-110 transition-transform relative z-10">
                <AvatarFallback className="bg-white font-bold text-[#c8900a]">EW</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#c8900a] to-[#f3bc3c] flex items-center justify-center shadow-xl border-2 border-white relative z-20">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-black text-foreground drop-shadow-sm">{topThree[0].name}</h3>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c8900a]">Legend · LVL {topThree[0].level}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8900a]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-foreground">{topThree[0].points} XP</span>
            </div>
            <Button className="mt-6 bg-[#c8900a] hover:bg-[#a67608] text-white rounded-full font-bold px-8 h-10 shadow-lg shadow-[#c8900a]/20 text-xs tracking-widest transition-all">
              VIEW PROFILE
            </Button>
          </Card>
        </motion.div>

        {/* Bronze - Rank 3 */}
        <motion.div 
          variants={itemVars} 
          whileHover={{ y: -10 }}
          className="order-3"
        >
          <Card className="premium-card bg-white/40 border-none shadow-xl pt-12 pb-8 flex flex-col items-center relative overflow-hidden group">
            <div className="absolute top-0 w-full h-1 bg-[#cd7f32]" />
            <div className="absolute top-4 left-4 text-3xl font-black text-[#cd7f32]/20 group-hover:text-[#cd7f32]/40 transition-colors">#3</div>
            <div className="relative mb-4">
              <Avatar className="w-20 h-20 border-4 border-[#cd7f32] shadow-2xl group-hover:scale-110 transition-transform">
                <AvatarFallback className="bg-white font-bold text-[#cd7f32]">SC</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#cd7f32] flex items-center justify-center shadow-lg border-2 border-white">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground">{topThree[2].name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#cd7f32]">Level {topThree[2].level}</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{topThree[2].points} XP</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Rankings List */}
      <div className="space-y-4 relative z-10 px-2 lg:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative group w-full sm:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder="Search by name or department..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/50 border-border/40 focus:bg-white rounded-2xl h-11 shadow-sm transition-all font-medium"
            />
          </div>
          <div className="flex gap-2 bg-black/5 p-1 rounded-xl backdrop-blur-md">
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black tracking-widest bg-white text-foreground shadow-sm rounded-lg">OVERALL</Button>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black tracking-widest text-foreground/40 hover:text-foreground">DEPARTMENT</Button>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black tracking-widest text-foreground/40 hover:text-foreground">CLASS</Button>
          </div>
        </div>

        <Card className="premium-card overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {rankings.map((r) => (
                <motion.div 
                  key={r.rank} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className={cn(
                    "p-4 flex items-center justify-between group cursor-pointer transition-all hover:bg-black/[0.01]",
                    r.isMe ? "bg-secondary/[0.03] border-l-4 border-l-secondary" : ""
                  )}
                >
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "text-sm font-black w-6 text-center",
                      r.isMe ? "text-secondary" : "text-foreground/40"
                    )}>
                      {r.rank}
                    </span>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                        <AvatarFallback className={cn(
                          "font-bold text-xs",
                          r.isMe ? "bg-secondary text-white" : "bg-black/5 text-foreground/40"
                        )}>
                          {r.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                          {r.name}
                          {r.isMe && (
                            <span className="bg-secondary/10 text-secondary text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest">YOU</span>
                          )}
                        </h4>
                        <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest flex items-center gap-1">
                          LVL {r.level} · {r.rank <= 5 ? 'Elite' : 'Explorer'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="hidden sm:flex flex-col items-end">
                       <span className="text-sm font-black text-foreground">{r.points}</span>
                       <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">Total XP</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "flex items-center gap-1 text-[10px] font-black",
                         r.trend === 'up' ? "text-green-500" : r.trend === 'down' ? "text-red-500" : "text-gray-400"
                       )}>
                         {r.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                         {r.trend.toUpperCase()}
                       </div>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/20 hover:text-secondary group-hover:translate-x-1 transition-all">
                         <ChevronRight className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 bg-black/[0.02] text-center">
               <button className="text-[10px] font-black text-secondary hover:text-secondary/80 tracking-[0.2em] transition-colors">
                  LOAD MORE 50 RANKINGS
               </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Visual background element */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-secondary/[0.03] to-transparent pointer-events-none" />
    </motion.div>
  );
}
