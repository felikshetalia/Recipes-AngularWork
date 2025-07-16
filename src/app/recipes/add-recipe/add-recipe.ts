import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../models';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.scss'
})
export class AddRecipe {

  recipeAdded = output<Recipe>();
  addingCanceled = output<void>();

  addingForm = inject(FormBuilder).group({
    recipeName: [''],
    prepTime: [0],
    ingredientList: ['']
  });

  onCancel(): void{
    this.addingCanceled.emit();
  }

  onSubmit(): void{
    const enteredData = {
      name: this.addingForm.value.recipeName || '',
      preparationTimeInMins: this.addingForm.value.prepTime || 0,
      ingredients: this.addingForm.value.ingredientList ? this.addingForm.value.ingredientList.split(',').map(ing => ing.trim()) : []
    }
    this.recipeAdded.emit(enteredData);
  }

}
