'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function LeaveForm() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        className="w-full bg-[#12223f] hover:bg-[#12223f]/90 text-white font-bold h-12"
      >
        Apply for Leave
      </Button>
    );
  }

  return (
    <Card className="bg-white border-[#e2e8f0]">
      <CardHeader className="bg-[#f7f8fb] border-b border-[#e2e8f0] py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-[16px] font-bold text-[#12223f]">Leave Application</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 px-2 text-[#ef4444] hover:bg-[#ef4444]/10">Cancel</Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#12223f] font-bold text-xs">From Date</Label>
            <Input type="date" className="h-9" />
          </div>
          <div className="space-y-2">
            <Label className="text-[#12223f] font-bold text-xs">To Date</Label>
            <Input type="date" className="h-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[#12223f] font-bold text-xs">Reason</Label>
          <Input placeholder="Enter valid reason..." className="h-9" />
        </div>
        <div className="space-y-2">
          <Label className="text-[#12223f] font-bold text-xs">Medical Document (Optional)</Label>
          <Input type="file" className="h-9 pt-[5px]" />
        </div>
        <Button className="w-full bg-[#c8900a] hover:bg-[#a67608] text-white font-bold h-10 mt-2">
          Submit Application
        </Button>
      </CardContent>
    </Card>
  );
}
