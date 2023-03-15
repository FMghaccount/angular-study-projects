import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../../shared/services/shopping-list.service';
// import { Component, ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit {
  // @ViewChild('amountInput') amountInput: ElementRef;
  // ingredientName: string;

  @ViewChild('form') formData: NgForm;
  editMode: boolean = false
  ingredient: Ingredient;
  ingredientId: number;
  constructor(private shoppingListService: ShoppingListService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
      if (queryParam['id']) {
        this.editMode = true;
        this.ingredientId = +queryParam['id'];
        if (this.formData)
          this.formData.form.patchValue({
            name: this.shoppingListService.getIngredient(+queryParam['id']).name,
            amount: this.shoppingListService.getIngredient(+queryParam['id']).amount
          })
      }
      else {
        this.editMode = false;
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.ingredientId !== undefined) {
      setTimeout(() => {
        this.formData.setValue({
          name: this.shoppingListService.getIngredient(this.ingredientId).name,
          amount: this.shoppingListService.getIngredient(this.ingredientId).amount
        })
      }, 500)
    }
  }

  onSubmit() {
    if (this.formData.value.name && this.formData.value.amount > 0) {
      this.ingredient = new Ingredient(this.formData.value.name, +this.formData.value.amount)
      if (!this.editMode) this.shoppingListService.addIngredients(this.ingredient)
      else {
        this.shoppingListService.editIngredient(this.ingredientId, this.ingredient)
      }
    }
    this.formData.reset();
  }

  onRemove() {
    if (this.ingredientId !== undefined) {
      this.shoppingListService.removeIngredient(+this.ingredientId);
      this.formData.reset();
      this.router.navigate(['/shopping-list']);
    } else {
      return
    }
  }

  onCancel() {
    this.formData.reset();
    this.router.navigate(['/shopping-list']);
  }

}
