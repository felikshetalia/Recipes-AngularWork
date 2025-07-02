import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  selectedRecipeID?: string;
  onSelectRecipe(rep: Recipe) {
    this.selectedRecipeID = rep.id;
  }
  get nameFromID() {
    return this.RECIPE_LIST.find((recipe) => recipe.id === this.selectedRecipeID)?.name;
  }
}
