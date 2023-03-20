import { Subscription, interval } from 'rxjs';
import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnDestroy {
  @Input() recipe: Recipe;
  recipeId: number;
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(+this.activateRoute.snapshot.params['id']);
    this.activateRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params['id'])
      this.recipeId = +params['id']
      // if (!this.recipeService.getRecipe(+params['id'])) {
      //   this.router.navigate(['/recipes']);
      // }
      // else {
      //   this.recipe = this.recipeService.getRecipe(+params['id'])
      //   this.recipeId = +params['id']
      // }
    })

    this.subscription = this.recipeService.recipeList.subscribe((recipes: Recipe[]) => {
      this.recipe = recipes[this.recipeId];
    })
  }

  addToIngredients(ingredients) {
    this.recipeService.addToIngredientsFromRecipeDetail(ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activateRoute })
  }

  onRemove() {
    let confirmation = confirm('آیا اطمینان دارید؟')
    if (confirmation) {
      this.recipeService.removeRecipe(this.recipeId);
      this.router.navigate(['/recipes']);
    } else {
      return
    }

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
