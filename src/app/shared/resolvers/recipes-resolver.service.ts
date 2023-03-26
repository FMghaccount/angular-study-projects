import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

// import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../models/recipe.model';
// import { DataStorageService } from './../services/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../store/recipes/action/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    // private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions // private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipeService.getRecipes();
    let recipes: Recipe[] = [];
    // if (recipes.length === 0) return this.dataStorageService.fetchRecipes();
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipesState) => {
        recipes = recipesState.recipes;
      });
    if (recipes.length === 0) {
      this.store.dispatch(new RecipesActions.FetchRecipes());
      return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
    }
  }
}
