import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Recipe, recipesList } from './recipes-list';
import { OneRecipe } from "./one-recipe/one-recipe";
import { RecipeCard } from './recipe-card/recipe-card';
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
  selectedRecipe2Display = input<Recipe | undefined>();
  recipeSelected2Display = output<Recipe>();
  onSelectRecipe(rep: Recipe) : void {
    this.selectedRecipe.set(rep);
    this.recipeSelected2Display.emit(rep);
    console.log('Selected recipe:', this.selectedRecipe());
  }
  onDeleteRecipe(rep: Recipe): void {
    this.RECIPE_LIST = this.RECIPE_LIST.filter(recipe => recipe.id !== this.selectedRecipe()?.id);
    this.selectedRecipe.set(undefined);
  }
}
