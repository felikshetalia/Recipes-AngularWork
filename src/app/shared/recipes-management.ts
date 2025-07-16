import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from '../recipes/models';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesManagementService {

  private _resourceURL = "https://crudcrud.com/api/843f0c312fe7401ba1ba65d070fa6db4/recipes";
  private _httpCli = inject(HttpClient);

  public RECIPES_LIST = signal<Recipe[]>([]);

  public recipesReadonly = this.RECIPES_LIST.asReadonly();

  loadRecipes(): Observable<Recipe[]> {
    return this._httpCli.get<Recipe[]>(this._resourceURL)
    .pipe(
      tap({
        next: (list) => this.RECIPES_LIST.set(list)
      })
    );
  }

  addRecipe(source: Recipe): Observable<Recipe> {
    return this._httpCli.post<Recipe>(this._resourceURL, source);
  }

  updateRecipe(source: Recipe, dest: Recipe): Observable<Recipe> {
    return this._httpCli.put<Recipe>(`${this._resourceURL}/${dest._id}`, source);
  }

  deleteRecipe(rep: Recipe): Observable<any> {
    return this._httpCli.delete(`${this._resourceURL}/${rep._id}`);
  }

}
