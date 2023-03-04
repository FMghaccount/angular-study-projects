import { Recipe } from './../../recipe.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<void>();

  onSelect() {
    this.selectedRecipe.emit();
  }
}
