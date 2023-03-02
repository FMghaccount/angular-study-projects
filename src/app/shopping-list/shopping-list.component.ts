import { Component } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('سیب', 5),
    new Ingredient('گوجه فرنگی', 10),
  ];

  constructor() { }

  ngOnInit() {
  }
}
