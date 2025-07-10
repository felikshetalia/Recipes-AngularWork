import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Recipe } from '../recipes-list';

@Component({
  selector: 'app-edit-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecipe implements OnInit {
  recipe = input.required<Recipe | undefined>();

  editingCanceled = output<void>();
  recipeUpdated = output<Recipe>();
  
  editForm = inject(FormBuilder).group({
    recipeName: [''],
    prepTime: [0],
    ingredientList: ['']
  });

  ngOnInit(): void {
    this.editForm.patchValue({
      recipeName: this.recipe()?.name,
      prepTime: this.recipe()?.preparationTimeInMins,
      ingredientList: this.recipe()?.ingredients.join(', ')
    });
  }

  onCancel(): void{
    this.editingCanceled.emit();
  }

  onSubmit(): void{
    const enteredData = {
      id: this.recipe()!.id,
      name: this.editForm.value.recipeName || '',
      preparationTimeInMins: this.editForm.value.prepTime || 0,
      ingredients: this.editForm.value.ingredientList ? this.editForm.value.ingredientList.split(',').map(ing => ing.trim()) : []
    }
    this.recipeUpdated.emit(enteredData);
  }
}
