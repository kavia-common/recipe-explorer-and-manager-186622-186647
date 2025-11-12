import { Recipe } from '../models/recipe.model';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Garlic Salmon',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    description: 'Tender salmon fillets with a zesty lemon garlic butter sauce.',
    ingredients: [
      '2 salmon fillets',
      '2 tbsp butter',
      '2 cloves garlic, minced',
      '1 lemon (zest and juice)',
      'Salt & pepper',
      'Parsley for garnish'
    ],
    steps: [
      'Season salmon with salt and pepper.',
      'Melt butter in pan, add garlic until fragrant.',
      'Add salmon, cook 3-4 mins per side.',
      'Add lemon juice and zest; spoon sauce over salmon.',
      'Garnish with parsley and serve.'
    ],
    timeMinutes: 20,
    servings: 2,
    tags: ['seafood', 'quick', 'healthy']
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=800&auto=format&fit=crop',
    description: 'Rich and creamy pasta loaded with sautéed mushrooms and herbs.',
    ingredients: [
      '200g pasta',
      '250g mushrooms, sliced',
      '1 cup heavy cream',
      '1 small onion, diced',
      '2 cloves garlic, minced',
      'Olive oil, salt & pepper',
      'Parmesan & parsley'
    ],
    steps: [
      'Cook pasta al dente; reserve 1/4 cup pasta water.',
      'Sauté onion and garlic in olive oil.',
      'Add mushrooms, cook until browned.',
      'Stir in cream and reserved pasta water; simmer.',
      'Toss pasta; finish with parmesan and parsley.'
    ],
    timeMinutes: 30,
    servings: 2,
    tags: ['vegetarian', 'comfort']
  },
  {
    id: '3',
    title: 'Citrus Avocado Salad',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
    description: 'Bright citrus segments tossed with creamy avocado and greens.',
    ingredients: [
      '2 cups mixed greens',
      '1 avocado, sliced',
      '1 orange, segmented',
      '1/2 red onion, thinly sliced',
      'Olive oil, lemon juice, salt & pepper'
    ],
    steps: [
      'Whisk olive oil with lemon juice, salt, and pepper.',
      'Toss greens with dressing.',
      'Top with avocado, orange, and red onion.',
      'Serve immediately.'
    ],
    timeMinutes: 10,
    servings: 2,
    tags: ['salad', 'healthy', 'quick']
  }
];
