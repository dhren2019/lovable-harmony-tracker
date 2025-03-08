
import React, { useState } from 'react';
import { useClients } from '@/contexts/ClientContext';
import ClientTopbar from './ClientTopbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Activity, Dumbbell } from 'lucide-react';

interface ClientDetailViewProps {
  clientId?: string;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ clientId }) => {
  const { clients } = useClients();
  const [activeTab, setActiveTab] = useState("nutrition");
  
  const client = clients.find(c => c.id === clientId);
  
  if (!client) {
    return <div className="text-center p-8">Cliente no encontrado</div>;
  }
  
  const tabOptions = [
    { id: "nutrition", label: "Nutrición", icon: Leaf },
    { id: "tracking", label: "Seguimiento", icon: Activity },
    { id: "training", label: "Entrenamiento", icon: Dumbbell },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <p className="text-gray-500">{client.email}</p>
      </div>
      
      <ClientTopbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        options={tabOptions}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="nutrition" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Plan de Nutrición</h2>
            <p className="text-gray-600">
              No hay plan de nutrición definido para este cliente aún.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tracking" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Seguimiento</h2>
            <p className="text-gray-600">
              No hay datos de seguimiento para este cliente aún.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Plan de Entrenamiento</h2>
            <p className="text-gray-600">
              No hay plan de entrenamiento definido para este cliente aún.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailView;
