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

export const recipeResolver: ResolveFn<Recipe | undefined> = (
  route: ActivatedRouteSnapshot,
) => {
  const store = inject(Store);
  const repId = route.paramMap.get('repId');
  return store.select(selectRecipes).pipe(
    map((recipes: Recipe[]) => recipes.find((r) => r._id === repId)),
    take(1),
  );
};
