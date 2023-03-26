// import { Subscription, interval } from 'rxjs';
import { Subscription, map, switchMap } from 'rxjs';
import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as RecipesActions from './../../shared/store/recipes/action/recipes.actions';
import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import * as fromApp from '../../shared/store/app.reducer';
import * as ShoppingListActions from '../../shared/store/shopping-list/action/shopping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnDestroy {
  @Input() recipe: Recipe;
  recipeId: number;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(
    //   +this.activateRoute.snapshot.params['id']
    // );
    // this.activateRoute.params.subscribe((params: Params) => {
    //   this.recipe = this.recipeService.getRecipe(+params['id']);
    //   this.recipeId = +params['id'];
    //   // if (!this.recipeService.getRecipe(+params['id'])) {
    //   //   this.router.navigate(['/recipes']);
    //   // }
    //   // else {
    //   //   this.recipe = this.recipeService.getRecipe(+params['id'])
    //   //   this.recipeId = +params['id']
    //   // }
    // });

    // this.subscription = this.recipeService.recipeList.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipe = recipes[this.recipeId];
    //   }
    // );
    this.subscription = this.activateRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.recipeId;
          });
        })
      )
      .subscribe((recipe) => {
        if (!recipe) {
          this.router.navigate(['/recipes']);
        } else this.recipe = recipe;
      });
  }

  addToIngredients(ingredients) {
    // this.recipeService.addToIngredientsFromRecipeDetail(ingredients);
    this.store.dispatch(new ShoppingListActions.addIngredients(ingredients));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activateRoute });
  }

  onRemove() {
    let confirmation = confirm('آیا اطمینان دارید؟');
    if (confirmation) {
      // this.recipeService.removeRecipe(this.recipeId);
      this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));
      this.router.navigate(['/recipes']);
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
