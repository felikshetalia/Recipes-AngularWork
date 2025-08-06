import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './reducers';

export const selectRecipesFeature =
  createFeatureSelector<RecipeState>('recipesList');

export const selectRecipes = createSelector(
  selectRecipesFeature,
  (_state) => _state.recipes,
);

export const selectLoadingBool = createSelector(
  selectRecipesFeature,
  (_state) => _state.isLoading,
);

export const selectError = createSelector(
  selectRecipesFeature,
  (_state) => _state.error,
);
