import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Recipe } from '../models';
import { isQuestionOrExclamationToken } from 'typescript';

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
  
  private _fb = inject(FormBuilder);

  form = this._fb.group({
    recipeName: ['', [Validators.minLength(3), Validators.maxLength(80)]],
    prepTime: [0, [Validators.required]],
    ingredients: this._fb.array([], Validators.min(2)),
    description: ['', [Validators.minLength(15), Validators.maxLength(255)]]
  });

  ngOnInit(): void {
    if(this.isEditMode()){
      this.form.patchValue({
        recipeName: this.recipe()?.name,
        prepTime: this.recipe()?.preparationTimeInMins,
        description: this.recipe()?.description
      });

      this._ingredients.clear();
      this.recipe()?.ingredients.forEach(ing => {
        this._ingredients.push(
          this._fb.group({
            name: [ing.name],
            quantity: [ing.quantity]
          })
        );
      })
    } 
  }

  addIngredient(): void {
    this._ingredients.push(
      this._fb.group({
        name: [''],
        quantity: ['']
      })
    );
  }
  
  onCancel(): void{
    this.editingCanceled.emit();
  }
  
  onSubmit(): void{
    const enteredData = {
      name: this.form.value.recipeName || '',
      preparationTimeInMins: this.form.value.prepTime || 0,
      ingredients: this._ingredients.value || [],
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
  
  get _ingredients(): FormArray{
    return this.form.get('ingredients') as FormArray;
  }
}
