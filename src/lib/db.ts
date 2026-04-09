import { supabase, isSupabaseConfigured } from './supabase';

/**
 * IXL Student Portal - Database Service Layer
 * This service provides a clean interface for all portal data fetching.
 * It automatically switches between Real Data (Supabase) and Demo Data (Mock).
 */

// --- High Fidelity Demo Data ---
const demoData = {
  assignments: [
    { id: 'd1', subject: 'Data Structures', title: 'Assignment 3: B-Trees Implementation', due: 'Oct 15, 2026', deadline: '2026-10-15T23:59:59', urgent: true, status: 'pending' },
    { id: 'd2', subject: 'Operating Systems', title: 'Lab Record 2', due: 'Oct 18, 2026', deadline: '2026-10-18T23:59:59', urgent: false, status: 'pending' },
    { id: 'd3', subject: 'Computer Networks', title: 'Packet Tracer Lab', submitted_on: 'Oct 10, 2026', grade: 'A', status: 'submitted' },
  ],
  fees: [
    { id: 'f1', type: 'Tuition Fee (Sem 5)', amount: 40000, due_date: 'Oct 20, 2026', status: 'pending' },
    { id: 'f2', type: 'Library Fee', amount: 2000, due_date: 'Oct 20, 2026', status: 'pending' },
    { id: 'f3', type: 'Placement Training', amount: 3000, due_date: 'Oct 20, 2026', status: 'pending' },
    { id: 'f4', type: 'Semester 4 Tuition Fee', amount: 40000, due_date: 'May 10, 2026', status: 'paid' },
  ],
  academics: {
    gpa: 8.92,
    attendance: 88,
    credits: 112,
    total_credits: 140
  }
};

export const db = {
  // --- Profile & Personal Info ---
  getProfile: async (userId: string) => {
    if (!isSupabaseConfigured) return { data: null, error: null }; // AuthContext handles profile
    const { data, error } = await supabase.from('students').select('*').eq('id', userId).single();
    return { data, error };
  },

  // --- Academics & Results ---
  getAcademics: async (userId: string) => {
    if (!isSupabaseConfigured) return { data: [demoData.academics], error: null };
    const { data, error } = await supabase.from('academics').select('*').eq('student_id', userId);
    return { data, error };
  },

  // --- Assignments ---
  getAssignments: async (userId: string) => {
    if (!isSupabaseConfigured) return { data: demoData.assignments, error: null };
    const { data, error } = await supabase.from('assignments').select('*').eq('student_id', userId).order('deadline', { ascending: true });
    return { data, error };
  },

  // --- Fees & Transactions ---
  getFees: async (userId: string) => {
    if (!isSupabaseConfigured) return { data: demoData.fees, error: null };
    const { data, error } = await supabase.from('fees').select('*').eq('student_id', userId);
    return { data, error };
  },

  // --- Attendance ---
  getAttendance: async (userId: string) => {
    if (!isSupabaseConfigured) return { data: [{ percent: demoData.academics.attendance }], error: null };
    const { data, error } = await supabase.from('attendance').select('*').eq('student_id', userId);
    return { data, error };
  }
};
