import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, switchMap, Subscription } from 'rxjs';

import * as RecipesActions from './../../shared/store/recipes/action/recipes.actions';
// import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from './../../shared/models/recipe.model';
import * as fromApp from '../../shared/store/app.reducer';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
})
export class RecipesFormComponent {
  editMode: boolean = false;
  id: number;
  recipeForm: FormGroup;
  recipe: Recipe;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.recipeForm = new FormGroup({
    //   recipeName: new FormControl(null, [Validators.required]),
    //   recipeDescription: new FormControl(null, [
    //     Validators.required,
    //     Validators.email,
    //   ]),
    //   recipeImagePath: new FormControl('Critical'),
    // });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    // this.subscription = this.activatedRoute.params
    //   .pipe(
    //     map((params) => {
    //       return +params['id'];
    //     }),
    //     switchMap((id) => {
    //       this.id = id;
    //       return this.store.select('recipes');
    //     }),
    //     map((recipesState) => {
    //       return recipesState.recipes.find((recipe, index) => {
    //         return index === this.id;
    //       });
    //     })
    //   )
    //   .subscribe((recipe) => {
    //     if (recipe) {
    //       this.recipe = recipe;
    //     }
    //     this.editMode = this.id != null;
    //     this.initForm();
    //   });
  }

  get controls() {
    // a getter!
    if (<FormArray>this.recipeForm.get('recipeIngredients'))
      return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  get recipeName() {
    return this.recipeForm.get('recipeName');
  }
  get recipeDescription() {
    return this.recipeForm.get('recipeDescription');
  }
  get recipeImagePath() {
    return this.recipeForm.get('recipeImagePath');
  }
  get recipeIngredients() {
    return this.recipeForm.get('recipeIngredients');
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // this.recipe = this.recipeService.getRecipe(this.id);
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.min(1),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeDescription: new FormControl(recipeDescription, [
        Validators.required,
      ]),
      recipeImagePath: new FormControl(recipeImagePath, [Validators.required]),
      recipeIngredients: recipeIngredients,
    });
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.editMode
      ? this.router.navigate(['/recipes', this.id])
      : this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  onRemoveIngredient(id: number) {
    let confirmation = confirm('آیا اطمینان دارید؟');
    if (confirmation) {
      (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(id);
      // const recipe = this.recipeService.getRecipe(this.id);
      // if (recipe) {
      //   recipe.ingredients.splice(id, 1);
      // }
    } else {
      return;
    }
  }

  onSubmit() {
    const newRecipe: Recipe = new Recipe(
      this.recipeForm.value['recipeName'],
      this.recipeForm.value['recipeDescription'],
      this.recipeForm.value['recipeImagePath'],
      this.recipeForm.value['recipeIngredients']
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: newRecipe,
        })
      );
      this.router.navigate(['/recipes', this.id]);
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      // this.recipeService.addRecipe(newRecipe);
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
      this.router.navigate(['/recipes']);
    }
    this.onCancel();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
