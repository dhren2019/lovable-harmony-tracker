
import React from 'react';
import { format } from 'date-fns';
import HabitTracker from '../habits/HabitTracker';
import ReflectionInput from '../reflections/ReflectionInput';
import ProgressVisuals from '../progress/ProgressVisuals';
import { Separator } from '@/components/ui/separator';

const DashboardView: React.FC = () => {
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Lovable</h1>
        <p className="text-gray-500">{today}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <ProgressVisuals />
          <Separator className="bg-gray-200" />
          <HabitTracker />
        </div>
        
        <div>
          <ReflectionInput />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
