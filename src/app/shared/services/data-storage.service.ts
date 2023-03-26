// import { exhaustMap, take } from 'rxjs/operators';
import { map, tap } from 'rxjs';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
import { Recipe } from './../models/recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../store/recipes/action/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) // private authService: AuthService
  {}

  storeRecipes() {
    this.recipes = this.recipeService.getRecipes();
    if (this.recipes.length > 0) {
      this.http
        .put(environment.firebaseApiUrl + '/recipes.json', this.recipes, {
          observe: 'response',
        })
        .subscribe((responseData) => {
          console.log(responseData);
          if (responseData.ok) {
            alert('درخواست شما با موفقیت ارسال شد');
          } else alert('ارسال درخواست شما با خطا روبرو شده است');
        });
    } else alert('لیست دستورهای پخت خالی است');
  }

  fetchRecipes() {
    // return this.authService.user.pipe(take(1), exhaustMap(user => {
    //   return this.http
    //     .get<Recipe[]>(
    //       'https://ng-recipe-book-9ff96-default-rtdb.firebaseio.com/recipes.json',
    //       {
    //         params: new HttpParams().set('auth', user.token)
    //       }
    //     )
    // })).pipe(map(recipes => {
    //   return recipes.map(recipe => {
    //     return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
    //   })
    // }), tap(recipes => {
    //   if (recipes.length === 0) {
    //     // alert('دستورپختی برای بارگزاری وجود ندارد.لطفاً یک دستورپخت اضافه کنید')
    //   } else {
    //     // alert('اطلاعات با موفقیت بارگزاری شد')
    //     this.recipeService.setRecipes(recipes)
    //   }
    // }))

    return this.http
      .get<Recipe[]>(environment.firebaseApiUrl + '/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }
}
