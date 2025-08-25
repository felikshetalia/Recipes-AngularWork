import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Recipe } from '../models';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRecipeGroup, editRecipeGroup } from '../../store/recipes.actions';
import { selectRecipes } from '../../store/recipes.selectors';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeForm implements OnInit {
  private _router = inject(Router);
  private _fb = inject(FormBuilder);
  private _store = inject(Store);

  activeRoute = inject(ActivatedRoute);

  recipe = input.required<Recipe | undefined>();

  formSubmitted = signal<boolean>(false);
  isEditMode = signal<boolean>(
    this.activeRoute.snapshot.data['mode'] === 'edit',
  );

  form = this._fb.group({
    recipeName: [
      '',
      [Validators.minLength(3), Validators.maxLength(80), Validators.required],
    ],
    prepTime: [0, [Validators.required, Validators.minLength(1)]],
    ingredients: this._fb.array(
      [],
      [Validators.minLength(2), Validators.required],
    ),
    description: [
      '',
      [
        Validators.minLength(15),
        Validators.maxLength(255),
        Validators.required,
      ],
    ],
  });

  constructor() {
    effect(() => {
      this._initForm();
    });
  }

  ngOnInit(): void {
    this._initForm();
  }

  addIngredient(): void {
    this._ingredients.push(
      this._fb.group({
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
      }),
    );
  }

  onCancel(): void {
    this.isEditMode()
      ? this._router.navigate(['/recipes', this.recipe()?._id])
      : this._router.navigate([
          '/recipes',
          this._store.selectSignal(selectRecipes)()[0]._id,
        ]);
  }

  onSubmit(): void {
    const enteredData = {
      name: this.form.value.recipeName || '',
      preparationTimeInMins: this.form.value.prepTime || 0,
      ingredients: this._ingredients.value || [],
      description: this.form.value.description || '',
    };
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      if (this.isEditMode()) {
        this._store.dispatch(
          editRecipeGroup.editRecipe({
            id: this.recipe()?._id!,
            newData: enteredData,
          }),
        );
        this._router.navigate(['/recipes', this.recipe()!._id]);
      } else {
        this._store.dispatch(addRecipeGroup.addRecipe({ recipe: enteredData }));
        this._router.navigate(['/recipes']);
      }
      this.formSubmitted.set(true);
    }
  }

  get _ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  private _initForm(): void {
    this.form.reset();
    if (this.isEditMode()) {
      this.form.patchValue({
        recipeName: this.recipe()?.name,
        prepTime: this.recipe()?.preparationTimeInMins,
        description: this.recipe()?.description,
      });

      this._ingredients.clear();
      this.recipe()?.ingredients.forEach((ing) => {
        this._ingredients.push(
          this._fb.group({
            name: [ing.name, [Validators.required]],
            quantity: [ing.quantity, [Validators.required]],
          }),
        );
      });
    } else {
      this._ingredients.clear();
      this._ingredients.push(
        this._fb.group({
          name: ['', [Validators.required]],
          quantity: ['', [Validators.required]],
        }),
      );
    }
  }
}
