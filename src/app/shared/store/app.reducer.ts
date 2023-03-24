import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list/reducer/shopping-list.reducer';
import * as fromAuth from '../store/auth/reducer/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer
};
