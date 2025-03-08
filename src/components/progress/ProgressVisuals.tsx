
import React, { useEffect, useRef, useState } from 'react';
import { ProgressData } from '@/lib/types';
import { mockProgressData, mockHabits } from '@/lib/api';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, Label } from 'recharts';
import { cn } from '@/lib/utils';

const ProgressVisuals: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>(mockProgressData);
  const circleRef = useRef<SVGCircleElement>(null);
  const completionRate = calculateCompletionRate();
  
  function calculateCompletionRate(): number {
    const completed = mockHabits.filter(h => h.completed).length;
    const total = mockHabits.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
  
  // Progress circle animation
  useEffect(() => {
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 50;
      const offset = circumference - (completionRate / 100) * circumference;
      
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [completionRate]);
  
  return (
    <div className="space-y-6 animate-scale-in">
      <h2 className="text-2xl font-semibold text-gray-800">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Circular progress indicator */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center card-hover">
          <div className="relative w-[120px] h-[120px]">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#F1F0FB"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5DEFF"
                strokeWidth="10"
                strokeLinecap="round"
                className="progress-circle animate-progress-fill"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <span className="text-3xl font-bold text-gray-800">{completionRate}%</span>
                <span className="block text-xs text-gray-500 mt-1">Completed</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="font-medium text-gray-700">Today's Habits</h3>
            <p className="text-sm text-gray-500 mt-1">
              {mockHabits.filter(h => h.completed).length} of {mockHabits.length} completed
            </p>
          </div>
        </div>
        
        {/* Weekly progress bar chart */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
          <h3 className="font-medium text-gray-700 mb-4">Weekly Progress</h3>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={progressData}
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
              >
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Bar 
                  dataKey="completed" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                >
                  {progressData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.completed === entry.total ? '#FFD700' : '#E5DEFF'}
                    />
                  ))}
                  <Label
                    position="top"
                    content={({ x, y, width, height, value }) => {
                      return (
                        <text
                          x={x + width / 2}
                          y={y - 10}
                          fill="#6B7280"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={12}
                        >
                          {value}
                        </text>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressVisuals;
