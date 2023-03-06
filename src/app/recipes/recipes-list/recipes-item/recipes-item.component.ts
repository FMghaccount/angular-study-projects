import { RecipeService } from './../../../shared/services/recipe.service';
import { Recipe } from '../../../shared/models/recipe.model';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;
  // @Output() selectedRecipe = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  onSelect() {
    // this.selectedRecipe.emit();
    this.recipeService.selectedRecipe.emit(this.recipe);
  }
}
