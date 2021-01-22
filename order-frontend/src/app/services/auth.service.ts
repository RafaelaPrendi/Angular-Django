import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  current_user: any;
  private apiRoot = 'http://localhost:8000/auth/';

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  get token(): string {
    return <string>localStorage.getItem('token');
  }

  getUserInfo(user_id: number) {
    this.userService.getSingleUser(user_id).subscribe(response => {
        this.current_user = response;
        console.log(this.current_user);
      },
      error => {
        console.log(error);
      });
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      {username, password}
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  signup(username: string, email: string, password1: string, password2: string) {
    return this.http.post(
      this.apiRoot.concat('signup/'),
      {username, email, password1, password2}
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  // @ts-ignore
  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        {token: this.token}
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(<string>expiration);//////
    return moment(expiresAt);
  }

  getUsername() {
    // const username = localStorage.getItem('currentUser');
    // const userName = JSON.parse(<string>username);
    // return userName;
    return this.current_user;
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResult: Object) {
    // @ts-ignore
    const token = authResult.token;
    // @ts-ignore
    const payload = <JWTPayload>jwt_decode(token);
    // @ts-ignore
    const user_id = <JWTPayload>jwt_decode(token).user_id;
    const expiresAt = moment.unix(payload.exp);
    // @ts-ignore
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.getUserInfo(Number(user_id));

  }


}

Injectable()

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}


