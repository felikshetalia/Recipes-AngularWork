import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from './models';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatListModule, 
    MatIcon, 
    MatCardModule,
    MatMiniFabButton],
  styleUrl: './recipes.scss'
})
export class Recipes {
  recipeList = input<Recipe[]>();

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
