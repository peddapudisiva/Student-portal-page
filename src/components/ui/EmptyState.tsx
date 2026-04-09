'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-16 text-center bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
    >
      <div className="w-20 h-20 bg-[#c8900a]/10 rounded-full flex items-center justify-center mb-8 shadow-inner border border-[#c8900a]/5">
        <Icon className="w-10 h-10 text-[#c8900a] drop-shadow-sm" />
      </div>
      <h3 className="text-2xl font-bold text-[#12223f] mb-3 tracking-tight">{title}</h3>
      <p className="text-base text-[#12223f]/50 max-w-sm mb-10 leading-relaxed font-medium">
        {description}
      </p>
      {actionText && (
        <Button 
          onClick={onAction}
          className="bg-[#c8900a] hover:bg-[#a67608] text-white font-bold rounded-full px-10 h-12 shadow-[0_4px_20px_rgba(200,144,10,0.2)] hover:shadow-[0_6px_25px_rgba(200,144,10,0.3)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
}
