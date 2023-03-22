import * as ShoppingListActions from './../action/shopping-list.actions';
// import { Action } from "@ngrx/store"
import { Ingredient } from "../../../models/ingredient.model"

const initialState = {
  ingredients: [
    new Ingredient('سیب', 5),
    new Ingredient('گوجه فرنگی', 10),
  ]
}

export const ShoppingListReducer = (state = initialState, action: ShoppingListActions.addIngredient) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
      break;

    default:
      break;
  }
}