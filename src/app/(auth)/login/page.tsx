'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isSupabaseConfigured) {
      // Automatic login in Demo Mode
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
      return;
    }

    if (!email || !password) {
      setError('Please enter both Email and Password.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#12223f] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-[8px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        
        {/* Left Panel - Hidden on Mobile */}
        <div 
          className="hidden md:flex flex-1 relative bg-[#12223f] flex-col justify-between p-10 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: 'url(/college-bg.png)' }}
        >
          {/* Mock photo background overlay */}
          <div className="absolute inset-0 bg-[#12223f]/60 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#12223f] to-transparent z-10"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-20"
          >
            <h2 className="text-white font-bold text-3xl font-sans tracking-tight">IXL</h2>
            <p className="text-[#c8900a] font-bold tracking-widest uppercase text-sm mt-1">Integrated School</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-20"
          >
            <blockquote className="text-white text-lg leading-relaxed mb-4 font-sans italic">
              "Education is not the learning of facts, but the training of the mind to think."
            </blockquote>
            <p className="text-[#c8900a] text-sm font-bold">— Albert Einstein</p>
          </motion.div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm w-full mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#c8900a] text-white flex items-center justify-center rounded-[8px] font-bold text-2xl mx-auto mb-6 shadow-md">
                IXL
              </div>
              <h1 className="text-[22px] font-bold text-[#12223f] mb-2">Student Portal</h1>
              <p className="text-sm text-[#12223f]/60 font-medium">Welcome back! Please login to your account.</p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onSubmit={handleLogin} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#12223f] font-bold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`border-[#e2e8f0] focus-visible:ring-[#c8900a] transition-all duration-150 ${error ? 'border-[#ef4444]' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#12223f] font-bold">Password</Label>
                  <button type="button" className="text-sm font-bold text-[#c8900a] hover:underline transition-all">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative border-none">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`border-[#e2e8f0] focus-visible:ring-[#c8900a] pr-10 transition-all duration-150 ${error ? 'border-[#ef4444]' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#12223f]/50 hover:text-[#c8900a] transition-colors duration-150"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-[#12223f]/60 font-medium mt-1">
                  First login: use DOB in ddmmyyyy format
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm font-bold text-[#ef4444] bg-[#ef4444]/10 p-3 rounded-[8px]"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#c8900a] hover:bg-[#a67608] text-white font-bold h-11 transition-all duration-150 shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-[#12223f]/60 font-medium">
                  Don&apos;t have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => router.push('/register')}
                    className="text-[#c8900a] font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </motion.form>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}
