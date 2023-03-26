import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as RecipesActions from '../action/recipes.actions';
import { Recipe } from './../../../models/recipe.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class RecipesEffects {
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          environment.firebaseApiUrl + '/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes);
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
