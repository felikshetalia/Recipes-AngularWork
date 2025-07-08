import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { Recipe, recipesList } from '../recipes-list';
import { RecipesManagementService } from '../../shared/recipes-management';

@Component({
  selector: 'app-one-recipe',
  imports: [],
  templateUrl: './one-recipe.html',
  styleUrl: './one-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OneRecipe {
  recipe = input.required<Recipe>();

  recipeSelected = output<Recipe>();
  recipeDeleted = output<Recipe>();
  recipeEdited = output<Recipe>();
  isEditing = output<boolean>();

  recipeManagerService = inject(RecipesManagementService);

  onSelectRecipe(rep : Recipe): void {
    this.recipeSelected.emit(rep);
  }

  onDelete(rep : Recipe): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeDeleted.emit(rep);
    }
  }

  onEdit(rep: Recipe): void {
    this.isEditing.emit(true);
    this.recipeEdited.emit(rep);
  }
}