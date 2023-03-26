import { Action } from '@ngrx/store';

import { Recipe } from './../../../models/recipe.model';

export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';
export const ADD_RECIPE = '[Recipe] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';
export const CLEAR_RECIPES = '[Recipe] CLEAR_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class clearRecipes implements Action {
  readonly type = CLEAR_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
  | clearRecipes;
