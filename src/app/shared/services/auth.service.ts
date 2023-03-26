// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { tap } from 'rxjs/operators';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { catchError, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, throwError } from 'rxjs';

// import { User } from '../models/user.model';
// import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth/action/auth.actions';
import * as RecipesActions from '../store/recipes/action/recipes.actions';

// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new Subject<User>();
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    // console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
      // this.store.dispatch(new RecipesActions.clearRecipes());
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //         environment.firebaseApiKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // signIn(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //         environment.firebaseApiKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // logout() {
  //   // this.user.next(null);
  // this.store.dispatch(new RecipesActions.clearRecipes());
  //   this.store.dispatch(new AuthActions.Logout());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //     this.tokenExpirationTimer = null;
  //   }
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));

  //   if (!userData) {
  // this.store.dispatch(new RecipesActions.clearRecipes());
  //     this.store.dispatch(new AuthActions.Logout());
  //     // this.user.next(null);
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: email,
  //       userId: userId,
  //       token: token,
  //       expirationDate: expirationDate,
  //     })
  //   );
  //   // this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'خطا رخ داده است. لطفاً بعد از مدتی دوباره امتحان کنید';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'ایمیل شما توسط حساب کاربری دیگری ثبت شده است';
  //       break;
  //     case 'OPERATION_NOT_ALLOWED':
  //       errorMessage = 'ورود با رمز عبور غیر فعال شده است';
  //       break;
  //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //       errorMessage =
  //         'با توجه به فعالیت های غیر معمول شما، ورود با این دستگاه غیر فعال شده است';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage =
  //         'حساب کاربری با ایمیل مورد نظر شما موجود نمی باشد یا حساب کاربری حذف شده است';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'ایمیل یا رمز عبور وارد شده نامعتبر است';
  //       break;
  //     case 'USER_DISABLED':
  //       errorMessage = 'حساب کاربری شما توسط مدیریت غیر فعال شده است';
  //       break;

  //     default:
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
}
