import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from '../recipes/models';

export const loadRecipesGroup = createActionGroup({
  source: '[API]',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ recipes: Recipe[] }>(),
    'Load Failure': props<{ error: any }>(),
  },
});

export const addRecipeGroup = createActionGroup({
  source: '[API]',
  events: {
    'Add Recipe': props<{ recipe: Recipe }>(),
    'Add Recipe Success': props<{ recipe: Recipe }>(),
    'Add Recipe Failure': props<{ error: any }>(),
  },
});

export const deleteRecipeGroup = createActionGroup({
  source: '[API]',
  events: {
    'Delete Recipe': props<{ recipe: Recipe }>(),
    'Delete Recipe Success': props<{ recipe: Recipe }>(),
    'Delete Recipe Failure': props<{ error: any; recipe: Recipe }>(),
  },
});

export const editRecipeGroup = createActionGroup({
  source: '[API]',
  events: {
    'Edit Recipe': props<{ id: string; newData: Recipe }>(),
    'Edit Recipe Success': props<{ id: string; newData: Recipe }>(),
    'Edit Recipe Failure': props<{ error: any }>(),
  },
});
