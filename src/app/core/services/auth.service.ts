import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { mapToFormData } from '@core/utilitties/helpers';
import { environment } from '@environment/environment';
import { api_urls } from '@shared/configs/api_url';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ACCESS_TOKEN } from './constant';

const BASE_URL = environment.apiUrl;
const routes = {
  login: `${BASE_URL}/auth/token`,
  refreshToken: `${BASE_URL}/auth/refresh-token`,
  userInfor: `${BASE_URL}/auth/users/me/`,
  facebookAuthentication: `${BASE_URL}/auth/facebook-authenticate`,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  //initialize

  EXPIRE_TOKEN_TIME_SECONDS = 0;
  REMAIN_TIME_TO_REFRESH_TOKEN_SECONDS = 120;
  private userSubject = new BehaviorSubject<any>(null);

  private refreshTokenTimeout: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  set User(data) {
    this.userSubject.next(data);
  }

  get User() {
    return this.userSubject.value;
  }

  get UserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(loginDataFormValue: {
    username: string;
    password: string;
  }): Observable<any> {
    let loginFormData = mapToFormData(loginDataFormValue);
    return this.httpClient
      .post<any>(routes.login, loginFormData, { withCredentials: true })
      .pipe(
        first(),
        map((res: any) => {

          //save user current
          this.User = res.user_infor;
          //save expire token time
          this.EXPIRE_TOKEN_TIME_SECONDS = res.expire_token_time_minutes * 60;
          //encode acccess token
          let accessToken = res.access_token;
          this.saveAccessTokenInLocalStorage(accessToken);
        })
      );
  }

  logout() {
    this.User = null;

    this.stopRefreshTokenTimer();

    localStorage.removeItem(ACCESS_TOKEN);

    //this.router.navigateByUrl('/login');
  }

  refreshToken(): Observable<any> {
    return this.httpClient
      .get<any>(routes.refreshToken, { withCredentials: true })
      .pipe(
        first(),
        map((res) => {
          this.EXPIRE_TOKEN_TIME_SECONDS = res.expire_token_time_minutes * 60;
          this.saveAccessTokenInLocalStorage(res.access_token);
        })
      );
  }

  userInfor(): Observable<any> {
    return this.httpClient
      .get(routes.userInfor, { withCredentials: true })
      .pipe(
        first(),
        map((res: any) => {
          let userData = res.data;
          this.User = userData;
        })
      );
  }
  //save token to local storage and ser up time to refresh token
  saveAccessTokenInLocalStorage(accessToken: string) {
    //encode access token
    let accessTokenEncode = btoa(accessToken);
    //save to localStorage
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessTokenEncode));
    //refresh token
    this.startRefreshTokenTimer();
  }

  getAccesTokenFromLocalStorage() {
    const accessTokenEncodeJson = localStorage.getItem(ACCESS_TOKEN);

    if (accessTokenEncodeJson != null) {
      let accessTokenEncode = JSON.parse(accessTokenEncodeJson);
      return atob(accessTokenEncode);
    }
    return null;
  }

  private startRefreshTokenTimer() {
    //get new token when remain 2 mintutes
    const timeout =
      (this.EXPIRE_TOKEN_TIME_SECONDS -
        this.REMAIN_TIME_TO_REFRESH_TOKEN_SECONDS) *
      1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  ngOnDestroy() {
    this.stopRefreshTokenTimer();
  }
}
