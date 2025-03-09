
import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NutritionPlan } from '@/lib/types';

interface NutritionPlanDisplayProps {
  plan: NutritionPlan;
  clientName?: string;
}

const NutritionPlanDisplay: React.FC<NutritionPlanDisplayProps> = ({ plan, clientName = "Cliente" }) => {
  const formattedGreeting = plan.greeting.replace("[Nombre]", clientName);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-primary/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2">{plan.title}</h2>
        <p className="text-center text-lg">{formattedGreeting}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plan.sections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="bg-primary/5 p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h3>
            </div>
            <Separator />
            <div className="p-4 whitespace-pre-wrap text-sm">
              {section.content}
            </div>
          </Card>
        ))}
      </div>
      
      {plan.closing && (
        <div className="bg-primary/5 p-4 rounded-lg text-center">
          <p className="flex items-center justify-center gap-2 text-lg font-medium">
            <span>{plan.closing.icon}</span>
            {plan.closing.message}
            <span>{plan.closing.icon}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NutritionPlanDisplay;
