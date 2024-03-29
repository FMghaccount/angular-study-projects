import { Store } from '@ngrx/store';
// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list/action/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../store/recipes/action/recipes.actions';

@Injectable({
  providedIn: 'root',
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

  private recipes: Recipe[] = [];

  getRecipes() {
    // return this.recipes.slice();
    // return this.recipes;

    // where ever this method is used it should subscribe to this method
    return this.store.select('recipes');
  }

  setRecipes(recipes: Recipe[]) {
    // this.recipes = recipes;
    // this.recipeList.next(this.recipes);
    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
  }

  // getRecipe(id: number) {
  //   // return this.recipes[id];

  //   // where ever this method is used it should subscribe to this method
  //   return this.store.select('recipes');
  // }

  getRecipe() {
    // return this.recipes[id];

    // where ever this method is used it should subscribe to this method
    return this.store.select('recipes');
  }

  addToIngredientsFromRecipeDetail(ingredients: Ingredient[]) {
    // this.slService.addIngredientsFromRecipeDetail(ingredients)
    this.store.dispatch(new ShoppingListActions.addIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    // this.recipes.push(recipe);
    // // this.recipeList.next(this.recipes.slice())
    // this.recipeList.next(this.recipes);
    this.store.dispatch(new RecipesActions.AddRecipe(recipe));
  }

  fetchRecipesWithNgrx() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // this.recipes[index] = newRecipe;

    // // this.recipeList.next(this.recipes.slice())
    // this.recipeList.next(this.recipes);
    this.store.dispatch(
      new RecipesActions.UpdateRecipe({ index: index, newRecipe: newRecipe })
    );
  }

  removeRecipe(id: number) {
    // this.recipes.splice(id, 1);
    // this.recipeList.next(this.recipes.slice())
    // this.recipeList.next(this.recipes);
    this.store.dispatch(new RecipesActions.DeleteRecipe(id));
  }

  // constructor(private slService: ShoppingListService, private store: Store<fromApp.AppState>) { }
  constructor(private store: Store<fromApp.AppState>) {}
}
