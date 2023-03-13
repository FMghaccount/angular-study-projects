import { RecipeService } from './../../../shared/services/recipe.service';
import { Recipe } from '../../../shared/models/recipe.model';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';
// import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;
  // @Output() selectedRecipe = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  // with EventEmitter
  // onSelect() {
  //   // this.selectedRecipe.emit();
  //   this.recipeService.selectedRecipeId.emit(+this.recipeId);
  // }

  // with Subject Operator from rxjs
  // onSelect() {
  //   // this.selectedRecipe.emit();
  //   this.recipeService.selectedRecipeId.next(+this.recipeId);
  // }

  // with Subject Operator from rxjs
  // ngOnDestroy(){
  //   this.recipeService.selectedRecipeId.unsubscribe();
  // }
}
