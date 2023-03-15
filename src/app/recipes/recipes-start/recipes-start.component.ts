import { Recipe } from './../../shared/models/recipe.model';
import { RecipeService } from './../../shared/services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.css']
})
export class RecipesStartComponent implements OnInit {
  recipes: Recipe[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeList.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }
}
