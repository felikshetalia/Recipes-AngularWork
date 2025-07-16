import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from '../recipes/models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, tap } from 'rxjs';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class RecipesManagementService {

  private _resourceURL = "https://crudcrud.com/api/843f0c312fe7401ba1ba65d070fa6db4/recipes";
  private _pathToJson = "data/recipes";
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
    const isDuplicate = this.RECIPES_LIST().some(rep => rep.name === source.name);
    return this._httpCli.post<Recipe>(this._resourceURL, source)
    .pipe(
      tap({
        next: () => {
          if(isDuplicate){
            console.log("duplicate tho");
          }
        }
      })
    )
  }

  updateRecipe(source: Recipe, dest: Recipe): Observable<Recipe> {
    return this._httpCli.put<Recipe>(`${this._resourceURL}/${dest._id}`, source);
  }

  deleteRecipe(rep: Recipe): Observable<any> {
    const prevState = this.RECIPES_LIST();
    console.log(rep);
    return this._httpCli.delete(`${this._resourceURL}/${rep._id}`)
      .pipe(
        tap({
          next: () => {
            if (prevState.some((r) => r._id === rep._id)) {
              this.RECIPES_LIST.set(prevState.filter(r => r._id !== rep._id));
            }
          },
          error: () => {
            console.log(rep._id);

          }
        })
      );

  }

}
