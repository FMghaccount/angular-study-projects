import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';
// import { ShoppingListService } from './../shared/services/shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../shared/store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnDestroy {
  ingredients: Ingredient[] = [];
  // ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientsSubscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.store.select('shoppingList')
    this.ingredientsSubscription = this.store.select('shoppingList').subscribe((ingredients: { ingredients: Ingredient[] }) => {
      this.ingredients = ingredients.ingredients
    })
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsSubscription = this.shoppingListService.ingredientList.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  ngOnDestroy() {
    if (this.ingredientsSubscription) this.ingredientsSubscription.unsubscribe();
  }
}
