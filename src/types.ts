export interface Ingredient {
  name: string;
  amountPerServing: number;
  unit: string;
  dairy?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  baseServings: number;
  baseCookMinutes: number;
  ingredients: Ingredient[];
}

export interface Substitution {
  id: string;
  label: string;
  description: string;
  costNote: string;
  apply: (r: Recipe) => Recipe;
}

export interface PlanState {
  recipeId: string;
  servings: number;
  substitutionId: string | null;
}
