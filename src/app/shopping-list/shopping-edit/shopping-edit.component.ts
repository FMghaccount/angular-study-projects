import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../../shared/services/shopping-list.service';
// import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  // @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('form') formData: NgForm;
  // ingredientName: string;
  // ingredientAmount: number;
  ingredient: Ingredient;
  // submitted: boolean = false;
  constructor(private shoppingListService: ShoppingListService) { }

  // onAddIngredients() {
  //   if (this.ingredientName && this.amountInput.nativeElement.value && this.amountInput.nativeElement.value > 0) {
  //     this.ingredient = new Ingredient(this.ingredientName, +this.amountInput.nativeElement.value)
  //     this.shoppingListService.addIngredients(this.ingredient)
  //   }
  //   else return
  // }

  onSubmit() {
    if (this.formData.value.name && this.formData.value.amount > 0) {
      console.log(this.formData.value.name + ' ' + this.formData.value.amount);

      this.ingredient = new Ingredient(this.formData.value.name, +this.formData.value.amount)
      this.shoppingListService.addIngredients(this.ingredient)
    }
    // this.submitted = true;
    this.formData.reset();
  }

}
