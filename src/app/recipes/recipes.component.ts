import { RecipeService } from './../shared/services/recipe.service';
// import { Recipe } from '../shared/models/recipe.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent {
  // selectedRecipe: Recipe;
  // selectedRecipe: Recipe;
  // onSelectRecipe(recipe) {
  //   this.selectedRecipe = recipe;
  //   console.log(recipe);
  // }

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipeService.selectedRecipeId.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })


    // with Subject Operator from rxjs
    // this.recipeService.selectedRecipeId.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
  }

  // with Subject Operator from rxjs
  // ngOnDestroy(){
  //   this.recipeService.selectedRecipeId.unsubscribe();
  // }

}
