import { Ingredient } from '../models/ingredient.model';
// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('سیب', 5),
    new Ingredient('گوجه فرنگی', 10),
  ];

  ingredientList = new Subject<Ingredient[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientList.next(this.ingredients.slice());
  }

  addIngredientsFromRecipeDetail(ingredientsItems: Ingredient[]) {
    // for (let ingredient of ingredientsItems) {
    //   this.ingredients.push(ingredient)
    // }
    this.ingredients.push(...ingredientsItems)
    this.ingredientList.next(this.ingredients.slice());
  }
}
