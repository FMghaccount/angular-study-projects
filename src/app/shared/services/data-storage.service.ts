import { map, tap } from 'rxjs';
import { Recipe } from './../models/recipe.model';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipes: Recipe[] = []

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    this.recipes = this.recipeService.getRecipes();
    if (this.recipes.length > 0) {
      this.http.put(
        'https://ng-recipe-book-9ff96-default-rtdb.firebaseio.com/recipes.json',
        this.recipes, {
        observe: 'response'
      }).subscribe(responseData => {
        console.log(responseData)
        if (responseData.ok) {
          alert('درخواست شما با موفقیت ارسال شد')
        } else alert('ارسال درخواست شما با خطا روبرو شده است')
      })
    } else alert('لیست دستورهای پخت خالی است');
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-recipe-book-9ff96-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
      })
    }), tap(recipes => {
      if (recipes.length === 0) {
        // alert('دستورپختی برای بارگزاری وجود ندارد.لطفاً یک دستورپخت اضافه کنید')
      } else {
        // alert('اطلاعات با موفقیت بارگزاری شد')
        this.recipeService.setRecipes(recipes)
      }
    }))
  }
}
