import { Subscription, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  trigger,
  // state,
  style,
  animate,
  transition,
  stagger,
  query,
  // keyframes,
  // group,
} from '@angular/animations';

// import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import * as fromApp from '../../shared/store/app.reducer';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
  animations: [
    trigger('recipesAnimation', [
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

      // transition(':enter', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(100px)',
      //   }),
      //   animate(
      //     '800ms ease-in-out',
      //     style({
      //       opacity: 1,
      //       transform: 'translateX(0)',
      //     })
      //   ),
      // ]),
      // transition(':leave', [
      //   style({ opacity: 1 }),
      //   animate('300ms', style({ transform: 'translateX(100px)', opacity: 0 })),
      // ]),
    ]),
  ],
})
export class RecipesListComponent implements OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  // @Output() selectedRecipeId = new EventEmitter<number>();

  // onRecipeSelected(recipeId: number) {
  //   this.selectedRecipeId.emit(recipeId)
  // }

  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipeList.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  onClick() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
