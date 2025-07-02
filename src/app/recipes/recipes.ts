import { Component } from '@angular/core';
import { recipesList } from './recipes-list';
import { OneRecipe } from "./one-recipe/one-recipe";
@Component({
  selector: 'app-recipes',
  imports: [OneRecipe],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes {
  RECIPE_LIST = recipesList;
  selectedRecipeID?: string;
  onSelectRecipe(recipeID: string) {
    this.selectedRecipeID = recipeID;
  }
  get nameFromID(){
    return this.RECIPE_LIST.find((recipe) => recipe.id === this.selectedRecipeID)?.name;
  }
}
