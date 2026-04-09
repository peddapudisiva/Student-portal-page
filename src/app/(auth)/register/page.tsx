'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isSupabaseConfigured) {
      setError('Database is not connected. Registration is disabled in Demo Mode.');
      setIsLoading(false);
      return;
    }

    if (!fullName || !rollNumber || !email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Sign up user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        // 2. Create student profile
        const { error: profileError } = await supabase
          .from('students')
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              roll_number: rollNumber,
              email: email,
              course: 'Not Assigned',
              year_sem: '1st Year · Sem 1',
              gpa: 0.0,
              attendance_percent: 0.0
            }
          ]);

        if (profileError) {
          // Check for duplicate roll number
          if (profileError.code === '23505') {
            setError('This Roll Number is already registered.');
          } else {
            setError('Account created, but profile setup failed. Please contact admin.');
          }
          setIsLoading(false);
          return;
        }

        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen w-full bg-[#12223f] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl p-10 text-center space-y-6 shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
             <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }} 
               className="text-white font-bold text-4xl"
             >
               ✓
             </motion.div>
          </div>
          <h1 className="text-2xl font-bold text-[#12223f]">Success!</h1>
          <p className="text-[#12223f]/60 font-medium">
            Your account has been created. Redirecting you to login...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#12223f] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white rounded-[8px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        
        {/* Left Panel - Hidden on Mobile */}
        <div 
          className="hidden md:flex flex-[0.8] relative bg-[#12223f] flex-col justify-between p-10 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: 'url(/college-bg.png)' }}
        >
          <div className="absolute inset-0 bg-[#12223f]/70 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#12223f] to-transparent z-10"></div>
          
          <motion.button 
            onClick={() => router.push('/login')}
            className="relative z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </motion.button>

          <motion.div className="relative z-20">
            <h2 className="text-[#c8900a] font-black tracking-widest uppercase text-xs mb-2">Join the Community</h2>
            <h1 className="text-white font-bold text-4xl font-sans tracking-tight mb-4">Start Your Journey</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Create your student profile today to access your academics, AI tutor, and campus modules.
            </p>
          </motion.div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-white overflow-y-auto max-h-[90vh]">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-[#c8900a] text-white flex items-center justify-center rounded-[8px] font-bold text-xl mb-6 shadow-md md:mx-0 mx-auto">
                IXL
              </div>
              <h1 className="text-[24px] font-bold text-[#12223f] mb-2 font-sans tracking-tight">Create Account</h1>
              <p className="text-sm text-[#12223f]/60 font-medium">Join the IXL Integrated School portal.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#12223f] font-bold text-xs uppercase tracking-wider">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your name"
                    className="border-[#e2e8f0] focus-visible:ring-[#c8900a]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-[#12223f] font-bold text-xs uppercase tracking-wider">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="e.g. 23A51A0501"
                    className="border-[#e2e8f0] focus-visible:ring-[#c8900a]"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#12223f] font-bold text-xs uppercase tracking-wider">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@student.ixl.edu"
                  className="border-[#e2e8f0] focus-visible:ring-[#c8900a]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#12223f] font-bold text-xs uppercase tracking-wider">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="border-[#e2e8f0] focus-visible:ring-[#c8900a] pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#12223f]/50 hover:text-[#c8900a]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-xs font-bold text-[#ef4444] bg-[#ef4444]/10 p-3 rounded-[8px] border border-[#ef4444]/20 animate-in fade-in slide-in-from-top-1 duration-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#12223f] hover:bg-[#1a2f55] text-white font-bold h-12 transition-all duration-150 shadow-md flex items-center justify-center gap-2 mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Account'}
              </Button>

              <div className="text-center pt-2">
                <p className="text-xs text-[#12223f]/60 font-medium">
                  By joining, you agree to our{' '}
                  <button type="button" className="text-[#c8900a] font-bold hover:underline">Terms of Service</button>
                </p>
              </div>
            </form>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}
