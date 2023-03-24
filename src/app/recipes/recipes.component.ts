import { RecipeService } from './../shared/services/recipe.service';
import { DataStorageService } from './../shared/services/data-storage.service';
import { AuthService } from './../shared/services/auth.service';
// import { Recipe } from '../shared/models/recipe.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  // selectedRecipe: Recipe;
  // selectedRecipe: Recipe;
  // onSelectRecipe(recipe) {
  //   this.selectedRecipe = recipe;
  //   console.log(recipe);
  // }

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // this.recipeService.selectedRecipeId.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })

    this.authService.autoLogin();
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      this.dataStorageService.fetchRecipes().subscribe();
    }

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
