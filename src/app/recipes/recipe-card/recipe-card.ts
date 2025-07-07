import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Recipe, recipesList } from '../recipes-list';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { EditRecipe } from "../edit-recipe/edit-recipe";
import { RecipesManagement } from '../../shared/recipes-management';

@Component({
  selector: 'app-recipe-card',
  imports: [TimeCustomPipe, EditRecipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
  private recipeManagerService = inject(RecipesManagement);
  isEditing = this.recipeManagerService.isEditing;


}
