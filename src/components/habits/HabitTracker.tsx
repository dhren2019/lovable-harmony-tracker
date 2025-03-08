
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Habit, HabitCategory } from '@/lib/types';
import { categoryColors, mockHabits } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/sonner";

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  
  const toggleHabit = (id: string) => {
    setHabits(currentHabits => 
      currentHabits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    
    // Show toast notification
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const message = !habit.completed
        ? `Great job completing: ${habit.title}`
        : `Unmarked: ${habit.title}`;
      toast(message);
    }
  };
  
  const getCategoryColor = (category: HabitCategory): string => {
    return categoryColors[category] || '#F1F0FB';
  };
  
  return (
    <div className="space-y-6 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Daily Habits</h2>
        <Button variant="outline" className="border-lovable-lavender text-primary-foreground">
          Add Habit
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {habits.map((habit) => (
          <div 
            key={habit.id} 
            className="habit-card hover:border-lovable-lavender card-hover"
          >
            <div 
              className={cn(
                "habit-check",
                habit.completed ? "completed" : "border-gray-300"
              )}
              style={{ borderColor: habit.completed ? getCategoryColor(habit.category) : undefined }}
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.completed && <Check size={16} />}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{habit.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="category-pill"
                  style={{ 
                    backgroundColor: getCategoryColor(habit.category),
                    color: 'rgba(0,0,0,0.7)' 
                  }}
                >
                  {habit.category}
                </span>
                {habit.streak > 0 && (
                  <span className="text-xs text-gray-500">
                    {habit.streak} day streak
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
