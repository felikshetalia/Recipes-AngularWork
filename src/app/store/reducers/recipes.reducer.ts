import { createReducer, on } from '@ngrx/store';
import {
  loadRecipes,
  loadRecipesFailure,
  loadRecipesSuccess,
} from '../recipes.actions';
import { RecipeState } from '.';

export const initialState: RecipeState = {
  recipes: [],
  loadingShow: false,
  error: null,
};
export const recipeReducer = createReducer(
  initialState,
  on(loadRecipes, (_state) => ({
    ..._state,
    loadingShow: true,
    error: null,
  })),
  on(loadRecipesSuccess, (_state, { recipes }) => ({
    ..._state,
    recipes,
    loadingShow: false,
  })),
  on(loadRecipesFailure, (_state, { error }) => ({
    ..._state,
    loadingShow: false,
    error: error,
  })),
);
