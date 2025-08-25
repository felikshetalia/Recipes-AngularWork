import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Recipes } from './recipes/recipes';
import { Recipe } from './recipes/models';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import {
  addRecipeGroup,
  deleteRecipeGroup,
  editRecipeGroup,
  loadRecipesGroup,
} from './store/recipes.actions';
import {
  selectedRecipe,
  selectError,
  selectLoadingBool,
  selectRecipes,
} from './store/recipes.selectors';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Recipes,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected title = 'Recipes';
  private _route = inject(ActivatedRoute);

  private _destroyRef = inject(DestroyRef);
  private _store = inject(Store);

  readonly recipeList$ = this._store.selectSignal(selectRecipes);
  readonly isLoading$ = this._store.selectSignal(selectLoadingBool);
  readonly errorCode$ = this._store.selectSignal(selectError);
  readonly selectedRecipe$ = this._store.selectSignal(selectedRecipe);

  readonly isEditing = signal<boolean>(false);
  readonly isAdding = signal<boolean>(false);
  readonly isSearching = signal<boolean>(false);
  readonly filteredList = signal<Recipe[]>(this.recipeList$());

  searchForm = inject(FormBuilder).control('');

  ngOnInit(): void {
    this.loadData();

    this.searchForm.valueChanges
      .pipe(debounceTime(200), takeUntilDestroyed(this._destroyRef))
      .subscribe((searchTerm) => {
        if (searchTerm!.length > 0) {
          this.isSearching.set(true);
          this.filteredList.set(
            this.recipeList$().filter((rep) =>
              rep.name.toLowerCase().includes(searchTerm!.toLowerCase()),
            ),
          );
        } else {
          this.isSearching.set(false);
        }
      });
  }

  loadData(): void {
    this._store.dispatch(loadRecipesGroup.load());
  }

  onDeleteRecipe(): void {
    this._store.dispatch(
      deleteRecipeGroup.deleteRecipe({ recipe: this.selectedRecipe$()! }),
    );
  }

  onEditRecipe(rep: Recipe): void {
    this.isEditing.set(true);
    this.isAdding.set(false);
  }

  onAddRecipe(enteredData: Recipe): void {
    this._store.dispatch(addRecipeGroup.addRecipe({ recipe: enteredData }));
    this.isAdding.set(false);
  }

  onAddClick(): void {
    this.isAdding.set(true);
    this.isEditing.set(false);
  }

  onUpdate(source: Recipe): void {
    this._store.dispatch(
      editRecipeGroup.editRecipe({
        id: this.selectedRecipe$()!._id!,
        newData: source,
      }),
    );
    this.isEditing.set(false);
  }

  handleSubmission(enteredData: Recipe): void {
    if (this.isAdding()) {
      this.onAddRecipe(enteredData);
    } else {
      this.onUpdate(enteredData);
    }
  }

  onCancel(): void {
    this.isEditing.set(false);
    this.isAdding.set(false);
  }
}
