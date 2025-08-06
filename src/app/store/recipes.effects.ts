import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadRecipes,
  loadRecipesSuccess,
  loadRecipesFailure,
} from './recipes.actions';
import { RecipesManagementService } from '../shared/recipes-management.service';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { Recipe } from '../recipes/models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RecipeEffects {
  actions$ = inject(Actions);
  recipesService = inject(RecipesManagementService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      exhaustMap(() =>
        this.recipesService.loadRecipes().pipe(
          map((recipes: Recipe[]) => loadRecipesSuccess({ recipes })),
          catchError((error: HttpErrorResponse) =>
            of(loadRecipesFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
