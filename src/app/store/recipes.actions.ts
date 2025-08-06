import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipes/models';

export const loadRecipes = createAction('[API] Load');
export const loadRecipesSuccess = createAction(
  '[API] Load Success',
  props<{ recipes: Recipe[] }>(),
);
export const loadRecipesFailure = createAction(
  '[API] Load Failure',
  props<{ error: any }>(),
);
