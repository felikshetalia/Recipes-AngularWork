import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from './recipes-list';
import { OneRecipe } from "./one-recipe/one-recipe";

@Component({
  selector: 'app-recipes',
  imports: [OneRecipe],
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recipes.scss'
})
export class Recipes {
  RECIPE_LIST = input<Recipe[]>();

  selectedRecipe = output<Recipe>();
  recipeToDelete= output<Recipe>();
  recipeToEdit = output<Recipe>();
  isEditing = output<boolean>();

  onSelectRecipe(rep: Recipe): void {
    this.selectedRecipe.emit(rep);
  }
  
  onDeleteRecipe(rep: Recipe): void {
    this.recipeToDelete.emit(rep);
  }

  onEditRecipe(rep: Recipe): void {
    this.recipeToEdit.emit(rep);
  }

  onChangeEditMode(mode: boolean) : void{
    this.isEditing.emit(mode);
  }
}
