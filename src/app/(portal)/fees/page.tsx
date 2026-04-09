'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, CreditCard, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function FeesPage() {
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success'>('idle');
  const { user } = useAuth();
  const [dbFees, setDbFees] = useState<FeeRecord[]>([]);

interface FeeRecord {
  id: string;
  type: string;
  amount: number;
  status: 'pending' | 'paid';
  due_date: string;
}

  useEffect(() => {
    if (!user) return;

    const fetchFees = async () => {
      const { data, error } = await supabase
        .from('fees')
        .select('*')
        .eq('student_id', user.id);

      if (!error && data) {
        setDbFees(data);
      }
    };

    fetchFees();
  }, [user]);

  const handlePayment = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setPaymentState('success');
      setTimeout(() => setPaymentState('idle'), 3000);
    }, 2500);
  };

  const totalOutstanding = dbFees
    .filter(f => f.status === 'pending')
    .reduce((acc, f) => acc + (f.amount || 0), 0);

  const displayOutstanding = totalOutstanding > 0 ? totalOutstanding : 45000; // Fallback mock

  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-6 pb-12 relative">
      <AnimatePresence>
        {paymentState !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="premium-card p-10 max-w-sm w-full text-center shadow-2xl">
              {paymentState === 'processing' ? (
                <>
                  <Loader2 className="w-16 h-16 text-secondary animate-spin mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground">Processing Payment...</h3>
                  <p className="text-sm font-semibold text-foreground/50 mt-2">Please do not close this window or press back.</p>
                </>
              ) : (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 15 }}>
                    <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-6 drop-shadow-md" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">Payment Successful!</h3>
                  <p className="text-sm font-semibold text-foreground/50 mt-3">Receipt has been sent to your registered email.</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVars}>
        <h1 className="text-[28px] font-bold text-foreground tracking-tight mb-6 drop-shadow-sm">Fee Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-xl relative overflow-hidden rounded-[20px]">
            <div className="absolute -top-20 -right-10 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 p-8 opacity-5"><Receipt className="w-40 h-40" /></div>
            <CardContent className="p-8 relative z-10">
              <p className="text-white/60 font-bold uppercase tracking-widest text-sm mb-2 drop-shadow-sm">Total Outstanding</p>
              <h2 className="text-[42px] font-bold text-secondary tracking-tight drop-shadow-md">₹ {displayOutstanding.toLocaleString()}</h2>
              <p className="text-sm font-semibold text-white/50 mt-2">Due Date: Oct 20, 2026</p>
              <Button onClick={handlePayment} className="mt-8 w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-14 rounded-full shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:-translate-y-1 transition-all duration-300 text-md">
                <CreditCard className="w-5 h-5 mr-3" /> Pay Complete Amount Now
              </Button>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader className="border-b border-border/40 bg-black/[0.02]">
              <CardTitle className="text-lg font-bold text-foreground">Fee Structure Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-5 border-b border-border/40 flex justify-between items-center bg-white/50">
                <span className="font-bold text-foreground/80">Tuition Fee (Sem 5)</span>
                <span className="font-bold text-foreground">₹ 40,000</span>
              </div>
              <div className="p-5 border-b border-border/40 flex justify-between items-center bg-white/50">
                <span className="font-bold text-foreground/80">Library Fee</span>
                <span className="font-bold text-foreground">₹ 2,000</span>
              </div>
              <div className="p-5 flex justify-between items-center bg-black/[0.02] rounded-b-[20px]">
                <span className="font-bold text-foreground/80">Placement Training</span>
                <span className="font-bold text-foreground">₹ 3,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVars}>
        <h3 className="font-bold text-foreground tracking-tight text-xl mb-5 mt-10 drop-shadow-sm">Recent Transactions</h3>
        <Card className="premium-card overflow-hidden">
          <CardContent className="p-0">
            {dbFees.filter(f => f.status === 'paid').length > 0 ? (
              dbFees.filter(f => f.status === 'paid').map((fee) => (
                <div key={fee.id} className="p-5 flex items-center justify-between border-b border-border/40 hover:bg-black/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[12px] bg-secondary/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{fee.type}</h4>
                      <p className="text-xs font-semibold text-foreground/50 mt-1 uppercase tracking-wide">Txn: IXL{fee.id.toString().substring(0,6)} • Paid on {fee.due_date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground text-lg">₹ {fee.amount.toLocaleString()}</span>
                    <Button variant="ghost" size="sm" className="block text-secondary hover:text-primary hover:bg-transparent h-auto p-0 mt-1 font-bold text-xs uppercase tracking-wide">Download Receipt</Button>
                  </div>
                </div>
              ))
            ) : (
              // Mock Fallback
              <div className="p-5 flex items-center justify-between border-b border-border/40 hover:bg-black/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[12px] bg-secondary/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Semester 4 Tuition Fee</h4>
                    <p className="text-xs font-semibold text-foreground/50 mt-1 uppercase tracking-wide">Txn: IXL9827394 • Paid on May 10, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-foreground text-lg">₹ 40,000</span>
                  <Button variant="ghost" size="sm" className="block text-secondary hover:text-primary hover:bg-transparent h-auto p-0 mt-1 font-bold text-xs uppercase tracking-wide">Download Receipt</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
