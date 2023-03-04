import { Component, Output, EventEmitter  } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  recipes: Recipe[] = [
    new Recipe('اولین دستور پخت', 'لورم ایپسوم متن ساختگی', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('دومین دستور پخت', 'لورم ایپسوم متن ساختگی', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe)
  }

  constructor() { }

  ngOnInit() {
  }
}
