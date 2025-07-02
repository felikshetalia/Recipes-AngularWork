import { Component, EventEmitter, Input, Output } from '@angular/core';
import { recipesList } from '../recipes-list';

@Component({
  selector: 'app-one-recipe',
  imports: [],
  templateUrl: './one-recipe.html',
  styleUrl: './one-recipe.scss'
})
export class OneRecipe {
  @Input({required: true}) id!: string;
  // @Input({required: true}) name!: string;
  @Output() recipeSelected = new EventEmitter();
  get name(): string {
    const recipe = recipesList.find(r => r.id === this.id);
    return recipe ? recipe.name : 'Unknown';
  }
  onSelectRecipe(): void {
    this.recipeSelected.emit(this.id);
  }
}
