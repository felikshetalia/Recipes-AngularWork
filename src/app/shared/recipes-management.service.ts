import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from '../recipes/models';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesManagementService {
  private _resourceURL =
    'https://crudcrud.com/api/cee5d97a5f95474f8528d505763635bb/recipes';
  private _httpCli = inject(HttpClient);

  loadRecipes(): Observable<Recipe[]> {
    return this._httpCli.get<Recipe[]>(this._resourceURL);
  }

  addRecipe(source: Recipe): Observable<Recipe> {
    return this._httpCli.post<Recipe>(this._resourceURL, source);
  }

  updateRecipe(source: Recipe, destId: string): Observable<Recipe> {
    return this._httpCli.put<Recipe>(`${this._resourceURL}/${destId}`, source);
  }

  deleteRecipe(rep: Recipe): Observable<null> {
    return this._httpCli.delete<null>(`${this._resourceURL}/${rep._id}`);
  }
}
