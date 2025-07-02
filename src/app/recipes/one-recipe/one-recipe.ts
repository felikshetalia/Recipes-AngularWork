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
  recipeSelected = output<Recipe>();
  onSelectRecipe(): void {
    this.recipeSelected.emit(this.recipe());
  }
}
