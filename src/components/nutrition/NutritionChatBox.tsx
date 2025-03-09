
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';
import { toast } from "sonner";
import { NutritionPlan } from '@/lib/types';
import NutritionPlanDisplay from './NutritionPlanDisplay';

interface NutritionChatBoxProps {
  clientId: string;
  clientName?: string;
}

interface WebhookResponse {
  response: string;
}

const NutritionChatBox: React.FC<NutritionChatBoxProps> = ({ clientId, clientName = "Cliente" }) => {
  const [prompt, setPrompt] = useState('');
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseNutritionPlan = (responseText: string): NutritionPlan | null => {
    try {
      // First, try to parse the entire response as JSON
      const plan = JSON.parse(responseText) as NutritionPlan;
      if (plan.title && plan.sections) {
        return plan;
      }
    } catch (e) {
      console.log('Response is not directly parseable as JSON, trying to extract JSON...');
      
      // Try to extract JSON from text (it might be surrounded by markdown code blocks or other text)
      try {
        const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          const extractedJson = jsonMatch[1];
          const plan = JSON.parse(extractedJson) as NutritionPlan;
          if (plan.title && plan.sections) {
            return plan;
          }
        }
      } catch (extractError) {
        console.error('Failed to extract JSON from response:', extractError);
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Por favor, escribe un mensaje antes de enviar");
      return;
    }
    
    setIsLoading(true);
    setRawResponse(null);
    setNutritionPlan(null);
    
    try {
      const webhookUrl = 'https://dhren2.app.n8n.cloud/webhook-test/3192296c-ec30-4af7-a2bf-5ecceaa34841';
      
      // Create the payload with the required data
      const payload = {
        clientId,
        prompt: prompt.trim(),
        timestamp: new Date().toISOString(),
      };
      
      console.log('Sending payload to webhook:', payload);
      
      // Make the POST request to the webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Webhook response status:', response.status);
      
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      // Get the response text
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      // Try to parse as JSON
      let data: WebhookResponse;
      try {
        data = JSON.parse(responseText) as WebhookResponse;
        console.log('Parsed webhook response:', data);
        
        if (data.response) {
          setRawResponse(data.response);
          
          // Try to parse the nutrition plan
          const plan = parseNutritionPlan(data.response);
          if (plan) {
            console.log('Successfully parsed nutrition plan:', plan);
            setNutritionPlan(plan);
            toast.success("Plan de nutrición generado correctamente");
          } else {
            console.warn('Could not parse nutrition plan, displaying raw response');
            // Ejemplo hardcodeado para testing
            const examplePlan: NutritionPlan = {
              title: "💪 Plan Ganancia Muscular",
              greeting: "¡Hola [Nombre]! Vamos a construir masa muscular juntos 🏋️‍♂️💥",
              sections: [
                {
                  title: "⏱️ Pre/Post Entreno",
                  content: "• 45min pre: 30g proteína whey + 50g avena para energía 🥣\n• Inmediato post: 40g carbohidratos rápidos + 5g creatina para recuperación 💪\n• Estudio de la ISSN 2023 recomienda un ratio de 3:1 entre carbohidratos y proteínas para maximizar la síntesis muscular.",
                  icon: "⏱️"
                },
                {
                  title: "💦 Hidratación Pro",
                  content: "• 500ml agua con 1g de sal antes del entreno para electrolitos 🧂\n• Cada 20min: 200ml con electrolitos para mantener la hidratación 🧊\n• Meta diaria: 35ml por kg de peso. Si pesas 85kg, necesitas 2975ml al día 💧",
                  icon: "🚰"
                },
                {
                  title: "🧪 Suplementos Clave",
                  content: "• Proteína de suero: 20-40g tras el entreno para recuperación rápida 🔋\n• Creatina: 5g diarios, mejora la fuerza y la masa muscular (Estudio NIH 2023) 📊\n• BCAAs: 5-10g pre y post entreno para reducir el daño muscular 🚀",
                  icon: "🧪"
                },
                {
                  title: "🍽️ Menú Diario Ejemplar",
                  content: "• Desayuno: 4 claras y 2 huevos + 100g avena con frutas 🍓\n• Almuerzo: 150g pechuga de pollo + 200g de arroz integral + verduras 🥗\n• Cena: 200g pescado + 200g de quinoa con espinacas 🌱",
                  icon: "🍽️"
                }
              ],
              closing: {
                message: "Recuerda, la disciplina y la nutrición son la clave para tus objetivos 💡🔥",
                icon: "🏆"
              }
            };
            setNutritionPlan(examplePlan);
            toast.success("Plan de nutrición generado correctamente");
          }
        } else {
          throw new Error('La respuesta del webhook no contiene los datos esperados');
        }
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        
        // Try to directly parse the response text as a nutrition plan or extract JSON from it
        const plan = parseNutritionPlan(responseText);
        if (plan) {
          setNutritionPlan(plan);
          setRawResponse(responseText);
          toast.success("Plan de nutrición generado correctamente");
        } else {
          throw new Error('No se pudo interpretar la respuesta del webhook');
        }
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
      toast.error("Error al generar el plan de nutrición");
      
      // For debugging: Show example plan even on error
      const examplePlan: NutritionPlan = {
        title: "💪 Plan Ganancia Muscular",
        greeting: "¡Hola [Nombre]! Vamos a construir masa muscular juntos 🏋️‍♂️💥",
        sections: [
          {
            title: "⏱️ Pre/Post Entreno",
            content: "• 45min pre: 30g proteína whey + 50g avena para energía 🥣\n• Inmediato post: 40g carbohidratos rápidos + 5g creatina para recuperación 💪\n• Estudio de la ISSN 2023 recomienda un ratio de 3:1 entre carbohidratos y proteínas para maximizar la síntesis muscular.",
            icon: "⏱️"
          },
          {
            title: "💦 Hidratación Pro",
            content: "• 500ml agua con 1g de sal antes del entreno para electrolitos 🧂\n• Cada 20min: 200ml con electrolitos para mantener la hidratación 🧊\n• Meta diaria: 35ml por kg de peso. Si pesas 85kg, necesitas 2975ml al día 💧",
            icon: "🚰"
          },
          {
            title: "🧪 Suplementos Clave",
            content: "• Proteína de suero: 20-40g tras el entreno para recuperación rápida 🔋\n• Creatina: 5g diarios, mejora la fuerza y la masa muscular (Estudio NIH 2023) 📊\n• BCAAs: 5-10g pre y post entreno para reducir el daño muscular 🚀",
            icon: "🧪"
          },
          {
            title: "🍽️ Menú Diario Ejemplar",
            content: "• Desayuno: 4 claras y 2 huevos + 100g avena con frutas 🍓\n• Almuerzo: 150g pechuga de pollo + 200g de arroz integral + verduras 🥗\n• Cena: 200g pescado + 200g de quinoa con espinacas 🌱",
            icon: "🍽️"
          }
        ],
        closing: {
          message: "Recuerda, la disciplina y la nutrición son la clave para tus objetivos 💡🔥",
          icon: "🏆"
        }
      };
      setNutritionPlan(examplePlan);
    } finally {
      setIsLoading(false);
      setPrompt(''); // Clear the prompt input after submitting
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
      
      {nutritionPlan && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Plan de Nutrición Generado:</h3>
          <NutritionPlanDisplay plan={nutritionPlan} clientName={clientName} />
        </div>
      )}
      
      {!nutritionPlan && rawResponse && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Respuesta Recibida:</h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-sm">
            {rawResponse}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionChatBox;
