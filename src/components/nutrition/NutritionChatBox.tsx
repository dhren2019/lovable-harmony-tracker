
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
      
      // Create the payload with the required data
      const payload = {
        clientId,
        prompt: prompt.trim(),
        timestamp: new Date().toISOString(),
      };
      
      console.log('Sending payload to webhook:', payload);
      console.log('JSON stringified payload:', JSON.stringify(payload));
      
      // Make the POST request to the webhook with mode: 'cors' explicitly set
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors', // Explicitly set CORS mode
        body: JSON.stringify(payload),
      });
      
      // Log the raw response for debugging
      console.log('Webhook response status:', response.status);
      console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()));
      
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from webhook:', errorText);
        throw new Error(`Error: ${response.status} - ${errorText || response.statusText}`);
      }
      
      // Parse the JSON response
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      let data: WebhookResponse;
      try {
        data = JSON.parse(responseText) as WebhookResponse;
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.log('Invalid JSON response:', responseText);
        throw new Error('Invalid response format from webhook');
      }
      
      console.log('Parsed webhook response:', data);
      
      if (!data.response) {
        console.error('No response field in webhook data:', data);
        throw new Error('Missing response data from webhook');
      }
      
      // Set the response and reset the prompt
      setResponse(data.response);
      setPrompt('');
      toast.success("Plan de nutrición generado correctamente");
    } catch (error) {
      console.error('Error sending prompt:', error);
      
      // Try alternate approach with no-cors mode if regular request fails
      try {
        console.log('Attempting no-cors mode as fallback...');
        
        const webhookUrl = 'https://dhren2.app.n8n.cloud/webhook-test/3192296c-ec30-4af7-a2bf-5ecceaa34841';
        const payload = {
          clientId,
          prompt: prompt.trim(),
          timestamp: new Date().toISOString(),
        };
        
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors', // Use no-cors mode as fallback
          body: JSON.stringify(payload),
        });
        
        console.log('no-cors request sent, cannot verify response');
        
        // Since no-cors mode doesn't return readable response, we show a different message
        toast.success("Solicitud enviada. Procesando plan de nutrición...");
        
        // Try to fetch response with a separate request after a short delay
        setTimeout(async () => {
          try {
            const checkResponse = await fetch(`${webhookUrl}/check/${clientId}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json'
              },
            });
            
            if (checkResponse.ok) {
              const data = await checkResponse.json();
              if (data.response) {
                setResponse(data.response);
                toast.success("Plan de nutrición generado correctamente");
              }
            }
          } catch (checkError) {
            console.error('Error checking for response:', checkError);
          }
        }, 2000);
        
      } catch (fallbackError) {
        console.error('Fallback request also failed:', fallbackError);
        toast.error("Error al generar el plan de nutrición");
      }
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
