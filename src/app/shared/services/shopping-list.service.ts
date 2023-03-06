import { Ingredient } from '../models/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('سیب', 5),
    new Ingredient('گوجه فرنگی', 10),
  ];

  ingredientList = new EventEmitter<Ingredient[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientList.emit(this.ingredients.slice());
  }

  addIngredientsFromRecipeDetail(ingredientsItems: Ingredient[]) {
    for (let ingredient of ingredientsItems) {
      this.ingredients.push(ingredient)
    }
    // let ingredientsCopy = this.ingredients.slice()

    // for (let i = 0; i < ingredientsItems.length; ++i) {
    //   let pushFlag = false;
    //   let foundFlag = false;
    //   for (let j = 0; ingredientsCopy.length; ++j) {
    //     if (ingredientsCopy[j].name === ingredientsItems[i].name) {
    //       foundFlag = true;
    //     }
    //   }
    //   for (let n = 0; n < ingredientsCopy.length; ++n) {
    //     // if (foundItem) {
    //     //   // console.log(pushFlag);
    //     //   pushFlag = true;
    //     //
    //     if (ingredientsItems[i].name === ingredientsCopy[n].name) {
    //       ingredientsCopy[n].amount = ingredientsCopy[n].amount + ingredientsItems[i].amount
    //     }
    //     else {
    //       if (!pushFlag) {
    //         this.ingredients.push(ingredientsItems[i])
    //         pushFlag = true;
    //       }
    //     }
    //   }
    //   pushFlag = false;
    // }
  }
}
