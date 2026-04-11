'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface StudentProfile {
  id: string;
  full_name: string;
  roll_number: string;
  course: string;
  year_sem: string;
  avatar_url?: string;
  gpa?: number;
  attendance_percent?: number;
  total_credits?: number;
  email?: string;
  employee_id?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signInDemo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  const demoProfile: StudentProfile = {
    id: 'demo-user-123',
    full_name: 'John Doe',
    roll_number: '23A51A0501',
    course: 'B.Tech Computer Science',
    year_sem: '3rd Year · Sem 1',
    avatar_url: '/placeholder-avatar.jpg',
    gpa: 8.92,
    attendance_percent: 88,
    total_credits: 112,
    email: 'john.doe@student.ixl.edu'
  };

  const fetchProfile = async (uid: string) => {
    if (!isSupabaseConfigured) {
      setProfile(demoProfile);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', uid)
        .single();
      
      if (!error && data) {
        setProfile(data);
      } else {
        // Force demo profile as fallback for any authenticated user without a record
        setProfile(demoProfile);
      }
    } catch (err) {
      console.error('Error fetching profile, falling back to demo:', err);
      setProfile(demoProfile);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser({ id: 'demo-user-123', email: 'demo@ixl.edu' } as any);
      setProfile(demoProfile);
      setLoading(false);
      return;
    }

    const checkUser = async () => {
      const demoFlag = typeof window !== 'undefined' ? localStorage.getItem('ixl_demo_active') : null;
      console.log('[AuthDebug] checkUser started. DemoFlag:', demoFlag);

      // Check for forced demo mode first (e.g. from the bypass login)
      if (demoFlag === 'true') {
        console.log('[AuthDebug] Injecting Demo Profile');
        setUser({ id: 'demo-user-123', email: 'demo@ixl.edu' } as any);
        setProfile(demoProfile);
        setIsDemoMode(true);
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      // Clear demo mode if a real SIGNED_IN event happens from a different user
      if (event === 'SIGNED_IN') {
        if (typeof window !== 'undefined') localStorage.removeItem('ixl_demo_active');
      }

      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const signInDemo = async () => {
    console.log('[AuthDebug] Manual Demo Login Triggered');
    if (typeof window !== 'undefined') {
      localStorage.setItem('ixl_demo_active', 'true');
    }
    setUser({ id: 'demo-user-123', email: 'demo@ixl.edu' } as any);
    setProfile(demoProfile);
    setIsDemoMode(true);
    setLoading(false);
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ixl_demo_active');
    }
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setProfile(null);
    setUser(null);
    setIsDemoMode(!isSupabaseConfigured);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isDemoMode, signOut, refreshProfile, signInDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
