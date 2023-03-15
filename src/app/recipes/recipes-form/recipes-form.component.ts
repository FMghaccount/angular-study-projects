import { RecipeService } from './../../shared/services/recipe.service';
import { Recipe } from './../../shared/models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css']
})
export class RecipesFormComponent {
  editMode: boolean = false;
  id: number;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    // this.recipeForm = new FormGroup({
    //   'recipeName': new FormControl(null, [Validators.required]),
    //   'recipeDescription': new FormControl(null, [Validators.required, Validators.email]),
    //   'recipeImagePath': new FormControl('Critical')
    // });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null
      this.initForm();
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName, [Validators.required]),
      'recipeDescription': new FormControl(recipeDescription, [Validators.required]),
      'recipeImagePath': new FormControl(recipeImagePath, [Validators.required]),
      'recipeIngredients': recipeIngredients
    });
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.editMode ? this.router.navigate(['/recipes', this.id]) : this.router.navigate(['/recipes'])
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)])
      })
    )
  }

  onRemoveIngredient(id: number) {
    let confirmation = confirm('آیا اطمینان دارید؟');
    console.log(confirmation);
    if (confirmation) {
      (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(id)
      // const recipe = this.recipeService.getRecipe(this.id);
      // if (recipe) {
      //   recipe.ingredients.splice(id, 1);
      // }
    } else {
      return
    }
  }

  onSubmit() {
    const newRecipe: Recipe = new Recipe(
      this.recipeForm.value['recipeName'],
      this.recipeForm.value['recipeDescription'],
      this.recipeForm.value['recipeImagePath'],
      this.recipeForm.value['recipeIngredients']
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe)
      this.router.navigate(['/recipes', this.id])
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['/recipes'])
    }
  }

}
