
export type Client = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Habit = {
  id: string;
  title: string;
  category: HabitCategory;
  completed: boolean;
  streak: number;
  clientId?: string;
};

export type HabitCategory = 
  | 'mindfulness'
  | 'exercise'
  | 'gratitude'
  | 'rest'
  | 'social'
  | 'learning'
  | 'nutrition';

export type Reflection = {
  id: string;
  content: string;
  date: string;
  sentiment?: string;
  aiResponse?: string;
  clientId?: string;
};

export type ProgressData = {
  date: string;
  completed: number;
  total: number;
};

export type CategoryColors = {
  [key in HabitCategory]: string;
};

export type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
};

export type NutritionPlanSection = {
  title: string;
  content: string;
  icon: string;
};

export type NutritionPlan = {
  title: string;
  greeting: string;
  sections: NutritionPlanSection[];
  closing: {
    message: string;
    icon: string;
  };
};
