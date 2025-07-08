import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { OneRecipe } from './recipes/one-recipe/one-recipe';
import { Recipe, recipesList } from './recipes/recipes-list';
import { RecipesManagementService } from './shared/recipes-management';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-root',
  imports: [Navbar, Recipes, RecipeCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  protected title = 'Recipes';

  private _recipesManagementService = inject(RecipesManagementService);

  RECIPE_LIST = this._recipesManagementService.recipesReadonly;
  // RECIPE_LIST = signal<Recipe[]>(recipesList);

  selectedRecipe = signal<Recipe | undefined>(undefined);
  enteredRecipeData = signal<Recipe | undefined>(undefined);
  isEditing = signal<boolean>(false);

  ngOnInit(): void {
    if (this.RECIPE_LIST().length > 0) {
      this.selectedRecipe.set(this.RECIPE_LIST()[0]);
    }
  }

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe.set(recipe);
  }

  onDeleteRecipe(): void {
    this._recipesManagementService.deleteRecipe(this.selectedRecipe()!);
  }

  onEditRecipe(): void {
    this.isEditing.set(true)
    console.log(this.isEditing());
  }

  onUpdate(source: Recipe): void {
    this.enteredRecipeData.set(source);
    this._recipesManagementService.updateRecipe(this.enteredRecipeData()!, this.selectedRecipe()!);
    console.log(this.RECIPE_LIST());
    this.onFinishEditing();
  }

  onFinishEditing(): void {
    this.isEditing.set(false);
    console.log(this.isEditing());
  }

}
