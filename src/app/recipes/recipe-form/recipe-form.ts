import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeForm implements OnInit {

  recipe = input.required<Recipe | undefined>();
  isEditMode = input.required<boolean | undefined>();

  editingCanceled = output<void>();
  formSubmitted = output<Recipe>();
  
  form = inject(FormBuilder).group({
    recipeName: ['', [Validators.minLength(3), Validators.maxLength(80)]],
    prepTime: [0, [Validators.required]],
    ingredientList: ['', Validators.min(2)],
    description: ['', [Validators.minLength(15), Validators.maxLength(255)]]
  });

  ngOnInit(): void {
    if(this.isEditMode()){
      this.form.patchValue({
        recipeName: this.recipe()?.name,
        prepTime: this.recipe()?.preparationTimeInMins,
        ingredientList: this.recipe()?.ingredients.join(', '),
        description: this.recipe()?.description
      });
    }
  }

  onCancel(): void{
    this.editingCanceled.emit();
  }

  onSubmit(): void{
    const enteredData = {
      name: this.form.value.recipeName || '',
      preparationTimeInMins: this.form.value.prepTime || 0,
      ingredients: this.form.value.ingredientList ? this.form.value.ingredientList.split(',').map(ing => ing.trim()) : [],
      description: this.form.value.description || ''
    }
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    else{
      this.formSubmitted.emit(enteredData);
    }
  }

}
