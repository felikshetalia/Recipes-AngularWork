import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Recipes } from './recipes/recipes';
import { Recipe } from './recipes/models';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';

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
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Recipes,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton,
    MatIconButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  protected title = 'Recipes';
  private _destroyRef = inject(DestroyRef);
  private _store = inject(Store);
  private _route = inject(Router);
  protected _mediaQuery!: MediaQueryList;
  private _mediaQueryListener!: () => void;
  private media = inject(MediaMatcher);

  readonly recipeList$ = this._store.selectSignal(selectRecipes);
  readonly isLoading$ = this._store.selectSignal(selectLoadingBool);
  readonly errorCode$ = this._store.selectSignal(selectError);
  readonly selectedRecipe$ = this._store.selectSignal(selectedRecipe);

  protected readonly mobileMode = signal<boolean>(false);
  protected readonly sidenav = viewChild.required<MatSidenav>('sidenav');
  readonly isEditing = signal<boolean>(false);
  readonly isAdding = signal<boolean>(false);
  readonly isSearching = signal<boolean>(false);
  readonly filteredList = signal<Recipe[]>(this.recipeList$());

  searchForm = inject(FormBuilder).control('');

  ngOnInit(): void {
    this.loadData();
    this.setupMediaQuery();
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
  ngOnDestroy(): void {
    this._mediaQuery.removeListener(this._mediaQueryListener);
  }

  setupMediaQuery(): void {
    this._mediaQuery = this.media.matchMedia(
      '(orientation: portrait), (max-width: 1446px)',
    );
    this.mobileMode.set(this._mediaQuery.matches);
    this._mediaQueryListener = () => {
      this.mobileMode.set(this._mediaQuery.matches);
    };
    this._mediaQuery.addListener(this._mediaQueryListener);
  }

  loadData(): void {
    this._store.dispatch(loadRecipesGroup.load());
  }

  onDeleteRecipe(rep: Recipe): void {
    this._store.dispatch(
      deleteRecipeGroup.deleteRecipe({
        recipe: rep,
      }),
    );
  }

  onEditRecipe(rep: Recipe): void {
    this.isEditing.set(true);
    this.isAdding.set(false);
    if (rep) {
      this._route.navigate(['/recipes', rep._id, 'edit']);
    }
  }

  onAddRecipe(enteredData: Recipe): void {
    this._store.dispatch(addRecipeGroup.addRecipe({ recipe: enteredData }));
    this.isAdding.set(false);
  }

  onAddClick(): void {
    this.isAdding.set(true);
    this.isEditing.set(false);
    if (this.mobileMode()) {
      this.sidenav().toggle();
    }
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
