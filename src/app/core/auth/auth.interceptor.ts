import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const authToken =  this.authService.getToken();  //получаем откуда-то токен
    // Для манипуляций с объектом запроса у req используется метод .clone()
   const authReq = req.clone({  //создаем клон req и меняем его как нам нужно
      headers: req.headers.set('authorization', authToken)
    })
    //Для работы с ответом используем .pipe()
    return next.handle(authReq).pipe(
      tap({
        next: (event) => {
          if(event instanceof HttpResponse) {   //если это у нас ответ
            console.log(event)
          }
        }
      })
    ); // отдаем новый изменненый результат

    // return next.handle(req); // стандартное поведение, которое никак не меняет наш запрос(по умолчанию)
  }
}
