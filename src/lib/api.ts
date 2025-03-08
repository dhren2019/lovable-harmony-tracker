
import { Reflection } from './types';
import { toast } from "@/components/ui/sonner";

const WEBHOOK_URL = 'https://lovable.app.n8n.cloud/webhook-test/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

export async function submitReflection(reflection: Omit<Reflection, 'id' | 'date' | 'aiResponse'>): Promise<Reflection> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: reflection.content,
        sentiment: reflection.sentiment || 'neutral',
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: Date.now().toString(),
      content: reflection.content,
      date: new Date().toISOString(),
      sentiment: reflection.sentiment,
      aiResponse: data.response || "Thank you for sharing your reflection. Continue to practice mindfulness and self-awareness.",
      clientId: reflection.clientId,
    };
    
  } catch (error) {
    console.error('Error submitting reflection:', error);
    toast.error("Couldn't submit reflection. Please try again.");
    throw error;
  }
}

// Mock data utilities
export const categoryColors = {
  mindfulness: '#E5DEFF', // lavender
  exercise: '#FFDEE2', // pink
  gratitude: '#FFF4B8', // light gold
  rest: '#D3E4FD', // light blue
  social: '#FDE1D3', // peach
  learning: '#F2FCE2', // light green
  nutrition: '#F1F0FB', // light gray
};

export const mockHabits = [
  { id: '1', title: 'Morning meditation', category: 'mindfulness', completed: false, streak: 3 },
  { id: '2', title: '30 minutes of exercise', category: 'exercise', completed: false, streak: 5 },
  { id: '3', title: 'Write 3 things I\'m grateful for', category: 'gratitude', completed: true, streak: 8 },
  { id: '4', title: '8 hours of sleep', category: 'rest', completed: false, streak: 2 },
  { id: '5', title: 'Connect with a friend', category: 'social', completed: true, streak: 4 },
  { id: '6', title: 'Read for 20 minutes', category: 'learning', completed: false, streak: 6 },
  { id: '7', title: 'Eat a balanced meal', category: 'nutrition', completed: true, streak: 7 },
] as Habit[];

export const mockReflections = [
  { 
    id: '1', 
    content: 'Today I felt anxious about my upcoming presentation, but I practiced deep breathing which helped me calm down.', 
    date: '2023-05-10T10:30:00Z',
    sentiment: 'mixed',
    aiResponse: 'It sounds like you're experiencing normal presentation anxiety. Your use of deep breathing is an excellent coping strategy. Consider visualizing a successful presentation outcome and remember that preparation reduces anxiety.'
  },
  { 
    id: '2', 
    content: 'I had a wonderful day today. The weather was perfect for a long walk in the park, and I felt very peaceful and present.', 
    date: '2023-05-09T15:45:00Z',
    sentiment: 'positive',
    aiResponse: 'Your experience highlights the positive impact of nature on mental wellbeing. The feeling of peace and presence you describe is what mindfulness practitioners aim for. Consider making these walks a regular practice to maintain this state.'
  }
] as Reflection[];

export const mockProgressData = [
  { date: 'Mon', completed: 5, total: 7 },
  { date: 'Tue', completed: 4, total: 7 },
  { date: 'Wed', completed: 6, total: 7 },
  { date: 'Thu', completed: 3, total: 7 },
  { date: 'Fri', completed: 5, total: 7 },
  { date: 'Sat', completed: 7, total: 7 },
  { date: 'Sun', completed: 6, total: 7 }
] as ProgressData[];
