import { Subscription } from 'rxjs';
// import { Component, EventEmitter, Output } from "@angular/core";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { AuthService } from './../shared/services/auth.service';
// import { DataStorageService } from './../shared/services/data-storage.service';
import * as fromApp from '../shared/store/app.reducer';
import * as AuthActions from '../shared/store/auth/action/auth.actions';
import * as RecipesActions from '../shared/store/recipes/action/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean = false;

  // @Output() selectedFeature = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.selectedFeature.emit(feature);
  // }
  // onClick( {

  // })

  constructor(
    // private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    // });
    this.userSub = this.store.select('auth').subscribe((authState) => {
      this.isAuthenticated = !!authState.user;
    });
  }

  onSaveRecipes() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchRecipes() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    // this.store.dispatch(new RecipesActions.clearRecipes());
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
