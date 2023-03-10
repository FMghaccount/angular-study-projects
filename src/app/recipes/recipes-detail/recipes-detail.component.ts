import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(+this.activateRoute.snapshot.params['id']);
    this.activateRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params['id'])
    })
  }

  addToIngredients(ingredients) {
    this.recipeService.addToIngredientsFromRecipeDetail(ingredients);
  }
}
