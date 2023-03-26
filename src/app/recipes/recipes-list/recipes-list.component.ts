import { Subscription, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import * as fromApp from '../../shared/store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  // @Output() selectedRecipeId = new EventEmitter<number>();

  // onRecipeSelected(recipeId: number) {
  //   this.selectedRecipeId.emit(recipeId)
  // }

  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipeList.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  onClick() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
