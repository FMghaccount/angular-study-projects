import { Observable, Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

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
export class AppComponent implements OnDestroy, OnInit {
  loading$: Observable<boolean> = of(false);
  isChangingRoute: boolean = false;
  routeEventSub: Subscription;
  timerSub;

  // selectedFeature = 'recipe';
  // onNavigate(feature) {
  //   this.selectedFeature = feature
  // }

  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isChangingRoute = true;
    }
    if (event instanceof NavigationEnd) {
      this.timerSub = setTimeout(() => {
        this.isChangingRoute = false;
        setInterval;
      }, 200);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.timerSub = setTimeout(() => {
        this.isChangingRoute = false;
      }, 200);
    }
    if (event instanceof NavigationError) {
      this.timerSub = setTimeout(() => {
        this.isChangingRoute = false;
      }, 200);
    }
  }

  ngOnInit(): void {
    this.routeEventSub = this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });

    // this.routeEventSub = this.router.events
    //   .pipe(
    //     filter(
    //       (event) =>
    //         event instanceof NavigationStart ||
    //         event instanceof NavigationEnd ||
    //         event instanceof NavigationCancel ||
    //         event instanceof NavigationError
    //     ),
    //     map((event) => event instanceof NavigationStart)
    //   )
    //   // ONLY runs on:
    //   // NavigationStart, NavigationEnd, NavigationCancel, NavigationError
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.loading$ = of(data);
    //   });

    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  ngOnDestroy(): void {
    if (this.routeEventSub) this.routeEventSub.unsubscribe();
    if (this.timerSub) clearTimeout(this.timerSub);
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
