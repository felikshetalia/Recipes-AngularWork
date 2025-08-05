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
  loadingShow: boolean;
  error: any | null;
}

export const metaReducers: MetaReducer<RecipeState>[] = isDevMode() ? [] : [];
