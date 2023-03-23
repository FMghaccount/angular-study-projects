import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../../shared/services/shopping-list.service';
import * as ShoppingListActions from '../../shared/store/shopping-list/action/shopping-list.actions'
import * as fromShoppingList from '../../shared/store/shopping-list/reducer/shopping-list.reducer'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('amountInput') amountInput: ElementRef;
  // ingredientName: string;

  @ViewChild('form') formData: NgForm;
  editMode: boolean = false
  ingredient: Ingredient;
  ingredientId: number;
  subscription: Subscription
  timeoutSub
  constructor(
    // private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>) { }

  // onAddIngredients() {
  //   if (this.ingredientName && this.amountInput.nativeElement.value && this.amountInput.nativeElement.value > 0) {
  //     this.ingredient = new Ingredient(this.ingredientName, +this.amountInput.nativeElement.value)
  //     this.shoppingListService.addIngredients(this.ingredient)
  //   }
  //   else return
  // }


  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.queryParams.subscribe((queryParam: Params) => {
      if (queryParam['id'] !== undefined) {
        this.editMode = true;
        this.ingredientId = +queryParam['id'];
        this.store.dispatch(new ShoppingListActions.startEdit(this.ingredientId))
        // if (this.formData)
        //   this.formData.form.setValue({
        //     name: this.shoppingListService.getIngredient(+queryParam['id']).name,
        //     amount: this.shoppingListService.getIngredient(+queryParam['id']).amount
        //   })
      }
      else {
        this.editMode = false;
      }
    })

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        if (this.formData)
          this.formData.form.patchValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount
          })
      } else {
        this.editMode = false;
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.ingredientId !== undefined) {
      this.editMode = true;
      this.timeoutSub = setTimeout(() => {
        this.store.dispatch(new ShoppingListActions.startEdit(this.ingredientId))
        this.editMode = true;
        this.subscription = this.store.select('shoppingList').subscribe(stateData => {
          if (stateData.editedIngredientIndex > -1) {
            this.formData.form.patchValue({
              name: stateData.editedIngredient.name,
              amount: stateData.editedIngredient.amount
            })
          } else {
            this.editMode = false;
          }
        })
      }, 100)
    }
  }

  onSubmit() {
    if (this.formData.value.name && this.formData.value.amount > 0) {
      this.ingredient = new Ingredient(this.formData.value.name, +this.formData.value.amount)
      // if (!this.editMode) this.shoppingListService.addIngredients(this.ingredient)
      if (!this.editMode) {
        // this.editMode = false;
        this.store.dispatch(new ShoppingListActions.addIngredient(this.ingredient))
      }
      else {
        // this.shoppingListService.editIngredient(this.ingredientId, this.ingredient)
        // this.store.dispatch(new ShoppingListActions.updateIngredient({ index: this.ingredientId, ingredient: this.ingredient }))
        // this.editMode = true;
        this.store.dispatch(new ShoppingListActions.updateIngredient(this.ingredient))
      }
    }
    this.formData.reset();
    this.editMode = false;
    this.router.navigate(['/shopping-list']);
  }

  onRemove() {
    if (this.ingredientId !== undefined) {
      // this.shoppingListService.removeIngredient(+this.ingredientId);
      // this.store.dispatch(new ShoppingListActions.deleteIngredient(+this.ingredientId))
      this.store.dispatch(new ShoppingListActions.deleteIngredient())
      this.formData.reset();
      this.editMode = false;
      this.router.navigate(['/shopping-list']);
    } else {
      return
    }
  }

  onCancel() {
    this.formData.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.stopEdit());
    if (this.timeoutSub) clearTimeout(this.timeoutSub)
    this.router.navigate(['/shopping-list']);
  }

  ngOnDestroy() {
    this.editMode = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub)
    if (this.subscription) this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.stopEdit());
  }

}
