import { Injectable, signal } from '@angular/core';
import { Recipe, recipesList } from '../recipes/recipes-list';
@Injectable({
  providedIn: 'root'
})
export class RecipesManagementService {

  public RECIPES_LIST = signal<Recipe[]>(recipesList);

  public recipesReadonly = this.RECIPES_LIST.asReadonly();

  updateRecipe(source: Recipe, dest: Recipe): void {
    const newList = this.RECIPES_LIST().map(recipe => recipe.id === dest.id ? source : recipe);
    this.RECIPES_LIST.set(newList);
    console.log(this.RECIPES_LIST());
  }

  deleteRecipe(rep: Recipe): void {
    const newList = this.RECIPES_LIST().filter(recipe => recipe.id !== rep.id);
    this.RECIPES_LIST.set(newList);
  }

}
