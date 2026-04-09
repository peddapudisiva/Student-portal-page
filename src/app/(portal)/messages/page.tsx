'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Paperclip, Smile, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ConversationHeader } from '@/components/messages/ConversationHeader';
import { MessageBubble } from '@/components/messages/MessageBubble';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'typing';
  role?: string;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export default function MessagesPage() {
  const [activeContactId, setActiveContactId] = useState('1');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'other', text: 'Hello John! Have you reviewed the link for the DS project yet?', time: '10:30 AM' },
    { id: '2', sender: 'me', text: 'Hey Prof! Yes, I was just looking at it. The B-Tree implementation seems clear.', time: '10:35 AM' },
    { id: '3', sender: 'other', text: 'Great. Make sure to handle the edge cases for deletion.', time: '10:36 AM' },
    { id: '4', sender: 'me', text: 'Got it. I\'ll submit the draft by tomorrow morning.', time: '10:38 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const contacts: Contact[] = [
    { id: '1', name: 'Prof. Smith', avatar: '', lastMessage: 'Great. Make sure to...', time: '10:36 AM', unreadCount: 0, status: 'online', role: 'Faculty' },
    { id: '2', name: 'Computer Science Dept', avatar: '', lastMessage: 'Exam timetable has been...', time: 'Yesterday', unreadCount: 3, status: 'offline', role: 'Official' },
    { id: '3', name: 'Alice (Class Rep)', avatar: '', lastMessage: 'Let\'s meet at the library.', time: '2 days ago', unreadCount: 0, status: 'offline' },
    { id: '4', name: 'Hackathon Group', avatar: '', lastMessage: 'Did we finalize the tech?', time: '3 days ago', unreadCount: 1, status: 'typing' },
  ];

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden">
      {/* Left Sidebar - Contacts */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full sm:w-[350px] flex flex-col h-full space-y-4"
      >
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
            <Settings className="w-5 h-5 text-foreground/40" />
          </Button>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-secondary transition-colors" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-12 bg-white/50 border-border/40 focus:bg-white rounded-2xl h-11 shadow-sm transition-all"
          />
        </div>

        <Card className="premium-card flex-1 overflow-hidden">
          <CardContent className="p-2 h-full overflow-y-auto space-y-1 custom-scrollbar">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-[16px] transition-all duration-200 text-left relative overflow-hidden group",
                  activeContactId === contact.id 
                    ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                    : "hover:bg-black/5"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className={cn(
                    "w-12 h-12 border-2",
                    activeContactId === contact.id ? "border-white/50" : "border-white"
                  )}>
                    <AvatarFallback className={cn(
                      "font-bold",
                      activeContactId === contact.id ? "bg-white/20 text-white" : "bg-secondary/10 text-secondary"
                    )}>
                      {contact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {contact.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                  {contact.status === 'typing' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-white rounded-full animate-pulse"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm truncate">{contact.name}</h3>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      activeContactId === contact.id ? "text-white/60" : "text-foreground/40"
                    )}>
                      {contact.time}
                    </span>
                  </div>
                  <p className={cn(
                    "text-xs truncate font-medium pr-4",
                    activeContactId === contact.id ? "text-white/80" : "text-foreground/50"
                  )}>
                    {contact.status === 'typing' ? 'is typing...' : contact.lastMessage}
                  </p>
                </div>

                {contact.unreadCount > 0 && activeContactId !== contact.id && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {contact.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col h-full overflow-hidden"
      >
        <Card className="premium-card h-full flex flex-col border-none shadow-xl">
          <ConversationHeader contact={activeContact} />

          <CardContent className="flex-1 overflow-y-auto p-6 bg-black/[0.01] custom-scrollbar flex flex-col space-y-1">
             <div className="flex-1" /> {/* Spacer to push messages to bottom */}
             {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
             ))}
          </CardContent>

          <div className="p-4 bg-white/50 backdrop-blur-md border-t border-border/40 rounded-b-[20px]">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <Button variant="ghost" size="icon" className="rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5 h-10 w-10">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-foreground/40 hover:text-secondary hover:bg-secondary/5 h-10 w-10">
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 relative">
                 <Input 
                   placeholder="Type a message..." 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                   className="bg-white border-border/40 focus:ring-0 focus:border-secondary rounded-full px-6 h-12 shadow-sm font-medium"
                 />
              </div>

              <Button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-secondary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
