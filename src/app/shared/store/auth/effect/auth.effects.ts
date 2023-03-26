import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { of, catchError, map } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from '../action/auth.actions';
import {
  // AuthResponseData,
  AuthService,
} from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
// import { AuthGuard } from 'src/app/shared/guards/auth.guard';
// import { Observable } from 'redux';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate,
  });
};

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMessage = 'خطا رخ داده است. لطفاً بعد از مدتی دوباره امتحان کنید';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'ایمیل شما توسط حساب کاربری دیگری ثبت شده است';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'ورود با رمز عبور غیر فعال شده است';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage =
        'با توجه به فعالیت های غیر معمول شما، ورود با این دستگاه غیر فعال شده است';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'حساب کاربری با ایمیل مورد نظر شما موجود نمی باشد یا حساب کاربری حذف شده است';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'ایمیل یا رمز عبور وارد شده نامعتبر است';
      break;
    case 'USER_DISABLED':
      errorMessage = 'حساب کاربری شما توسط مدیریت غیر فعال شده است';
      break;

    default:
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignUp = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseApiKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              return handleAuthentication(resData);
            }),
            catchError((errorRes: HttpErrorResponse) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authSignIn = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNIN_START),
      switchMap((authData: AuthActions.SignInStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseApiKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              return handleAuthentication(resData);
            }),
            catchError((errorRes: HttpErrorResponse) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  // @Effect({ dispatch: false })
  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap((action: AuthActions.AuthenticateSuccess | AuthActions.Logout) => {
          if (action.type === AuthActions.AUTHENTICATE_SUCCESS) {
            if (this.router.url === '/auth') this.router.navigate(['/']);
          }
          if (action.type === AuthActions.LOGOUT) {
            this.router.navigate(['/auth']);
          }
        })
      );
    },
    { dispatch: false }
  );

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          if (localStorage.getItem('userData'))
            localStorage.removeItem('userData');
          this.authService.clearLogoutTimer();
        })
      );
    },
    { dispatch: false }
  );

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return new AuthActions.Logout();
          // this.user.next(null);
          // return;
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(+expirationDuration);
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          });
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expirationDuration);
        } else return new AuthActions.Logout();
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    // private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
}
