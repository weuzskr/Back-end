import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userConnect: any;
    if (localStorage.getItem('userConnect')) {
      userConnect = JSON.parse(localStorage.getItem('userConnect') || '');

    }

    // Assurez-vous que userConnect et userConnect.authorization sont définis
    if (userConnect) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Supprimer l'utilisateur connecté du localStorage
          localStorage.removeItem('userConnect');
          // Rediriger vers la page de connexion
          this.router.navigate(['/']);
        }
        // Retourne toujours un Observable
        const errorDetails = {
          status: error.status,
          message: error.message,
          error: error.error // This might contain additional error details from the server
        };

        // Retourne toujours un Observable
        return throwError(() => new Error(JSON.stringify(errorDetails)));
      })
    )
  }
}