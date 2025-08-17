import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  private subscriptionProducts: Subscription | null = null;
  loading: boolean = false;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.loading = true;
    this.subscriptionProducts = this.productService.getProducts()

      .pipe(tap(() => this.loading = false))
      .subscribe(  // Здесь уходит запрос
        {
          next: (data) => {  // при правильном результате с бэкенда
            this.loading = false;
            console.log('next')
            this.products = data;
          },
          error: (error) => { // действия если запрос не смог произойти или ели там была какая-то ошибка
            console.log(error);
            this.router.navigate(['/'])
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }
}
