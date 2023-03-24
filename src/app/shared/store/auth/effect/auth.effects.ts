import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { of, catchError, map } from 'rxjs';

import * as AuthActions from '../action/auth.actions';
import {
  AuthResponseData,
  AuthService,
} from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
// import { Observable } from 'redux';

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
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
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              const user = new User(
                resData.email,
                resData.localId,
                resData.idToken,
                expirationDate
              );
              this.authService.autoLogout(+resData.expiresIn * 1000);
              localStorage.setItem('userData', JSON.stringify(user));
              return new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorRes: HttpErrorResponse) => {
              let errorMessage =
                'خطا رخ داده است. لطفاً بعد از مدتی دوباره امتحان کنید';
              if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.LoginFail(errorMessage));
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
              return of(new AuthActions.LoginFail(errorMessage));
            })
          );
      })
    );
  });

  // @Effect({ dispatch: false })
  authSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
