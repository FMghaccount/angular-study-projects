import { RecipeService } from './../../shared/services/recipe.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  recipes: Recipe[] = []

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe)
  }

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
}
