import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from '../recipes/models';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesManagementService {

  private _resourceURL = "https://crudcrud.com/api/1dea320aea244900b648e8054efc4fdd/recipes";
  private _httpCli = inject(HttpClient);

  public recipeList = signal<Recipe[]>([]);

  public recipesReadonly = this.recipeList.asReadonly();

  loadRecipes(): Observable<Recipe[]> {
    return this._httpCli.get<Recipe[]>(this._resourceURL)
    .pipe(
      tap({
        next: (list) => this.recipeList.set(list)
      })
    );
  }

  addRecipe(source: Recipe): Observable<Recipe> {
    return this._httpCli.post<Recipe>(this._resourceURL, source);
  }

  updateRecipe(source: Recipe, dest: Recipe): Observable<Recipe> {
    return this._httpCli.put<Recipe>(`${this._resourceURL}/${dest._id}`, source);
  }

  deleteRecipe(rep: Recipe): Observable<null> {
    return this._httpCli.delete<null>(`${this._resourceURL}/${rep._id}`);
  }

}
