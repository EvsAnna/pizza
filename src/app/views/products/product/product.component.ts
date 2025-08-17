import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: ProductType
  private subscriptionProduct: Subscription | null = null;

  constructor(private ActivatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router:Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      datetime: ''
    }
  }

  ngOnInit(): void {
    // //через query-параметры
   this.subscriptionProduct = this.ActivatedRoute.params.subscribe((params) => {
      if (params['id']) {
       this.productService.getProduct(+params['id'])
       .subscribe({
          next: (data) => {
            this.product = data;
          },
         error: (error) => {
            this.router.navigate(['/'])
         }
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }

}
