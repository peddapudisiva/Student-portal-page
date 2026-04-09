'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Phone, Video, Search } from 'lucide-react';

interface Contact {
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  role?: string;
}

export function ConversationHeader({ contact }: { contact: Contact }) {
  return (
    <div className="p-4 border-b border-border/40 bg-white/50 backdrop-blur-md flex items-center justify-between relative z-10 rounded-t-[20px]">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-secondary text-white font-bold">
              {contact.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {contact.status === 'online' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div>
          <h2 className="font-bold text-foreground leading-tight">{contact.name}</h2>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              contact.status === 'online' ? "text-green-500" : "text-foreground/40"
            )}>
              {contact.status === 'typing' ? 'Typing...' : contact.status}
            </span>
            {contact.role && (
              <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded shadow-sm">
                {contact.role}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5">
          <Phone className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5">
          <Video className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Utility for cn if not exported from lib/utils correctly in this scope
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
