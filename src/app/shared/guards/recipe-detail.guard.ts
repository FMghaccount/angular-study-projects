import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map, interval, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// import { Recipe } from './../models/recipe.model';
import { DataStorageService } from './../services/data-storage.service';
// import { RecipeService } from './../services/recipe.service';
import * as fromApp from '../store/app.reducer';
// import * as RecipesActions from '../store/recipes/action/recipes.actions';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, OnDestroy
{
  constructor(
    // private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private store: Store<fromApp.AppState> // private dataStorageService: DataStorageService
  ) {}

  storeSub: Subscription;
  intervalSub: Subscription;

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const recipe = this.recipeService.getRecipe(+route.params['id']);
    // if (!recipe) {
    //   return this.checkRecipeDetail(+route.params['id']);
    // } else {
    //   return true;
    // }
    let recipes: Recipe[] = [];
    this.storeSub = this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipesState) => {
        recipes = recipesState.recipes;
      });
    if (recipes[+route.params['id']]) {
      return true;
    } else {
      return this.checkRecipeDetail(+route.params['id']);
      // this.checkRecipeDetail();
      // let recipe: Recipe;
      // let existence: boolean;
      // return this.store.select('recipes').pipe(
      //   take(1),
      //   map((recipesState) => {
      //     // // console.log(id);
      //     // console.log(recipesState);
      //     recipe = recipesState.recipes[+route.params['id']];
      //     if (recipe) {
      //       console.log('true');
      //       return true;
      //     } else {
      //       console.log('false');
      //       return this.router.createUrlTree(['/recipes']);
      //     }
      //   })
      // );
    }
  }

  checkRecipeDetail(id: number) {
    // this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.dataStorageService.fetchRecipes().pipe(
      map((recipes) => {
        // const recipe = this.recipeService.getRecipe(+route.params['id'])
        const recipe = recipes[id];
        if (recipe) {
          return true;
        } else {
          return this.router.createUrlTree(['/recipes']);
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
