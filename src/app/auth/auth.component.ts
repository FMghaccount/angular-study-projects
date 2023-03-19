import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from '../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  // @ViewChild('form') userForm: NgForm
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {
    if (!form.valid && !form.value.email && !form.value.password) {
      alert('لطفاً فرم را به درستی کامل کنید')
      return
    } else {
      let authObs: Observable<AuthResponseData>
      this.isLoading = true;
      if (!this.isLoginMode) {
        authObs = this.authService.signUp(form.value.email, form.value.password)
      } else {
        authObs = this.authService.signIn(form.value.email, form.value.password)
      }

      authObs.subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.error = '';
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.error = errorMessage
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      })
    }
    form.reset();
  }

  onHandleError() {
    this.error = null;
    this.isLoading = false;
  }

  onOk() {
    this.error = ''
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
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
