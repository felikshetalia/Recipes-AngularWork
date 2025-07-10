import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from '../recipes-list';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { EditRecipe } from "../edit-recipe/edit-recipe";

@Component({
  selector: 'app-recipe-card',
  imports: [TimeCustomPipe, EditRecipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
  isEditing = input.required<boolean>();
  
  editingCanceled = output<void>();
  recipeUpdated = output<Recipe>();

  onEditingCanceled() : void{
    this.editingCanceled.emit();
  }

  onSubmit(rep: Recipe){
    this.recipeUpdated.emit(rep);
  }
}
