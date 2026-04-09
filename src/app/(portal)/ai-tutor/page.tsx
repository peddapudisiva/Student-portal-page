'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  History, 
  Plus,
  BookOpen,
  Mic,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      text: "Hello John! I'm your IXL AI Tutor. I've switched back to preview mode so you can see the UI. How can I help you excel today?", 
      time: 'Just now' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText = "I'm analyzing your request. Based on your course material, I'd recommend focusing on the core principles before diving into the implementation details.";
      
      if (textToSend.toLowerCase().includes('b-tree')) {
        responseText = "B-Trees are self-balancing search trees. They are particularly useful in databases and file systems because they allow for efficient access even with millions of records. Would you like a practice problem on balancing them?";
      } else if (textToSend.toLowerCase().includes('quiz')) {
        responseText = "Generating a practice quiz for your upcoming Data Structures exam... I've created 5 multiple-choice questions based on your last 3 lecture slides. Ready to start?";
      } else if (textToSend.toLowerCase().includes('schedule')) {
        responseText = "I've created an optimized study schedule. Since you have a Networking assignment due in 48 hours, I've prioritized its completion for tonight, followed by a review of OS concepts tomorrow morning.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 2000);
  };

  const suggestions = [
    { label: "Summarize B-Trees", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: "Practice Quiz", icon: <BrainCircuit className="w-3.5 h-3.5" /> },
    { label: "Study Schedule", icon: <Lightbulb className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden">
      {/* Left Sidebar - AI Context & History */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col w-[300px] h-full space-y-4"
      >
        <Card className="premium-card flex flex-col h-full bg-black/[0.02]">
          <div className="p-6 border-b border-border/40">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <History className="w-5 h-5 text-secondary" />
              History
            </h2>
          </div>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-white text-foreground/70 font-bold text-sm h-11 border border-transparent hover:border-border/40 hover:shadow-sm">
              <Plus className="w-4 h-4 text-secondary" /> New Chat
            </Button>
            <div className="pt-4 px-2">
              <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]">Previous 7 Days</span>
            </div>
            {['Complex Algorithms', 'OS Deadlocks', 'Networking Layers'].map((item) => (
              <Button key={item} variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-white text-foreground/60 font-semibold text-xs h-10">
                <FileText className="w-4 h-4" /> {item}
              </Button>
            ))}
          </CardContent>
          <div className="p-4 bg-secondary/5 border-t border-secondary/10 m-3 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">Premium Context</span>
             </div>
             <p className="text-[10px] font-medium text-foreground/60 leading-relaxed">
               I have access to your **12 Course PDFs**, **3 Previous Results**, and **Daily Timetable**.
             </p>
          </div>
        </Card>
      </motion.div>

      {/* Main Chat Interface */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col h-full overflow-hidden"
      >
        <Card className="premium-card h-full flex flex-col border-none shadow-2xl relative overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
          
          <div className="p-4 sm:p-6 border-b border-border/40 bg-white/40 backdrop-blur-xl flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20 overflow-hidden relative group">
                   <Bot className="w-7 h-7 text-white relative z-10" />
                   <motion.div 
                     animate={{ rotate: 360 }} 
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-gradient-to-tr from-secondary/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" 
                   />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2 tracking-tight">
                  AI Academic Tutor
                  <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-secondary/20">v3.1 Pro</span>
                </h1>
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Online & Ready to Help</p>
              </div>
            </div>
          </div>

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10 bg-black/[0.01]">
            <AnimatePresence mode="popLayout">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex gap-4 max-w-[85%] sm:max-w-[70%]",
                    m.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <Avatar className={cn(
                    "w-9 h-9 border-2 shrink-0",
                    m.sender === 'bot' ? "border-secondary/20 shadow-sm" : "border-white"
                  )}>
                    {m.sender === 'bot' ? (
                      <AvatarFallback className="bg-secondary text-white font-bold"><Bot className="w-5 h-5" /></AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-black/5 text-foreground/40 font-bold">JD</AvatarFallback>
                    )}
                  </Avatar>
                  <div className={cn(
                    "p-4 rounded-[22px] shadow-sm relative overflow-hidden",
                    m.sender === 'bot' 
                      ? "bg-white border border-border/40 rounded-tl-none font-medium text-foreground/80 leading-relaxed" 
                      : "bg-secondary text-white rounded-tr-none font-semibold text-sm leading-relaxed"
                  )}>
                    {m.sender === 'bot' && <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-2xl rounded-full" />}
                    <p>{m.text}</p>
                    <span className={cn(
                      "text-[9px] font-bold mt-2 block uppercase tracking-widest opacity-40",
                      m.sender === 'user' ? "text-white text-right" : "text-foreground"
                    )}>
                      {m.time}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <Avatar className="w-9 h-9 border-2 border-secondary/20 shadow-sm">
                    <AvatarFallback className="bg-secondary text-white"><Bot className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-border/40 px-5 py-4 rounded-[22px] rounded-tl-none flex items-center gap-1 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-secondary/40 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-6 bg-white/40 backdrop-blur-xl border-t border-border/40 relative z-10 rounded-b-[24px]">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
              {suggestions.map((s) => (
                <Button 
                  key={s.label} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSend(s.label)}
                  className="rounded-full border-border/40 hover:border-secondary hover:text-secondary hover:bg-secondary/5 font-bold text-[10px] uppercase tracking-wider h-8 bg-white/50 backdrop-blur-sm shadow-sm transition-all"
                >
                  {s.icon} <span className="ml-2">{s.label}</span>
                </Button>
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto flex items-center gap-3">
              <div className="flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary/40 group-focus-within:text-secondary group-focus-within:animate-pulse transition-colors" />
                </div>
                <Input 
                  placeholder="Ask your tutor anything..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="bg-white border-border/40 focus:ring-2 focus:ring-secondary/20 focus:border-secondary rounded-[18px] pl-10 pr-12 h-14 shadow-lg font-medium transition-all"
                />
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl text-foreground/30 hover:text-secondary hover:bg-secondary/5 h-10 w-10">
                  <Mic className="w-5 h-5" />
                </Button>
              </div>

              <Button 
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-[18px] w-14 h-14 flex items-center justify-center shadow-xl shadow-secondary/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 group"
              >
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
            
            <p className="text-center text-[9px] font-bold text-foreground/30 uppercase mt-4 tracking-[0.2em]">
              Powered by IXL Intelligence • Local Context Enabled
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
