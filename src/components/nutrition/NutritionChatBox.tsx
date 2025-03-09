
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';
import { toast } from "sonner";

interface NutritionChatBoxProps {
  clientId: string;
}

interface WebhookResponse {
  response: string;
}

const NutritionChatBox: React.FC<NutritionChatBoxProps> = ({ clientId }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Por favor, escribe un mensaje antes de enviar");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const webhookUrl = 'https://dhren2.app.n8n.cloud/webhook-test/3192296c-ec30-4af7-a2bf-5ecceaa34841';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          prompt,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json() as WebhookResponse;
      setResponse(data.response);
      setPrompt('');
      toast.success("Plan de nutrición generado correctamente");
    } catch (error) {
      console.error('Error sending prompt:', error);
      toast.error("Error al generar el plan de nutrición");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="nutrition-prompt" className="text-sm font-medium">
            Introduce detalles para el plan de nutrición
          </label>
          <Textarea
            id="nutrition-prompt"
            placeholder="Ejemplo: Cliente de 30 años con objetivo de perder peso, intolerante a la lactosa..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? 'Generando...' : 'Enviar'}
          <Send className="ml-2" size={16} />
        </Button>
      </form>
      
      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Plan de Nutrición Generado:</h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-sm">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionChatBox;
