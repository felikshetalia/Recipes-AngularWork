import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from './recipes-list';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recipes.scss'
})
export class Recipes {
  RECIPE_LIST = input<Recipe[]>();

  selectedRecipe = output<Recipe>();
  deleteRecipeClicked= output<Recipe>();
  editRecipeClicked = output<Recipe>();

  onSelectRecipe(rep: Recipe): void {
    this.selectedRecipe.emit(rep);
  }
  
  onDeleteRecipe(rep: Recipe): void {
    if (confirm('Are you sure you want to delete this recipe?')){
      this.deleteRecipeClicked.emit(rep);
    }
  }

  onEditRecipe(rep: Recipe): void {
    this.editRecipeClicked.emit(rep);
  }

}
