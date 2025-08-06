import { createReducer, on } from '@ngrx/store';
import {
  loadRecipes,
  loadRecipesFailure,
  loadRecipesSuccess,
} from '../recipes.actions';
import { RecipeState } from '.';

export const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
};
export const recipeReducer = createReducer(
  initialState,
  on(loadRecipes, (_state) => ({
    ..._state,
    isLoading: true,
    error: null,
  })),
  on(loadRecipesSuccess, (_state, { recipes }) => ({
    ..._state,
    recipes,
    isLoading: false,
  })),
  on(loadRecipesFailure, (_state, { error }) => ({
    ..._state,
    isLoading: false,
    error: error,
  })),
);
