import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from '../action/recipes.actions';
import { Recipe } from './../../../models/recipe.model';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

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

  storeRecipes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          if (recipesState.recipes.length > 0) {
            return this.http.put(
              environment.firebaseApiUrl + '/recipes.json',
              recipesState.recipes,
              {
                observe: 'response',
              }
            );
          } else {
            return of(alert('لیست دستورهای پخت خالی است'));
          }
        }),
        map((responseData) => {
          if (responseData) {
            if (responseData.ok) {
              return alert('درخواست شما با موفقیت ارسال شد');
            } else return alert('ارسال درخواست شما با خطا روبرو شده است');
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
