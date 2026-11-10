import type { Recipe, Substitution } from "../types";

export const recipes: Recipe[] = [
  {
    id: "pasta",
    name: "Creamy Tomato Pasta",
    baseServings: 2,
    baseCookMinutes: 20,
    ingredients: [
      { name: "Pasta", amountPerServing: 100, unit: "g" },
      { name: "Tomato sauce", amountPerServing: 120, unit: "ml" },
      { name: "Heavy cream", amountPerServing: 50, unit: "ml", dairy: true },
      { name: "Garlic", amountPerServing: 1, unit: "clove" },
    ],
  },
  {
    id: "stirfry",
    name: "Veggie Stir Fry",
    baseServings: 3,
    baseCookMinutes: 15,
    ingredients: [
      { name: "Mixed vegetables", amountPerServing: 150, unit: "g" },
      { name: "Rice", amountPerServing: 80, unit: "g" },
      { name: "Soy sauce", amountPerServing: 15, unit: "ml" },
      { name: "Butter", amountPerServing: 10, unit: "g", dairy: true },
    ],
  },
];

export const substitutions: Substitution[] = [
  {
    id: "dairy-free",
    label: "Dairy-free",
    description: "Replace dairy ingredients with plant-based alternatives.",
    costNote: "May change texture slightly and add ~2 min prep time.",
    apply: (r) => ({
      ...r,
      ingredients: r.ingredients.map((i) =>
        i.dairy ? { ...i, name: i.name + " (plant-based)", dairy: false } : i,
      ),
    }),
  },
];
