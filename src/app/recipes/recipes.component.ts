import { Subscription, map } from 'rxjs';
// import { Recipe } from '../shared/models/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RecipeService } from './../shared/services/recipe.service';
// import { DataStorageService } from './../shared/services/data-storage.service';
import * as fromApp from '../shared/store/app.reducer';
import * as RecipesActions from '../shared/store/recipes/action/recipes.actions';
import { Recipe } from '../shared/models/recipe.model';
// import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  // selectedRecipe: Recipe;
  // selectedRecipe: Recipe;
  // onSelectRecipe(recipe) {
  //   this.selectedRecipe = recipe;
  //   console.log(recipe);
  // }

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    // private authService: AuthService,
    // private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState> // private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // this.recipeService.selectedRecipeId.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })

    // this.authService.autoLogin();
    // const recipes = this.recipeService.getRecipes();
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });

    if (this.recipes.length === 0) {
      // console.log(this.recipes);
      // this.dataStorageService.fetchRecipes().subscribe();
      this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    // with Subject Operator from rxjs
    // this.recipeService.selectedRecipeId.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // with Subject Operator from rxjs
  // ngOnDestroy(){
  //   this.recipeService.selectedRecipeId.unsubscribe();
  // }
}
