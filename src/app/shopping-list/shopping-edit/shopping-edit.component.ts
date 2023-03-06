import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../../shared/services/shopping-list.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('amountInput') amountInput: ElementRef;
  ingredientName: string;
  ingredientAmount: number;
  ingredient: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  onAddIngredients() {
    if (this.ingredientName && this.amountInput.nativeElement.value && this.amountInput.nativeElement.value > 0) {
      this.ingredient = new Ingredient(this.ingredientName, this.amountInput.nativeElement.value)
      this.shoppingListService.addIngredients(this.ingredient)
    }
    else return
  }

}
