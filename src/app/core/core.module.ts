import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, //чтобы добавить по этому ключу ingection-token наш новый auth-interceptor
      useClass: AuthInterceptor,
      multi: true // чтобы не перезаписать по ключу HTTP_INTERCEPTORS интерсепторы, а добавить туда новые
    }
  ]
})
export class CoreModule { }
