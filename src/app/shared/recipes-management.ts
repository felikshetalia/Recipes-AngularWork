import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Recipe, recipesList } from '../recipes/recipes-list';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RecipesManagement {
  private platformID = inject(PLATFORM_ID)
  public RECIPES_LIST = signal<Recipe[]>(recipesList);
  public recipesReadonly = this.RECIPES_LIST.asReadonly();
  public isEditing = signal<boolean>(false);
  constructor() {
    if(isPlatformBrowser(this.platformID)) {
      const savedRecipes = localStorage.getItem('RECIPES_LIST');
      if (savedRecipes) {
        this.RECIPES_LIST.set(JSON.parse(savedRecipes));
      } else {
        this.RECIPES_LIST.set(recipesList);
        this.saveAllRecipes();
      }
    }
    else{
      this.RECIPES_LIST.set(recipesList);
    }
   }

  setEditMode(isEditing: boolean): void {
    this.isEditing.set(isEditing);
  }

  updateRecipe(current: Recipe): void {
    const newList = this.RECIPES_LIST().map(recipe => recipe.id === current.id ? current : recipe);
    this.RECIPES_LIST.set(newList);
    this.saveAllRecipes();
  }

  private saveAllRecipes(): void {
    localStorage.setItem('RECIPES_LIST', JSON.stringify(this.RECIPES_LIST()));
  }

}
