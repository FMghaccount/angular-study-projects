import { Store } from '@ngrx/store';
// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list/action/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list/reducer/shopping-list.reducer'


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // selectedRecipe = new EventEmitter<Recipe>();
  // selectedRecipeId = new EventEmitter<number>();
  recipeList = new Subject<Recipe[]>();
  selectedRecipeId = new Subject<number>();

  // private recipes: Recipe[] = [
  //   new Recipe('اولین دستور پخت',
  //     'لورم ایپسوم متن ساختگی',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('نان', 1),
  //       new Ingredient('سیب زمینی سرخ شده', 20),
  //       new Ingredient('گوشت', 1)
  //     ]),
  //   new Recipe('دومین دستور پخت',
  //     'لورم ایپسوم متن ساختگی',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('نان', 2),
  //       new Ingredient('گوشت', 1)
  //     ])
  // ];

  private recipes: Recipe[] = []

  getRecipes() {
    // return this.recipes.slice();
    return this.recipes;
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeList.next(this.recipes)
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToIngredientsFromRecipeDetail(ingredients: Ingredient[]) {
    // this.slService.addIngredientsFromRecipeDetail(ingredients)
    this.store.dispatch(new ShoppingListActions.addIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    // this.recipeList.next(this.recipes.slice())
    this.recipeList.next(this.recipes)
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;

    // this.recipeList.next(this.recipes.slice())
    this.recipeList.next(this.recipes)
  }

  removeRecipe(id: number) {
    this.recipes.splice(id, 1)
    // this.recipeList.next(this.recipes.slice())
    this.recipeList.next(this.recipes)
  }

  // constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }
  constructor(private store: Store<fromShoppingList.AppState>) { }
}
