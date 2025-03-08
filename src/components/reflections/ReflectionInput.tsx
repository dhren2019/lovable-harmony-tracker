
import React, { useState } from 'react';
import { Reflection } from '@/lib/types';
import { submitReflection, mockReflections } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/sonner";
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const ReflectionInput: React.FC = () => {
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reflections, setReflections] = useState<Reflection[]>(mockReflections);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reflectionText.trim()) {
      toast.error("Please enter a reflection before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newReflection = await submitReflection({
        content: reflectionText,
      });
      
      setReflections(prevReflections => [newReflection, ...prevReflections]);
      setReflectionText('');
      toast.success("Reflection submitted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-8 animate-scale-in">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daily Reflection</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, feelings, or experiences from today..."
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            className="min-h-[120px] focus:border-lovable-lavender focus:ring-lovable-lavender"
          />
          
          <Button 
            type="submit"
            className="w-full sm:w-auto bg-lovable-lavender text-primary-foreground hover:bg-lovable-lavender/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : (
              "Submit Reflection"
            )}
          </Button>
        </form>
      </div>
      
      {reflections.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-700">Previous Reflections</h3>
          
          <div className="space-y-6">
            {reflections.map((reflection) => (
              <div key={reflection.id} className="reflection-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">
                    {format(new Date(reflection.date), 'MMMM d, yyyy')}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{reflection.content}</p>
                
                {reflection.aiResponse && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">AI Insight</h4>
                    <p className="text-gray-600 text-sm bg-lovable-lavender/20 p-3 rounded-md">
                      {reflection.aiResponse}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReflectionInput;
