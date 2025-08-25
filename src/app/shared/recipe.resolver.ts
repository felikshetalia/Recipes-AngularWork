import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../recipes/models';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRecipes, selectedRecipe } from '../store/recipes.selectors';
import { map, take } from 'rxjs';
import { RecipesManagementService } from './recipes-management.service';

export const recipeResolver: ResolveFn<Recipe | undefined> = (
  route: ActivatedRouteSnapshot,
) => {
  const store = inject(Store);
  const service = inject(RecipesManagementService);
  return service.fetchRecipe(route.paramMap.get('repId')!);
};
