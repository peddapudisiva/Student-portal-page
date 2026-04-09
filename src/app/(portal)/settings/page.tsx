'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Eye, 
  Lock, 
  User, 
  Moon, 
  Sun,
  ShieldCheck,
  Globe,
  Save,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 pb-12"
    >
      <motion.div variants={itemVars} className="relative z-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-secondary" />
          System Settings
        </h1>
        <p className="text-sm font-semibold text-foreground/40 mt-1 uppercase tracking-widest pl-1">Configuration and Personalization</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <motion.div variants={itemVars} className="lg:col-span-1 space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                 activeTab === tab.id 
                 ? 'bg-secondary text-white shadow-xl shadow-secondary/20 translate-x-1' 
                 : 'bg-white/50 text-foreground/60 hover:bg-white hover:text-secondary'
               }`}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </motion.div>

        {/* Content Area */}
        <motion.div variants={itemVars} className="lg:col-span-3">
           <Card className="premium-card border-none shadow-2xl min-h-[500px] flex flex-col">
             {activeTab === 'account' && (
               <>
                 <CardHeader className="p-8 border-b border-border/40 bg-black/[0.01]">
                   <CardTitle className="text-xl font-bold text-foreground">Account Information</CardTitle>
                   <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mt-1">Update your basic profile and login details</p>
                 </CardHeader>
                 <CardContent className="p-8 space-y-8 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">First Name</Label>
                          <Input defaultValue="John" className="bg-white border-border/40 h-12 rounded-xl focus:ring-secondary/20" />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Last Name</Label>
                          <Input defaultValue="Doe" className="bg-white border-border/40 h-12 rounded-xl focus:ring-secondary/20" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email Address</Label>
                       <Input disabled defaultValue="john.doe@ixl.edu" className="bg-black/[0.02] border-border/40 h-12 rounded-xl text-foreground/40" />
                    </div>
                    
                    <div className="pt-8 border-t border-border/20">
                       <h4 className="text-sm font-black text-red-500 uppercase tracking-widest mb-4">Danger Zone</h4>
                       <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 font-bold px-6 h-12 rounded-xl">
                          <Trash2 className="w-4 h-4 mr-2" /> Deactivate Account
                       </Button>
                    </div>
                 </CardContent>
               </>
             )}

             {activeTab === 'notifications' && (
               <>
                 <CardHeader className="p-8 border-b border-border/40">
                   <CardTitle className="text-xl font-bold text-foreground">Notification Preferences</CardTitle>
                 </CardHeader>
                 <CardContent className="p-8 space-y-6">
                    {[
                      { title: 'Assignment Reminders', desc: 'Get notified 24h before deadlines', icon: <Globe className="w-4 h-4" /> },
                      { title: 'New Messages', desc: 'Alerts for chat and tutor messages', icon: <Bell className="w-4 h-4" /> },
                      { title: 'Fee Alerts', desc: 'Upcoming fee payment notifications', icon: <Globe className="w-4 h-4" /> },
                      { title: 'AI Insights', desc: 'Weekly summary from your AI Tutor', icon: <SettingsIcon className="w-4 h-4" /> }
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-border/40">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                               {item.icon}
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-foreground">{item.title}</h5>
                               <p className="text-[11px] font-medium text-foreground/40">{item.desc}</p>
                            </div>
                         </div>
                         <Switch checked />
                      </div>
                    ))}
                 </CardContent>
               </>
             )}

             {activeTab === 'privacy' && (
                <>
                  <CardHeader className="p-8 border-b border-border/40">
                    <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                       <ShieldCheck className="w-6 h-6 text-green-500" /> Security & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-1">Password Management</h4>
                        <Button variant="outline" className="w-full justify-between h-14 rounded-xl border-border/40 font-bold px-6">
                           Update Account Password <Lock className="w-4 h-4 text-secondary" />
                        </Button>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-1">Login Options</h4>
                        <div className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/10 rounded-2xl">
                           <div className="flex items-center gap-4">
                              <Lock className="w-5 h-5 text-green-500" />
                              <span className="text-sm font-bold text-foreground">Two-Factor Authentication</span>
                           </div>
                           <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full">Active</span>
                        </div>
                     </div>
                  </CardContent>
                </>
             )}

             {activeTab === 'appearance' && (
                <>
                  <CardHeader className="p-8 border-b border-border/40">
                    <CardTitle className="text-xl font-bold text-foreground">Portal Appearance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                     <div className="grid grid-cols-2 gap-6">
                        <button className="p-6 rounded-2xl border-2 border-secondary bg-white flex flex-col items-center gap-4 shadow-xl">
                           <Sun className="w-10 h-10 text-[#c8900a]" />
                           <span className="font-bold text-sm">Frost Pearl (Light)</span>
                        </button>
                        <button className="p-6 rounded-2xl border-2 border-transparent bg-black/5 flex flex-col items-center gap-4 hover:border-border/40 grayscale opacity-60 cursor-not-allowed">
                           <Moon className="w-10 h-10 text-foreground/40" />
                           <span className="font-bold text-sm text-foreground/40">Midnight Ink (Soon)</span>
                        </button>
                     </div>
                  </CardContent>
                </>
             )}

             <div className="mt-auto p-8 border-t border-border/40 bg-black/[0.01] flex justify-end gap-4">
                <Button variant="ghost" className="font-bold rounded-xl h-12 px-6">Discard Changes</Button>
                <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl h-12 px-8 shadow-lg shadow-secondary/20">
                   <Save className="w-4 h-4 mr-2" /> Save Settings
                </Button>
             </div>
           </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
