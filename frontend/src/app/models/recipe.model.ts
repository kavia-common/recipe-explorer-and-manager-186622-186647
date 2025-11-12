export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  timeMinutes: number;
  servings: number;
  tags: string[];
}
