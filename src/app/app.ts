import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";
import { RecipeCard } from "./recipes/recipe-card/recipe-card";
import { OneRecipe } from './recipes/one-recipe/one-recipe';
import { Recipe, recipesList } from './recipes/recipes-list';
import { RecipesManagement } from './shared/recipes-management';
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
  private recipesManagementService = inject(RecipesManagement);
  RECIPE_LIST = this.recipesManagementService.recipesReadonly;
  selectedRecipe = signal<Recipe | undefined>(undefined);
  isEditing = signal<boolean>(false);
  constructor() {
    effect(() => {
      const updatedVersion = this.RECIPE_LIST().find(r => r.id === this.selectedRecipe()!.id);
      if (updatedVersion) {
        this.selectedRecipe.set(updatedVersion);
      }
    });
  }
  ngOnInit(): void {
    if (this.RECIPE_LIST().length > 0) {
      this.selectedRecipe.set(this.RECIPE_LIST()[0]);
    }
  }
  onRecipeSelected(recipe: Recipe) :void{
    this.selectedRecipe.set(recipe);
  }
}
