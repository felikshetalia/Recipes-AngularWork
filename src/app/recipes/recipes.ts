import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Recipe, recipesList } from './recipes-list';
import { OneRecipe } from "./one-recipe/one-recipe";
@Component({
  selector: 'app-recipes',
  imports: [OneRecipe],
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recipes.scss'
})
export class Recipes {
  RECIPE_LIST = recipesList;
  selectedRecipe = signal<Recipe | undefined>(undefined);
  onSelectRecipe(rep: Recipe) : void {
    this.selectedRecipe.set(rep);
  }
}
