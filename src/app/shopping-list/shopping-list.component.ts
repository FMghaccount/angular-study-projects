import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  // state,
  style,
  animate,
  transition,
  query,
  stagger,
  // keyframes,
  // group,
} from '@angular/animations';

import { Ingredient } from '../shared/models/ingredient.model';
// import { ShoppingListService } from './../shared/services/shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../shared/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('shoppingListAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(100px)' }),
            stagger(
              '100ms',
              animate(
                '600ms ease-in-out',
                style({ opacity: 1, transform: 'translateX(0px)' })
              )
            ),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          animate(
            '300ms',
            style({ transform: 'translateX(100px)', opacity: 0 })
          ),
          {
            optional: true,
          }
        ),
      ]),

      // state(
      //   'in',
      //   style({
      //     opacity: 1,
      //     transform: 'translateX(0)',
      //   })
      // ),
      // transition('void => *', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(100px)',
      //     color: '#008000',
      //     backgroundColor: '#dcffdc',
      //   }),
      //   animate(500),
      // ]),
      // transition('* => void', [
      //   animate(
      //     500,
      //     style({
      //       transform: 'translateX(-100px)',
      //       opacity: 0,
      //       color: '#ff0000',
      //       backgroundColor: '#fff1f1',
      //     })
      //   ),
      // ]),
    ]),
  ],
  // providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnDestroy {
  ingredients: Ingredient[] = [];
  // ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientsSubscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.ingredients = this.store.select('shoppingList')
    this.ingredientsSubscription = this.store
      .select('shoppingList')
      .subscribe((ingredients: { ingredients: Ingredient[] }) => {
        this.ingredients = ingredients.ingredients;
      });
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsSubscription = this.shoppingListService.ingredientList.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  ngOnDestroy() {
    if (this.ingredientsSubscription)
      this.ingredientsSubscription.unsubscribe();
  }
}
