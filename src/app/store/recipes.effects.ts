import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRecipeGroup,
  deleteRecipeGroup,
  editRecipeGroup,
  loadRecipesGroup,
} from './recipes.actions';
import { RecipesManagementService } from '../shared/recipes-management.service';
import { exhaustMap, map, catchError, of, switchMap, tap } from 'rxjs';
import { Recipe } from '../recipes/models';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'node:console';

@Injectable()
export class RecipeEffects {
  actions$ = inject(Actions);
  recipesService = inject(RecipesManagementService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipesGroup.load),
      exhaustMap(() =>
        this.recipesService.loadRecipes().pipe(
          map((recipes: Recipe[]) => loadRecipesGroup.loadSuccess({ recipes })),
          catchError((error: HttpErrorResponse) =>
            of(loadRecipesGroup.loadFailure({ error })),
          ),
        ),
      ),
    ),
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRecipeGroup.addRecipe),
      exhaustMap((action) =>
        this.recipesService.addRecipe(action.recipe).pipe(
          map((newRecipe: Recipe) =>
            addRecipeGroup.addRecipeSuccess({ recipe: newRecipe }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(addRecipeGroup.addRecipeFailure({ error })),
          ),
        ),
      ),
    ),
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRecipeGroup.deleteRecipe),
      exhaustMap((action) =>
        this.recipesService.deleteRecipe(action.recipe).pipe(
          map(() =>
            deleteRecipeGroup.deleteRecipeSuccess({ recipe: action.recipe }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              deleteRecipeGroup.deleteRecipeFailure({
                error,
                recipe: action.recipe,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  editRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editRecipeGroup.editRecipe),
      exhaustMap((action) =>
        this.recipesService
          .updateRecipe(action.newRecipe, action.oldRecipeId)
          .pipe(
            map(
              () =>
                editRecipeGroup.editRecipeSuccess({
                  newRecipe: action.newRecipe,
                }),
              catchError((error: HttpErrorResponse) =>
                of(editRecipeGroup.editRecipeFailure({ error })),
              ),
            ),
          ),
      ),
    ),
  );
}
