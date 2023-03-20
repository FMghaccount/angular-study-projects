import { Recipe } from './../models/recipe.model';
import { DataStorageService } from './../services/data-storage.service';
import { RecipeService } from './../services/recipe.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const recipe = this.recipeService.getRecipe(+route.params['id'])
    if (!recipe) {
      return this.checkRecipeDetail(+route.params['id'])
    } else {
      return true
    }
  }

  checkRecipeDetail(id: number) {
    return this.dataStorageService.fetchRecipes().pipe(map(recipes => {
      // const recipe = this.recipeService.getRecipe(+route.params['id'])
      const recipe = recipes[id]
      if (recipe) {
        return true
      } else {
        return this.router.createUrlTree(['/recipes']);
      }
    }))
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
