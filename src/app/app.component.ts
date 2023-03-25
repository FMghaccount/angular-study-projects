import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

// import { RecipeService } from './shared/services/recipe.service';
// import { DataStorageService } from './shared/services/data-storage.service';
// import { AuthService } from './shared/services/auth.service';
import * as AuthActions from './shared/store/auth/action/auth.actions';
import * as fromApp from './shared/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // selectedFeature = 'recipe';
  // onNavigate(feature) {
  //   this.selectedFeature = feature
  // }

  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  // constructor(
  //   private authService: AuthService,
  //   private dataStorageService: DataStorageService,
  //   private recipeService: RecipeService) { }

  // ngOnInit(): void {
  //   this.authService.autoLogin();
  //   const recipes = this.recipeService.getRecipes();
  //   if (recipes.length === 0) {
  //     this.dataStorageService.fetchRecipes().subscribe();
  //   }
  // }
}
