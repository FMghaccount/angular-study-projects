import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[ShoppingList] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[ShoppingList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[ShoppingList] DELETE_INGREDIENT';
export const START_EDIT = '[ShoppingList] START_EDIT';
export const STOP_EDIT = '[ShoppingList] STOP_EDIT';
export const UPDATE_INGREDIENT_WITH_ITEM_INDEX =
  '[ShoppingList] UPDATE_INGREDIENT_WITH_ITEM_INDEX';

export class addIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class addIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

// export class updateIngredient implements Action {
//   readonly type = UPDATE_INGREDIENT;

//   constructor(public payload: { index: number, ingredient: Ingredient }) { }
// }
export class updateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class updateIngredientWithItemIndex implements Action {
  readonly type = UPDATE_INGREDIENT_WITH_ITEM_INDEX;

  constructor(public payload: Ingredient) {}
}
// export class deleteIngredient implements Action {
//   readonly type = DELETE_INGREDIENT;

//   constructor(public payload: number) { }
// }
export class deleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class startEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class stopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | addIngredient
  | addIngredients
  | updateIngredient
  | deleteIngredient
  | startEdit
  | stopEdit
  | updateIngredientWithItemIndex;
