import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { Recipe } from './recipes/recipes-list';
import { RecipesManagementService } from './shared/recipes-management';

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
  
  selectedRecipe = signal<Recipe | undefined>(undefined);
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
    this.selectedRecipe.set(undefined);
  }

  onEditRecipe(rep: Recipe): void {
    this.isEditing.set(true);
    this.selectedRecipe.set(rep);
  }

  onUpdate(source: Recipe): void {
    this._recipesManagementService.updateRecipe(source, this.selectedRecipe()!);
    this.selectedRecipe.set(source);
    this.onFinishEditing();
  }

  onFinishEditing(): void {
    this.isEditing.set(false);
  }

}
