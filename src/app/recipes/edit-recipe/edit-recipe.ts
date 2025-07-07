import { Component, inject, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Recipe } from '../recipes-list';
import { RecipesManagement } from '../../shared/recipes-management';
@Component({
  selector: 'app-edit-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.scss'
})
export class EditRecipe implements OnInit {
  recipe = input.required<Recipe | undefined>();
  recipeManagerService = inject(RecipesManagement);
  ngOnInit(): void {
    this.formGroup.patchValue({
      recipeName: this.recipe()?.name,
      prepTime: this.recipe()?.preparationTimeInMins,
      ingredientList: this.recipe()?.ingredients.join(', ')
    });
  }
  formGroup = new FormGroup({
    recipeName: new FormControl(''),
    prepTime: new FormControl<number>(0),
    ingredientList: new FormControl('')
  });

  onSubmit(): void{
    this.recipeManagerService.updateRecipe({
      id: this.recipe()!.id,
      name: this.formGroup.value.recipeName || '',
      preparationTimeInMins: this.formGroup.value.prepTime || 0,
      ingredients: this.formGroup.value.ingredientList ? this.formGroup.value.ingredientList.split(',').map(ing => ing.trim()) : []
    });
    this.recipeManagerService.setEditMode(false);
    console.log('Recipe updated:', this.formGroup.value);
  }
}
