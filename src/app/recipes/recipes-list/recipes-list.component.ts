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

  // @Output() selectedRecipeId = new EventEmitter<number>();

  // onRecipeSelected(recipeId: number) {
  //   this.selectedRecipeId.emit(recipeId)
  // }

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
}
