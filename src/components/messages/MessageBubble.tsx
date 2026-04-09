'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === 'me';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[75%] sm:max-w-[60%] px-4 py-3 rounded-2xl shadow-sm relative group",
        isMe 
          ? "bg-secondary text-white rounded-tr-none" 
          : "bg-white text-foreground border border-border/40 rounded-tl-none"
      )}>
        <p className="text-sm font-medium leading-relaxed">{message.text}</p>
        <div className={cn(
          "text-[10px] mt-1 font-bold uppercase tracking-wider opacity-60 flex items-center gap-1",
          isMe ? "text-white/80 justify-end" : "text-foreground/40"
        )}>
          {message.time}
        </div>
        
        {/* Subtle hover effect / tail logic */}
        <div className={cn(
          "absolute top-0 w-2 h-2",
          isMe 
            ? "-right-1 bg-secondary rounded-full" 
            : "-left-1 bg-white border-l border-t border-border/40 rounded-full"
        )} />
      </div>
    </motion.div>
  );
}
