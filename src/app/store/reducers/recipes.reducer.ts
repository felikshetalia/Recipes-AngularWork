import { createReducer, on } from '@ngrx/store';
import {
  loadRecipesGroup,
  addRecipeGroup,
  deleteRecipeGroup,
  editRecipeGroup,
  selectRecipeGroup,
} from '../recipes.actions';
import { RecipeState } from '.';

export const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
  selectedRecipe: undefined,
};
export const recipeReducer = createReducer(
  initialState,
  on(loadRecipesGroup.load, (_state) => ({
    ..._state,
    isLoading: true,
    error: null,
  })),
  on(loadRecipesGroup.loadSuccess, (_state, { recipes }) => ({
    ..._state,
    recipes,
    isLoading: false,
    selectedRecipe: recipes[0],
  })),
  on(loadRecipesGroup.loadFailure, (_state, { error }) => ({
    ..._state,
    isLoading: false,
    error: error,
  })),
  on(addRecipeGroup.addRecipe, (_state) => ({
    ..._state,
    isLoading: true,
    error: null,
  })),
  on(addRecipeGroup.addRecipeSuccess, (_state, { recipe }) => ({
    ..._state,
    isLoading: false,
    recipes: [..._state.recipes, recipe],
    selectedRecipe: recipe,
  })),
  on(addRecipeGroup.addRecipeFailure, (_state, { error }) => ({
    ..._state,
    isLoading: false,
    error: error,
  })),
  on(deleteRecipeGroup.deleteRecipe, (_state) => ({
    ..._state,
    isLoading: true,
    error: null,
  })),
  on(deleteRecipeGroup.deleteRecipeSuccess, (_state, { recipe }) => ({
    ..._state,
    recipes: _state.recipes.filter((r) => r._id !== recipe._id),
    isLoading: false,
    selectedRecipe: undefined,
  })),
  on(deleteRecipeGroup.deleteRecipeFailure, (_state, { error, recipe }) => ({
    ..._state,
    isLoading: false,
    error: error,
    recipes: [..._state.recipes, recipe],
  })),
  on(editRecipeGroup.editRecipe, (_state) => ({
    ..._state,
    isLoading: true,
    error: null,
  })),
  on(editRecipeGroup.editRecipeSuccess, (_state, { id, newData }) => ({
    ..._state,
    isLoading: false,
    recipes: _state.recipes.map((recipe) =>
      recipe._id === id ? { ...recipe, ...newData } : recipe,
    ),
    selectedRecipe: { ..._state.selectedRecipe, ...newData },
  })),
  on(editRecipeGroup.editRecipeFailure, (_state, { error }) => ({
    ..._state,
    isLoading: false,
    error: error,
  })),
  on(selectRecipeGroup.selectRecipe, (_state) => ({
    ..._state,
    isLoading: false,
    error: null,
  })),
  on(selectRecipeGroup.selectRecipeSuccess, (_state, { recipe }) => ({
    ..._state,
    isLoading: false,
    selectedRecipe: recipe,
  })),
  on(selectRecipeGroup.selectRecipeFailure, (_state, { error }) => ({
    ..._state,
    isLoading: false,
    error: error,
  })),
);
