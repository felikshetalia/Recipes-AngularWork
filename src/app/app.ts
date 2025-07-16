import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { Recipe } from './recipes/models';
import { RecipesManagementService } from './shared/recipes-management';
import { AddRecipe } from "./recipes/add-recipe/add-recipe";

@Component({
  selector: 'app-root',
  imports: [Navbar, Recipes, RecipeCard, AddRecipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  protected title = 'Recipes';

  private _recipesManagementService = inject(RecipesManagementService);

  RECIPE_LIST = this._recipesManagementService.recipesReadonly;

  selectedRecipe = signal<Recipe | undefined>(undefined);
  isEditing = signal<boolean>(false);
  isAdding = signal<boolean>(false);

  ngOnInit(): void {
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
    this._recipesManagementService.deleteRecipe(this.selectedRecipe()!).subscribe()
    this.selectedRecipe.set(undefined);
  }

  onEditRecipe(rep: Recipe): void {
    this.isEditing.set(true);
    this.selectedRecipe.set(rep);
  }

  onAddRecipe(enteredData: Recipe): void {
    this._recipesManagementService.addRecipe(enteredData)
      .subscribe();
    this.isAdding.set(false);
  }

  onAddClick(): void {
    this.isAdding.set(true);
  }

  onUpdate(source: Recipe): void {
    this._recipesManagementService.updateRecipe(source, this.selectedRecipe()!).subscribe();
    this.isEditing.set(false);
  }

  onCancel(): void {
    this.isEditing.set(false);
    this.isAdding.set(false);
  }

}
