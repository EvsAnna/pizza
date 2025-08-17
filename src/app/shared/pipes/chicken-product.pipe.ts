import { Pipe, PipeTransform } from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Pipe({
  name: 'chickenProduct'
})
export class ChickenProductPipe implements PipeTransform {

  transform(products: ProductType[]): ProductType[] {
    return products.filter(item => item.title.toLowerCase().includes('кур'));
  }

}
