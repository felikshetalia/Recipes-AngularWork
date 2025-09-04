import { CanDeactivateFn, Routes } from '@angular/router';
import { RecipeCard } from './recipes/recipe-card/recipe-card';
import { recipeResolver } from './shared/recipe.resolver';
import { RecipeForm } from './recipes/recipe-form/recipe-form';

export const canLeaveFormGuard: CanDeactivateFn<RecipeForm> = (
  component: RecipeForm,
) => {
  return !component.form.dirty
    ? true
    : confirm('You have unsaved changes. Are you sure you want to continue?');
};

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'recipes/add',
        component: RecipeForm,
        canDeactivate: [canLeaveFormGuard],
        data: { mode: 'add' },
      },
      {
        path: 'recipes/:repId',
        component: RecipeCard,
        runGuardsAndResolvers: 'always',
        pathMatch: 'full',
        resolve: { recipe: recipeResolver },
      },
      {
        path: 'recipes/:repId/edit',
        component: RecipeForm,
        runGuardsAndResolvers: 'always',
        canDeactivate: [canLeaveFormGuard],
        resolve: { recipe: recipeResolver },
        data: { mode: 'edit' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
