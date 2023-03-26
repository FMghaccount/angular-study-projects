import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from './../../shared/models/recipe.model';
import { RecipeService } from './../../shared/services/recipe.service';
import * as fromApp from '../../shared/store/app.reducer';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.css'],
})
export class RecipesStartComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    // private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipeList.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // console.log(this.recipes);

    this.subscription = this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
