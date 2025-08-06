import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { Recipe } from '../../recipes/models';

export interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  error: any | null;
}

export const metaReducers: MetaReducer<RecipeState>[] = isDevMode() ? [] : [];
