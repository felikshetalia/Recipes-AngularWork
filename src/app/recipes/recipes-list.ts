import { DatePipe } from "@angular/common";
import { TimeCustomPipe } from "../shared/time-custom-pipe";

export interface Recipe {
    id: string;
    name: string;
    preparationTimeInMins: number; // takes hour and minutes in number
    ingredients: string[];
}

// just dummy data for now
export const recipesList : Recipe[] = [
    {
    id: 'r1',
    name: 'Spaghetti Carbonara',
    preparationTimeInMins: 90,
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper']
  },
  {
    id: 'r2',
    name: 'Chicken Caesar Salad',
    preparationTimeInMins: 30,
    ingredients: ['Chicken breast', 'Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing']
  },
  {
    id: 'r3',
    name: 'Vegetable Stir Fry',
    preparationTimeInMins: 25,
    ingredients: ['Broccoli', 'Carrots', 'Bell pepper', 'Soy sauce', 'Garlic', 'Ginger']
  },
  {
    id: 'r4',
    name: 'Beef Tacos',
    preparationTimeInMins: 40,
    ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Cheddar cheese', 'Tomato', 'Sour cream']
  },
  {
    id: 'r5',
    name: 'Margherita Pizza',
    preparationTimeInMins: 60,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil']
  },
  {
    id: 'r6',
    name: 'Tomato Soup',
    preparationTimeInMins: 35,
    ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable broth', 'Cream', 'Salt', 'Pepper']
  },
  {
    id: 'r7',
    name: 'Pancakes',
    preparationTimeInMins: 20,
    ingredients: ['Flour', 'Milk', 'Eggs', 'Baking powder', 'Sugar', 'Butter']
  },
  {
    id: 'r8',
    name: 'Greek Salad',
    preparationTimeInMins: 15,
    ingredients: ['Cucumber', 'Tomato', 'Feta cheese', 'Red onion', 'Olives', 'Olive oil']
  }
]