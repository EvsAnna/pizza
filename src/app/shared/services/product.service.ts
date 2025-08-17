import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = []


  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    let params = new HttpParams();
    params = params.set('extraField', 1)  //установить новое значение в params
    return this.http.get<ProductType[]>(environment.apiURL +'/pizzas', {
      // // полностью весь запрос в result, а не только body
      // observe: "response",

      // // изменение типа ответа от сервера с JSON(по умолчанию) на другой
      // responseType: 'text'

      // // Передать заголовки для запроса
      // headers: new HttpHeaders({
      //   Authorization: 'auth-token'
      // }),

      // // Использование query-параметров
      // params: params
    })
    // .pipe(  //промежуточная обработка
    // tap((result) => {
    //   //мы можем выполнить любое побочное действие, не затрагивая основное предназначение и поток данных
    //   console.log(result)
    // }),
    // map((result) => (result.body ? result.body.data : [])), //Обработать каждый входящий результат из Observable
    // в result будет ответ от сервера
    // catchError(error => { //эта функция сработает только если observable будет завершаться с ошибкой
    //   //генерируем свой error(в больших проектах может быть какой-то кастомный error, который расширяет класс Error)
    //   // throw new Error('omg');  //здесь генерируется обычный error
    //
    //   //создаем и возвращаем новый observable, с которым дальше в next будем работать (в случае ошибки)
    //   return of([]);
    // }),
    // // если запрос был неуспешен, то с помощью оператора retry его можно повторить указанное кол-во раз
    // retry(3)
    // )
  }

  getProduct(id: number): Observable<ProductType> {
    // return this.products.find(item => (item.id === id));
    return this.http.get<ProductType>(environment.apiURL + `/pizzas?id=${id}`)
  }


  createOrder(data: { product: string, address: string, phone: string }) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `/order-pizza?`, data)
  }

}
