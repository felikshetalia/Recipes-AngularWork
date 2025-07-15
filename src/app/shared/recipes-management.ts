import { inject, Injectable, signal } from '@angular/core';
import { Recipe, recipesList } from '../recipes/recipes-list';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, tap } from 'rxjs';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
@Injectable({
  providedIn: 'root'
})
export class RecipesManagementService {

  private _resourceURL = "https://crudcrud.com/api/b78e0bd65e3949478d7de4d04158792a/recipes";
  private _pathToJson = "data/recipes";
  private _httpCli = inject(HttpClient);

  public RECIPES_LIST = signal<Recipe[]>([]);

  public recipesReadonly = this.RECIPES_LIST.asReadonly();

  loadRecipes(): Observable<Recipe[]> {
    this.RECIPES_LIST.set([]);
    return this._httpCli.get<Recipe[]>(this._resourceURL)
    .pipe(
      tap({
        next: (list) => this.RECIPES_LIST.set(list)
      })
    );
  }

  addRecipe(source: Recipe): Observable<Recipe> {
    return this._httpCli.put<Recipe>(this._resourceURL, source);
  }

  updateRecipe(source: Recipe, dest: Recipe): void {
    const newList = this.RECIPES_LIST().map(recipe => recipe.id === dest.id ? source : recipe);
    this.RECIPES_LIST.set(newList);
  }

  // deleteRecipe(rep: Recipe): void {
  //   const newList = this.RECIPES_LIST().filter(recipe => recipe.id !== rep.id);
  //   this.RECIPES_LIST.set(newList);
  // }

  deleteRecipe(rep: Recipe): Observable<any> {
    const prevState = this.RECIPES_LIST();
    if(prevState.some((r) => r.id === rep.id)){
      this.RECIPES_LIST.set(prevState.filter(r => r.id !== rep.id));
    }
    return this._httpCli.delete(`${this._resourceURL}/${rep.id}`);

  }

}
