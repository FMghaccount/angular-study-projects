import { ShoppingListService } from './shopping-list.service';
// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // selectedRecipe = new EventEmitter<Recipe>();
  // selectedRecipeId = new EventEmitter<number>();
  selectedRecipeId = new Subject<number>();

  private recipes: Recipe[] = [
    new Recipe('اولین دستور پخت',
      'لورم ایپسوم متن ساختگی',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('نان', 1),
        new Ingredient('سیب زمینی سرخ شده', 20),
        new Ingredient('گوشت', 1)
      ]),
    new Recipe('دومین دستور پخت',
      'لورم ایپسوم متن ساختگی',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('نان', 2),
        new Ingredient('گوشت', 1)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToIngredientsFromRecipeDetail(ingredient: Ingredient[]) {
    this.slService.addIngredientsFromRecipeDetail(ingredient)
  }

  constructor(private slService: ShoppingListService) { }
}
