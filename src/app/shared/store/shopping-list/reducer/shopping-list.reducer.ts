import * as ShoppingListActions from './../action/shopping-list.actions';
// import { Action } from "@ngrx/store"
import { Ingredient } from '../../../models/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('سیب', 5), new Ingredient('گوجه فرنگی', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const ShoppingListReducer = (
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      let prevIngredients = { ...state };
      let parsedPrevIngredients: {
        ingredients: Ingredient[];
      } = JSON.parse(JSON.stringify(prevIngredients));
      let newIngredients = [...action.payload];
      for (let newIngredient of newIngredients) {
        let result = parsedPrevIngredients.ingredients.findIndex(
          (ingredient) => ingredient.name === newIngredient.name
        );
        if (result !== -1) {
          parsedPrevIngredients.ingredients[result].amount +=
            newIngredient.amount;
        } else {
          parsedPrevIngredients.ingredients = [
            ...parsedPrevIngredients.ingredients,
            newIngredient,
          ];
        }
      }
      return { ...state, ingredients: parsedPrevIngredients.ingredients };

    // case ShoppingListActions.UPDATE_INGREDIENT:
    //   const ingredient = state.ingredients[action.payload.index];
    //   const updatedIngredient = {
    //     ...ingredient,
    //     ...action.payload.ingredient
    //   }
    //   const updatedIngredients = [...state.ingredients];
    //   updatedIngredients[action.payload.index] = updatedIngredient;

    //   return {
    //     ...state,
    //     ingredients: updatedIngredients,
    //     editedIngredient: null,
    //     editedIngredientIndex: -1
    //   }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    // case ShoppingListActions.DELETE_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: state.ingredients.filter((item, index) => {
    //       index !== action.payload
    //     }),
    //     editedIngredient: null,
    //     editedIngredientIndex: -1
    //   }
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredients = state.ingredients.filter((item, index) => {
        return index !== state.editedIngredientIndex;
      });

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
};
