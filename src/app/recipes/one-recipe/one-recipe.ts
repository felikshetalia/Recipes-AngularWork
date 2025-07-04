import { ChangeDetectionStrategy, Component, EventEmitter, input, output, Output } from '@angular/core';
import { Recipe, recipesList } from '../recipes-list';

@Component({
  selector: 'app-one-recipe',
  imports: [],
  templateUrl: './one-recipe.html',
  styleUrl: './one-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OneRecipe {
  recipe = input.required<Recipe>();
  recipeSelected = output<void>();
  recipeDeleted = output<void>();
  onSelectRecipe(): void {
    this.recipeSelected.emit();
  }
  onDelete(): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeDeleted.emit();
    }
  }
  onEdit(): void {
    console.log('Edit recipe:', this.recipe());
  }
}