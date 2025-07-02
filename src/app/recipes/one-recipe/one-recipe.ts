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
  // id = input.required<string>();
  // name = input.required<string>();
  inputRecipe = input.required<Recipe>();
  recipeSelected = output<Recipe>();
  // get name(): string {
  //   const recipe = recipesList.find(r => r.id === this.id());
  //   return recipe ? recipe.name : 'Unknown';
  // }
  onSelectRecipe(): void {
    this.recipeSelected.emit(this.inputRecipe());
  }
}
