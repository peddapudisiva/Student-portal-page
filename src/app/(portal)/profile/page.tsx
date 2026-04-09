'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { 
  Award, 
  Target,
  Trophy,
  Star,
  Settings,
  Edit,
  BookOpen,
  Mail,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const { profile } = useAuth();
  
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stats = [
    { label: 'Overall GPA', value: profile?.gpa?.toString() || '3.84', icon: <Star className="w-5 h-5 text-secondary" />, color: 'bg-secondary/10' },
    { label: 'Attendance', value: profile?.attendance_percent ? `${profile.attendance_percent}%` : '92.5%', icon: <Target className="w-5 h-5 text-green-500" />, color: 'bg-green-500/10' },
    { label: 'Credits', value: profile?.total_credits ? `${profile.total_credits} / 140` : '112 / 140', icon: <BookOpen className="w-5 h-5 text-secondary" />, color: 'bg-secondary/10' },
  ];

  const badges = [
    { name: 'Semester Topper', icon: <Trophy className="w-6 h-6" />, category: 'Academic' },
    { name: 'Perfect Month', icon: <Award className="w-6 h-6" />, category: 'Attendance' },
    { name: 'AI Pioneer', icon: <Star className="w-6 h-6" />, category: 'Tech' },
    { name: 'Fast Learner', icon: <Award className="w-6 h-6" />, category: 'Skills' },
  ];

  const displayName = profile?.full_name || 'John Doe';

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 pb-12"
    >
      {/* Profile Header Card */}
      <motion.div variants={itemVars}>
        <Card className="premium-card overflow-hidden border-none shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[140px] bg-gradient-to-r from-primary via-secondary to-primary" />
          <div className="absolute top-0 left-0 w-full h-[140px] opacity-10 bg-[url('/mesh-bg.png')] bg-cover" />
          
          <CardContent className="pt-24 pb-10 px-8 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <Avatar className="w-36 h-36 border-8 border-white shadow-2xl relative z-10">
                <AvatarImage src={profile?.avatar_url || "/placeholder-avatar.jpg"} />
                <AvatarFallback className="bg-primary text-white text-3xl font-bold uppercase">
                  {displayName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20 border-4 border-white">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-black text-foreground tracking-tight drop-shadow-sm">{displayName}</h1>
                <span className="bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-secondary/30">ELITE STUDENT</span>
              </div>
              <p className="text-sm font-bold text-foreground/40 mt-1 uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                {profile?.course || 'B.Tech Computer Science'} <span className="w-1.5 h-1.5 rounded-full bg-border" /> {profile?.year_sem || 'Year 4 · Sem 7'}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                 <span className="text-[11px] font-bold text-foreground/60 flex items-center gap-1.5 bg-black/[0.03] px-3 py-1.5 rounded-xl border border-border/40"><Mail className="w-3.5 h-3.5 text-secondary" /> {profile?.email || 'eswar.v@student.ixl.edu'}</span>
                 <span className="text-[11px] font-bold text-foreground/60 flex items-center gap-1.5 bg-black/[0.03] px-3 py-1.5 rounded-xl border border-border/40"><MapPin className="w-3.5 h-3.5 text-secondary" /> Block C · Room 402</span>
              </div>
            </div>

            <div className="flex gap-3">
               <Link href="/settings">
                 <Button className="bg-white hover:bg-black/5 text-foreground border border-border/40 font-bold h-11 px-6 rounded-xl shadow-sm transition-all">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                 </Button>
               </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Stats */}
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="premium-card bg-white/60 hover:bg-white transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-inner`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="premium-card">
            <CardHeader className="border-b border-border/40 bg-black/[0.01]">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                 {badges.map((badge) => (
                   <div key={badge.name} className="flex flex-col items-center group cursor-pointer">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-border/40 flex items-center justify-center text-secondary shadow-lg group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all group-hover:scale-110 mb-3 relative">
                         {badge.icon}
                         <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-[11px] font-black text-foreground uppercase tracking-tight text-center">{badge.name}</span>
                      <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest">{badge.category}</span>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div variants={itemVars} className="space-y-8">
          <Card className="premium-card">
            <CardHeader className="border-b border-border/40 bg-black/[0.01]">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground/60">Registry Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               {[
                 { label: 'Full Name', value: profile?.full_name || 'John Doe' },
                 { label: 'Date of Birth', value: 'May 14, 2004' },
                 { label: 'Blood Group', value: 'O+' },
                 { label: 'Enrollment', value: profile?.roll_number || '23A51A0501' },
                 { label: 'Joined', value: 'August 2023' }
               ].map((info) => (
                 <div key={info.label} className="flex justify-between items-center pb-3 border-b border-border/20 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{info.label}</span>
                    <span className="text-xs font-extrabold text-foreground">{info.value}</span>
                 </div>
               ))}
            </CardContent>
          </Card>

          <Card className="premium-card bg-secondary/5 border-secondary/20">
             <CardContent className="p-6 text-center">
                <Trophy className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-black text-foreground leading-tight uppercase tracking-tight mb-2">Academic Rank</h3>
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">You are currently ranked</p>
                <div className="text-4xl font-black text-secondary tracking-tighter mb-1">#06</div>
                <p className="text-[11px] font-extrabold text-foreground/60 uppercase">Among 240 Students</p>
                <Link href="/leaderboard">
                  <Button variant="link" className="text-secondary text-[10px] font-black uppercase tracking-widest mt-4">View Leaderboard</Button>
                </Link>
             </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
