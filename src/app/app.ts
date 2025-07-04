import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
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
export class App implements OnInit {
  protected title = 'Recipes';
  RECIPE_LIST = recipesList;
  selectedRecipe = signal<Recipe | undefined>(undefined);

  ngOnInit(): void {
    if (this.RECIPE_LIST.length > 0) {
      this.selectedRecipe.set(this.RECIPE_LIST[0]);
    }
  }
  onRecipeSelected(recipe: Recipe) :void{
    this.selectedRecipe.set(recipe);
  }
}
