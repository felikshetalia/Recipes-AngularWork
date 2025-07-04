import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { OneRecipe } from './recipes/one-recipe/one-recipe';
import { Recipe, recipesList } from './recipes/recipes-list';

@Component({
  selector: 'app-root',
  imports: [Navbar, Recipes, RecipeCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected title = 'Recipes';
  RECIPE_LIST = recipesList;
  selectedRecipe = signal<Recipe | undefined>(undefined);

  onRecipeSelected(recipe: Recipe) :void{
    this.selectedRecipe.set(recipe);
  }
}
