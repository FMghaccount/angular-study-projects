import { Router } from '@angular/router';
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

import { AuthService, AuthResponseData } from '../shared/services/auth.service';
import { AlertComponent } from './../shared/components/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import * as fromApp from '../shared/store/app.reducer';
import * as AuthActions from '../shared/store/auth/action/auth.actions';

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
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
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
      let authObs: Observable<AuthResponseData>;
      this.isLoading = true;
      if (!this.isLoginMode) {
        authObs = this.authService.signUp(
          form.value.email,
          form.value.password
        );
      } else {
        this.store.dispatch(
          new AuthActions.LoginStart({
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
    this.error = null;
    this.isLoading = false;
  }

  onOk() {
    this.error = '';
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
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
