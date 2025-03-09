
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import NutritionChatBox from './NutritionChatBox';
import { useClients } from '@/contexts/ClientContext';

interface NutritionPlanViewProps {
  clientId: string;
}

const NutritionPlanView: React.FC<NutritionPlanViewProps> = ({ clientId }) => {
  const [showChat, setShowChat] = useState(false);
  const { clients } = useClients();
  
  // Find the client to get their name
  const client = clients.find(c => c.id === clientId);
  const clientName = client?.name || "Cliente";
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Plan de Nutrición</h2>
        
        {!showChat && (
          <Button 
            onClick={() => setShowChat(true)} 
            variant="outline"
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            Añadir plan de nutrición
          </Button>
        )}
      </div>
      
      {showChat ? (
        <NutritionChatBox clientId={clientId} clientName={clientName} />
      ) : (
        <p className="text-gray-600">
          No hay plan de nutrición definido para este cliente aún.
        </p>
      )}
    </div>
  );
};

export default NutritionPlanView;
