import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../models/recipe.model';
import { DataStorageService } from './../services/data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) return this.dataStorageService.fetchRecipes();
    else return recipes;

  }
}