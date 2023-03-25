// import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

// import { AuthResponseData } from '../shared/services/auth.service';
// import { AuthService, AuthResponseData } from '../shared/services/auth.service';
import { AlertComponent } from './../shared/components/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import * as fromApp from '../shared/store/app.reducer';
import * as AuthActions from '../shared/store/auth/action/auth.actions';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  // @ViewChild('form') userForm: NgForm
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  user: User;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  authSub: Subscription;

  constructor(
    // private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      this.user = authState.user;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid && !form.value.email && !form.value.password) {
      alert('لطفاً فرم را به درستی کامل کنید');
      return;
    } else {
      // let authObs: Observable<AuthResponseData>;
      // this.isLoading = true;
      if (!this.isLoginMode) {
        this.store.dispatch(
          new AuthActions.SignupStart({
            email: form.value.email,
            password: form.value.password,
          })
        );
        // authObs = this.authService.signUp(
        //   form.value.email,
        //   form.value.password
        // );
      } else {
        this.store.dispatch(
          new AuthActions.SignInStart({
            email: form.value.email,
            password: form.value.password,
          })
        );
        // authObs = this.authService.signIn(
        //   form.value.email,
        //   form.value.password
        // );
      }

      // authObs.subscribe(
      //   (responseData) => {
      //     console.log(responseData);
      //     this.isLoading = false;
      //     this.error = '';
      //     this.router.navigate(['/recipes']);
      //   },
      //   (errorMessage) => {
      //     this.error = errorMessage;
      //     this.showErrorAlert(errorMessage);
      //     this.isLoading = false;
      //   }
      // );
    }
    form.reset();
  }

  onHandleError() {
    // this.error = null;
    // this.isLoading = false;
    this.store.dispatch(new AuthActions.ClearError());
  }

  onOk() {
    // this.error = '';
    // this.isLoading = false;
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.error = '';
      this.isLoading = false;
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
