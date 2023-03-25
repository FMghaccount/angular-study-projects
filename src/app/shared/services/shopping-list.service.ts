// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('سیب', 5),
    new Ingredient('گوجه فرنگی', 10),
  ];

  ingredientList = new Subject<Ingredient[]>();

  constructor() {}

  getIngredients() {
    // return this.ingredients.slice();
    return this.ingredients;
  }

  getIngredient(id: number): Ingredient {
    return this.ingredients[id];
  }

  editIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id].name = ingredient.name;
    this.ingredients[id].amount = ingredient.amount;
  }

  removeIngredient(id: number) {
    this.ingredients.splice(id, 1);
    console.log(this.ingredients);
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientList.next(this.ingredients.slice());
    this.ingredientList.next(this.ingredients);
  }

  addIngredientsFromRecipeDetail(ingredientsItems: Ingredient[]) {
    // for (let ingredient of ingredientsItems) {
    //   this.ingredients.push(ingredient)
    // }
    this.ingredients.push(...ingredientsItems);
    // this.ingredientList.next(this.ingredients.slice());
    this.ingredientList.next(this.ingredients);
  }
}
