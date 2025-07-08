import { ChangeDetectionStrategy, Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Recipe, recipesList } from '../recipes-list';
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
  
  editingFinished = output<void>();
  submittedData = output<Recipe>();

  onFinishEditing() : void{
    this.editingFinished.emit();
  }

  onSubmit(rep: Recipe){
    this.submittedData.emit(rep);
  }
}
