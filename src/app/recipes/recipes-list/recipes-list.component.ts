import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../../shared/services/recipe.service';
// import { Component, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
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

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipeList.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }

  onClick() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }
}
