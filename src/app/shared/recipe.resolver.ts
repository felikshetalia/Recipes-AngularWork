import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Recipe } from '../recipes/models';
import { inject } from '@angular/core';
import { RecipesManagementService } from './recipes-management.service';

export const recipeResolver: ResolveFn<Recipe | undefined> = (
  route: ActivatedRouteSnapshot,
) => {
  const service = inject(RecipesManagementService);
  return service.fetchRecipe(route.paramMap.get('repId')!);
};
