import { Routes } from '@angular/router';
import { RecipeCard } from './recipes/recipe-card/recipe-card';
import { recipeResolver } from './shared/recipe.resolver';
import { RecipeForm } from './recipes/recipe-form/recipe-form';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'recipes/add',
        component: RecipeForm,
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
