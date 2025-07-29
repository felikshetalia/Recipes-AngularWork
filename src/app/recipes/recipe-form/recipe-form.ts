import { ChangeDetectionStrategy, Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../models';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardModule,
    MatMiniFabButton,
    MatButton,
    MatIcon,
    MatError,
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeForm implements OnInit, OnChanges {
  recipe = input.required<Recipe | undefined>();
  isEditMode = input.required<boolean | undefined>();
  
  editingCanceled = output<void>();
  formSubmitted = output<Recipe>();
  
  private _fb = inject(FormBuilder);
  
  form = this._fb.group({
    recipeName: ['', [Validators.minLength(3), Validators.maxLength(80)]],
    prepTime: [0, [Validators.required]],
    ingredients: this._fb.array([], [Validators.minLength(2)]),
    description: ['', [Validators.minLength(15), Validators.maxLength(255)]]
  });
  
  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditMode'] || changes['recipe']){
      this._initForm();
    }
    console.log(changes);
  }

  addIngredient(): void {
    this._ingredients.push(
      this._fb.group({
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
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

  private _initForm(): void {
    this.form.reset();
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
            name: [ing.name, [Validators.required]],
            quantity: [ing.quantity, [Validators.required]]
          })
        );
      })
    } 
    else{
      this._ingredients.clear();
      this._ingredients.push(
      this._fb.group({
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      })
    );
    }
  }
}
