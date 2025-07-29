import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { Recipe } from './recipes/models';
import { RecipesManagementService } from './shared/recipes-management';
import { RecipeForm } from "./recipes/recipe-form/recipe-form";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Recipes,
    RecipeCard,
    RecipeForm,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  protected title = 'Recipes';

  private _recipesManagementService = inject(RecipesManagementService);
  private _destroyRef = inject(DestroyRef);

  recipeList = this._recipesManagementService.recipesReadonly;

  selectedRecipe = signal<Recipe | undefined>(undefined);
  isEditing = signal<boolean>(false);
  isAdding = signal<boolean>(false);
  isSearching = signal<boolean>(false);

  searchForm = inject(FormBuilder).control('');
  filteredList = signal<Recipe[]>(this.recipeList());

  ngOnInit(): void {
    this.loadData();

    this.searchForm.valueChanges.pipe(debounceTime(200))
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe(searchTerm => {
      if(searchTerm!.length > 0){
        this.isSearching.set(true);
        this.filteredList.set(this.recipeList().filter(
          rep => rep.name.toLowerCase().includes(searchTerm!.toLowerCase()))
        )
      }
      else{
        this.isSearching.set(false);
      }
    })
  }

  loadData(): void {
    this._recipesManagementService.loadRecipes().subscribe({
      next: (list) => {
        if (list.length > 0) {
          this.selectedRecipe.set(list[0]);
        }
      }
    });
  }

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe.set(recipe);
  }

  onDeleteRecipe(): void {
    this._recipesManagementService.deleteRecipe(this.selectedRecipe()!).subscribe({
      next: () => {
        this.loadData();
      }
    });
    this.selectedRecipe.set(undefined);
  }

  onEditRecipe(rep: Recipe): void {
    this.isEditing.set(true);
    this.isAdding.set(false);
    this.selectedRecipe.set(rep);
  }

  onAddRecipe(enteredData: Recipe): void {
    this._recipesManagementService.addRecipe(enteredData)
      .subscribe({
        next: () => {
          this.loadData();
        }
      });
    this.isAdding.set(false);
  }

  onAddClick(): void {
    this.isAdding.set(true);
    this.isEditing.set(false);
  }

  onUpdate(source: Recipe): void {
    this._recipesManagementService.updateRecipe(source, this.selectedRecipe()!)
    .subscribe({
      next: () => {
        this.loadData();
      }
    });
    this.isEditing.set(false);
  }

  handleSubmission(enteredData: Recipe): void {
    if(this.isAdding()){
      this.onAddRecipe(enteredData);
    }
    else{
      this.onUpdate(enteredData);
    }
  }

  onCancel(): void {
    this.isEditing.set(false);
    this.isAdding.set(false);
  }

}
